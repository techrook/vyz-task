// const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const User = require("../models/user.model");

const payment = async (req, res) => {
//   const { id } = req.params;
  const sig = req.headers["stripe-signature"];
  let event;
  const rawBody = JSON.stringify(req.body);
  try {
    event = await stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("Error verifying webhook signature:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object;
    // await User.findByIdAndUpdate(id, { status: "paid" });
  }
  return res.status(200).json({ msg: "webhook tiggered succesfully." });
};

module.exports = { payment };
