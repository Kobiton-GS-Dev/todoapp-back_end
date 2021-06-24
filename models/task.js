/* eslint-disable indent */
/* eslint-disable no-trailing-spaces */
/* eslint-disable linebreak-style */
const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    taskContent: {
        type: 'string',
        required: true,
    },
    taskCompleted: {
        type: 'boolean',
        required: true,
    },
});

const tasks = mongoose.model('task', taskSchema);
module.exports = tasks;
