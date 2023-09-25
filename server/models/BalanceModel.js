const { Schema, model } = require("mongoose");

const balanceSchema = new Schema({
  balance: {
    type: Number,
    required: true,
  },
});

const Balance = model("Balance", balanceSchema);

module.exports = Balance;