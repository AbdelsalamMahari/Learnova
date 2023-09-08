const  PaymentEnrollment  = require("../models/PaymentEnrollmntModel");

// Create a new payment enrollment
module.exports.createPaymentEnrollment = async (req, res) => {
  try {
    const paymentEnrollment = new PaymentEnrollment(req.body);
    await paymentEnrollment.save();
    res.status(201).json(paymentEnrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while creating the payment enrollment." });
  }
};

// Get all payment enrollments
module.exports.getAllPaymentEnrollments = async (req, res) => {
  try {
    const paymentEnrollments = await PaymentEnrollment.find();
    res.json(paymentEnrollments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching payment enrollments." });
  }
};

// Get one payment enrollment by ID
module.exports.getOnePaymentEnrollment = async (req, res) => {
  try {
    const paymentEnrollment = await PaymentEnrollment.findById(req.params.id);
    if (!paymentEnrollment) {
      return res.status(404).json({ error: "Payment enrollment not found." });
    }
    res.json(paymentEnrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while fetching the payment enrollment." });
  }
};

// Update a payment enrollment by ID
module.exports.updatePaymentEnrollment = async (req, res) => {
  try {
    const paymentEnrollment = await PaymentEnrollment.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!paymentEnrollment) {
      return res.status(404).json({ error: "Payment enrollment not found." });
    }
    res.json(paymentEnrollment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while updating the payment enrollment." });
  }
};

// Delete a payment enrollment by ID
module.exports.deletePaymentEnrollment = async (req, res) => {
  try {
    const paymentEnrollment = await PaymentEnrollment.findByIdAndRemove(req.params.id);
    if (!paymentEnrollment) {
      return res.status(404).json({ error: "Payment enrollment not found." });
    }
    res.json({ message: "Payment enrollment deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred while deleting the payment enrollment." });
  }
};
