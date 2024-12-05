const sequelize = require('../models/index').sequelize
const Sequelize = require('sequelize')
const {DataTypes} = Sequelize
const Availability = require("../models/Availability")(sequelize, DataTypes)
const Schedule = require("../models/Schedule")(sequelize, DataTypes)


exports.createAppointment = async (req, res) => {
  try {
    const { date, startTime, endTime } = req.body;
    if(!date || !startTime || !endTime) res.send('missing params')
    const appointment = await Schedule.create({
      date,
      startTime,
      endTime,
    });
    return res.status(201).json({ success: true, data: appointment });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, error: 'Server Error' });
  }
};

exports.getAvailableTimes = async (req, res) => {
    try {
      const availableTimes = await Availability.findAll({});
      const bookedTimes = await Schedule.findAll({});
      const filteredAvailableTimes = availableTimes.map(availableTime => {
        const dateBookedTimes = bookedTimes
          .filter(bookedTime => {
            // Filter booked times for the current available time's date
            return bookedTime.date === availableTime.date &&
              availableTime.startTime < bookedTime.endTime &&
              availableTime.endTime > bookedTime.startTime;
          })
          .map(bookedTime => ({
            startTime: bookedTime.startTime,
            endTime: bookedTime.endTime,
          }));
  
        const isAvailable = dateBookedTimes.length === 0;
  
        return { ...availableTime.toJSON(), isAvailable, bookedHours: dateBookedTimes };
      });
      // console.log(filteredAvailableTimes, "filteredAvailableTimes");
      return res.status(200).json({ success: true, data: filteredAvailableTimes });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ success: false, error: 'Server Error' });
    }
  };
  
  