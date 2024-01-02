// Report.js
const MONGOOSE = require('mongoose');
const OBJECT_ID = MONGOOSE.Schema.Types.ObjectId;

const REPORT_SCHEMA = MONGOOSE.Schema({
  reporter: { type: OBJECT_ID, ref: 'User' },
  reportedUser: { type: OBJECT_ID, ref: 'User' },
  comment: { type: OBJECT_ID, ref: 'Comment' },
  reason: { type: [String], required: true },
  creationDate: { type: Date, default: Date.now }
});

const REPORT = MONGOOSE.model('Report', REPORT_SCHEMA);
module.exports = REPORT;
