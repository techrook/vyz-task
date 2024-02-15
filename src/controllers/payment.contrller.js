// const express = require("express");
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const User = require('../models/user.model')

const payment = async(req,res)=>{

    const sig = req.headers['stripe-signature'];
    let event;
    console.log( process.env.STRIPE_WEBHOOK_SECRET)
    console.log( sig)
    try {
        event = await  stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Error verifying webhook signature:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'payment_intent.succeeded') {
        const paymentIntent = event.data.object;
        console.log(req)
        //await User.findByIdAndUpdate()
    }
}

module.exports = { payment };