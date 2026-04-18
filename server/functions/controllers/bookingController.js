const admin = require("firebase-admin");
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
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    };

    const docRef = await db.collection(collectionName).add(payload);
    await sendConfirmationEmail(email, name, service, date, time);

    return res.status(201).json({ id: docRef.id, message: "Booking created successfully." });
  } catch (error) {
    logger.error("Create booking error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const snapshot = await db.collection(collectionName).orderBy("createdAt", "desc").get();
    const bookings = [];
    
    snapshot.forEach(doc => {
      // Need to stringify dates/timestamps for JSON transport
      const data = doc.data();
      bookings.push({ id: doc.id, ...data, createdAt: data.createdAt ? data.createdAt.toDate().toISOString() : null });
    });

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
    
    if (!status) return res.status(400).json({ error: "Missing status field." });
    
    await db.collection(collectionName).doc(id).update({ status });
    return res.status(200).json({ message: "Status updated successfully." });
  } catch (error) {
    logger.error("Update status error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
