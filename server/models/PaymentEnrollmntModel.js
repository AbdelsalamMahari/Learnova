const mongoose = require("mongoose");

const PaymentEnrollmentSchema = new mongoose.Schema({
  enrollment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Enrollment",
    required: true,
  },
  paymentStatus: {
    type: String,
    enum: ["Paid", "Pending", "Waived"],
    required: true,
  },
  paymentDate: {
    type: Date,
  },
});

const PaymentEnrollment = mongoose.model("PaymentEnrollment", PaymentEnrollmentSchema);

module.exports = PaymentEnrollment;
