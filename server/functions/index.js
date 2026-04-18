const { setGlobalOptions } = require("firebase-functions");
const { onRequest } = require("firebase-functions/https");
const admin = require("firebase-admin");

if (!admin.apps.length) {
    admin.initializeApp();
}

const express = require("express");
const cors = require("cors");
const { createBooking, getBookings, updateBookingStatus } = require("./controllers/bookingController");

// Limit concurrent instances for cost control
setGlobalOptions({ maxInstances: 10 });

// Setup Express App
const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

// Routes
app.post("/bookings", createBooking);
app.get("/bookings", getBookings);
app.patch("/bookings/:id", updateBookingStatus);

// Expose the API
exports.api = onRequest(app);
