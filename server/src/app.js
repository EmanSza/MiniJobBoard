import express from "express";
import session from 'express-session'
import cors from 'cors'
import MongoStore from "connect-mongo";
import passport from "passport";

import mainRoute from "./Routes/Index.js";
import jobsRoute from "./Routes/Jobs.js";
import authRoute from './Routes/Auth.js'
const app = express();

app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true, limit: "1mb" }));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24, // 24 hours
        },
        store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    })
);
app.use(passport.initialize());
app.use(passport.session());


app.use("/", mainRoute);
app.use("/jobs", jobsRoute);
app.use("/auth", authRoute);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: err.message || "Server error",
    });
});

export default app;
