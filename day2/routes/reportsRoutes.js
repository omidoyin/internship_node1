const express = require('express');
const router = express.Router();
const reportService = require('../services/reportService');

// Get sale report for a specific month and year
router.get('/sale', async (req, res) => {
  const { month, year } = req.query;
  try {
    const result = await reportService.getSaleReportByMonthAndYear(month, year);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get sale report between a date range
router.get('/sale/range', async (req, res) => {
  const { from_date, to_date } = req.query;
  try {
    const result = await reportService.getSaleReportByDateRange(from_date, to_date);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get monthly sale report for a given year
router.get('/monthly', async (req, res) => {
  const { year } = req.query;
  try {
    const result = await reportService.getMonthlySaleReport(year);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Get sale report by user for a specific year
router.get('/user', async (req, res) => {
  const { year, user_id } = req.query;
  try {
    const result = await reportService.getSaleReportByUser(year, user_id);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;
