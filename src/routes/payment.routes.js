
const { Router } = require("express");
const paymentRouter = Router();

const paymentController = require("../controllers/payment.contrller");
const auth = require("../middlewares/authentication");

paymentRouter.post("/stripe/webhook", auth, paymentController.payment);

module.exports = paymentRouter;
