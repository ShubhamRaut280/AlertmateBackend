const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    name: { type: String },
    email: { type: String, unique: true, required: true },
    phone: { type: String },
    image_url: { type: String },
    emergency: { type: Boolean, default: false },
    family_members: { type: [String], default: [] }
});

const UserProfile = mongoose.model("UserProfile", profileSchema);

module.exports = { UserProfile };
