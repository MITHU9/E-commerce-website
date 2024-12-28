dotenv.config();
import path from "path";
import express from "express";
import Stripe from "stripe";
import dotenv from "dotenv";

import cors from "cors";
import cookieParser from "cookie-parser";

const stripe = new Stripe(`${process.env.STRIPE_SECRET_KEY}`);

//Utils
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const port = process.env.PORT || 5000;

connectDB();

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutes);

app.post("/api/stripe-checkout-session", async (req, res) => {
  const { orderItems } = req.body;

  // console.log(orderItems);

  const lineItems = orderItems.map((item) => {
    return {
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          // images: [item.image],
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.qty,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: lineItems,
    mode: "payment",
    success_url: "http://localhost:5173/success",
    cancel_url: "http://localhost:5173/cancel",
  });

  res.json({ id: session.id });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
