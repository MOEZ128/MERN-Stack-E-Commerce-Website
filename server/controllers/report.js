// report.js
const REPORT = require('mongoose').model('Report');

module.exports = {
  reportComment: (req, res) => {
    const newReport = new REPORT(req.body);
    newReport.save()
      .then(() => {
        res.status(200).json({
          message: 'Report submitted successfully.',
        });
      })
      .catch((err) => {
        console.log(err);
        return res.status(400).json({
          message: 'Something went wrong, please try again.'
        });
      });
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
