const functions = require("firebase-functions");
const admin = require("firebase-admin");
const stripe = require("stripe")(functions.config().stripe.secret_key);

admin.initializeApp();

exports.createCheckoutSession = functions.https.onRequest(async (req, res) => {
  // Enable CORS
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(204).send("");
    return;
  }

  try {
    console.log("Received checkout request:", req.body);
    const {items, orderId} = req.body;

    if (!items || !Array.isArray(items) || items.length === 0) {
      throw new Error("Invalid items array");
    }

    if (!orderId) {
      throw new Error("Missing orderId");
    }

    console.log("Creating Stripe checkout session...");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      })),
      mode: "payment",
      success_url:
        `${req.headers.origin}/success?session_id={CHECKOUT_SESSION_ID}` +
        `&order_id=${orderId}`,
      cancel_url: `${req.headers.origin}/cart`,
      metadata: {
        orderId: orderId,
      },
    });

    console.log("Checkout session created:", session.id);
    res.json({id: session.id});
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({
      error: "Error creating checkout session",
      message: error.message,
    });
  }
});

// Webhook to handle successful payments
exports.stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
        req.rawBody,
        sig,
        functions.config().stripe.webhook_secret,
    );
  } catch (err) {
    console.error("Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const orderId = session.metadata.orderId;

    // Update the order status in Firestore
    await admin.firestore().collection("orders").doc(orderId).update({
      status: "completed",
      paymentId: session.payment_intent,
      updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  }

  res.json({received: true});
});
