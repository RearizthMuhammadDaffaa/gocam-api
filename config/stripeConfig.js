import Stripe from "stripe";

// Gunakan secret key Anda dari Stripe Dashboard
const stripe = new Stripe(`${ process.env.STRIPE_SECRET_KEY}`);

export default stripe;
