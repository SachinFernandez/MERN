const mongoose = require('mongoose');

const departmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    department_name: { type: String, required: true },
});

module.exports = mongoose.model('Department', departmentSchema);