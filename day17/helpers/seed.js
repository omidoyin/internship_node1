const moment = require('moment');

const seedDatabase = async (Availability) => {
  const startDate = moment().startOf('month');
  const endDate = moment().endOf('month');

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  for (let date = startDate.clone(); date.isSameOrBefore(endDate); date.add(1, 'day')) {
    const day = daysOfWeek[date.day()];
    await Availability.create({
      date: date.format('YYYY-MM-DD'),
      day,
      startTime: '09:00:00',
      endTime: '17:00:00',
    });
  }
};

module.exports = seedDatabase
