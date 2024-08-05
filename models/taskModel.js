const mongoose = require('mongoose');
const db = require('../config/dbConnection');

const taskSchema = new mongoose.Schema({
    title : { type : String , required : true},
    description : { type : String},
    date : { type : Date},
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },   
});

taskSchema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

module.exports = db.model('Tasks', taskSchema);