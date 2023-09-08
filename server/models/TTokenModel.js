const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TTokenSchema = new Schema({
	teacherId: {
		type: Schema.Types.ObjectId,
		required: true,
		ref: "teacher",
		unique: true,
	},
	token: { type: String, required: true },
	createdAt: { type: Date, default: Date.now, expires: 3600 },
});

module.exports = mongoose.model("t-token", TTokenSchema);