var express = require("express");
var router = express.Router();
const moment = require("moment-timezone");


const sampleData = {
  title: 'My Calendar',
  header: 'Weekly Schedule',
  duration: '1 hour',
  timezone: 'eastern GMT',
  days: [
      { name: 'Monday', date: '2023-10-23' },
      { name: 'Tuesday', date: '2023-10-24' },
      { name: 'Wednesday', date: '2023-10-25' },
      { name: 'Thursday', date: '2023-10-26' },
      { name: 'Friday', date: '2023-10-27' },
      { name: 'Saturday', date: '2023-10-28' },
      { name: 'Sunday', date: '2023-10-29' }
  ],
  timeSlots: ['9:00am', '10:00am', '11:00am', '12:00pm', '1:00pm', '2:00pm', '3:00pm']
};


/* GET home page. */
router.get("/", function (req, res, next) {
  const timezones = moment.tz.names();
  res.render("indexcopy", { sampleData });
});

module.exports = router;
