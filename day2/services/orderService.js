const { Op, literal } = require('sequelize');
const models = require('../models');

const order = models.order;

// Get paginated orders
async function getPaginatedOrders(page, limit, sort, direction) {
  try {
    const offset = (page - 1) * limit;
    const result = await order.findAndCountAll({
      limit: limit,
      offset: offset,
      order: [[sort || 'id', direction || 'ASC']],
    });
    return {
      total: result.count,
      page: page,
      list: result.rows,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

// Get orders with odd ids
async function getOrdersWithOddIds() {
  try {
    const orders = await order.findAll({
      where: literal('id % 2 = 1'),
    });
    return orders;
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  getPaginatedOrders,
  getOrdersWithOddIds,
};
