const { Op } = require('sequelize');
const models = require('../models');
const order = models.order;

// Get sale report for a specific month and year
async function getSaleReportByMonthAndYear(month, year) {
  try {
    const result = await order.sum('total_amount', {
      where: {
        [Op.and]: [
          { month: month },
          { year: year },
        ],
      },
    });
    return { total_sale: result };
  } catch (err) {
    throw new Error(err.message);
  }
}

// Get sale report for a date range
async function getSaleReportByDateRange(from_date, to_date) {
  try {
    const result = await order.sum('total_amount', {
      where: {
        [Op.and]: [
          { date: { [Op.gte]: new Date(from_date) } },
          { date: { [Op.lte]: new Date(to_date) } },
        ],
      },
    });
    return { total_sale: result };
  } catch (err) {
    throw new Error(err.message);
  }
}

// Get monthly sale report for a given year
async function getMonthlySaleReport(year) {
  try {
    const result = await order.findAll({
      attributes: [
        [models.Sequelize.fn('month', models.Sequelize.col('date')), 'month'],
        [models.Sequelize.fn('sum', models.Sequelize.col('total_amount')), 'total_sale'],
      ],
      where: {
        year: year,
      },
      group: ['month'],
      having: models.Sequelize.where(models.Sequelize.fn('sum', models.Sequelize.col('total_amount')), '>', 0),
    });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}

// Get sale report by user for a specific year
async function getSaleReportByUser(year, user_id) {
  try {
    const result = await order.findAll({
      attributes: [
        [models.Sequelize.fn('month', models.Sequelize.col('date')), 'month'],
        [models.Sequelize.fn('sum', models.Sequelize.col('total_amount')), 'total_sale'],
      ],
      where: {
        year: year,
        user_id: user_id,
      },
      group: ['month'],
      having: models.Sequelize.where(models.Sequelize.fn('sum', models.Sequelize.col('total_amount')), '>', 0),
    });
    return result;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  getSaleReportByMonthAndYear,
  getSaleReportByDateRange,
  getMonthlySaleReport,
  getSaleReportByUser,
};
