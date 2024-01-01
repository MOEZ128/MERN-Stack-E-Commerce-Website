// report.js
const REPORT = require('mongoose').model('Report');
const USER = require('mongoose').model('User');

module.exports = {
 reportComment: async (req, res) => {
   try {
     const reporter = await USER.findById(req.body.reporterId);
     const reportedUser = await USER.findById(req.body.reportedUserId);

     if (!reporter || !reportedUser) {
       return res.status(400).json({ message: 'Invalid reporter or reported user.' });
     }

     const newReport = new REPORT({
       reporter: reporter,
       reportedUser: reportedUser,
       comment: req.body.comment,
       reason: req.body.reason,
       creationDate: req.body.creationDate || Date.now()
     });

     await newReport.save();
     res.status(200).json({ message: 'Report submitted successfully.' });
   } catch (err) {
     console.log(err);
     return res.status(400).json({ message: 'Something went wrong, please try again.' });
   }
 },
  getReports: (req, res) => {
    REPORT.find()
      .populate('reporter reportedUser comment')
      .then((reports) => {
        res.status(200).json({
          message: '',
          data: reports
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: 'Something went wrong, please try again.'
        });
      });
  }
};
