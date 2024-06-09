'use strict';
var mongoose = require('mongoose'),
		Schema = mongoose.Schema,
		ObjectId = Schema.ObjectId

var fields = {
  id:{type:Number},
  first_name: { type: String },
  last_name:{type:String},
  city:{type : String},
  company:{type:String}
};

var customerSchema = new Schema(fields, {timestamps: true});

module.exports = mongoose.model('customer', customerSchema);
