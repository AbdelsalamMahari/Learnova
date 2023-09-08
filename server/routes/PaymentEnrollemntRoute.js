const { Router } = require("express");
const {createPaymentEnrollment,getAllPaymentEnrollments,getOnePaymentEnrollment,updatePaymentEnrollment ,deletePaymentEnrollment } = require("../controllers/PaymentEnrollemntController");

const router = Router();

// Create a new payment enrollment
router.post("/add/pay", createPaymentEnrollment);

// Get all payment enrollments
router.get("/get/pay", getAllPaymentEnrollments);

// Get one payment enrollment by ID
router.get("/get/pay/:id", getOnePaymentEnrollment);

// Update a payment enrollment by ID
router.put("/update/pay/:id", updatePaymentEnrollment);

// Delete a payment enrollment by ID
router.delete("/delete/pay/:id", deletePaymentEnrollment);

module.exports = router;
