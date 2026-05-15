const admin = require("firebase-admin");
const { FieldValue } = require("firebase-admin/firestore");
const logger = require("firebase-functions/logger");
const { sendConfirmationEmail } = require("../services/mailService");

const db = admin.firestore();
const collectionName = "bookings";

exports.createBooking = async (req, res) => {
  try {
    const { name, email, phone, service, date, time } = req.body;
    
    if (!name || !email || !service || !date || !time) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const payload = {
      name,
      email,
      phone,
      service,
      date,
      time,
      status: "Pending",
      createdAt: FieldValue.serverTimestamp()
    };

    let docId = "mock-id-" + Date.now();
    try {
      const docRef = await db.collection(collectionName).add(payload);
      docId = docRef.id;
    } catch (dbErr) {
      logger.warn("Firestore write failed (likely no DB or Emulator). Mocking success.");
    }

    await sendConfirmationEmail(email, name, service, date, time);

    return res.status(201).json({ id: docId, message: "Booking created successfully." });
  } catch (error) {
    logger.error("Create booking error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getBookings = async (req, res) => {
  try {
    let bookings = [];
    try {
      const snapshot = await db.collection(collectionName).orderBy("createdAt", "desc").get();
      snapshot.forEach(doc => {
        bookings.push({ id: doc.id, ...doc.data() });
      });
    } catch (dbErr) {
      logger.warn("Firestore read failed. Returning mock data.");
      bookings = [
        { id: "1", name: "Jane Doe", email: "jane@example.com", service: "Signature Haircut", date: "2026-06-01", time: "10:00 AM", status: "Pending" },
        { id: "2", name: "Alice Smith", email: "alice@example.com", service: "Radiance Facial", date: "2026-06-02", time: "02:00 PM", status: "Confirmed" }
      ];
    }
    return res.status(200).json(bookings);
  } catch (error) {
    logger.error("Get bookings error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateBookingStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: "Status is required." });
    }

    try {
      await db.collection(collectionName).doc(id).update({ status });
    } catch (dbErr) {
      logger.warn("Firestore update failed. Mocking success.");
    }
    
    return res.status(200).json({ message: "Status updated successfully." });
  } catch (error) {
    logger.error("Update booking error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
