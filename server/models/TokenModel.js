const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
	studentId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "student",
		unique: true,
	},
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
});

module.exports = mongoose.model("token", TokenSchema);