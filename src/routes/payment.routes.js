const { Router } = require("express");
const paymentRouter = Router();

const paymentController = require("../controllers/payment.contrller");

paymentRouter.post("/stripe/webhook/:id", paymentController.payment);

module.exports = paymentRouter;
