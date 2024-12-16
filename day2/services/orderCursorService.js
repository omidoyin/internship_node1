const models = require('../models');
const order = models.order;

// Get orders using cursor pagination
async function getOrdersWithCursor(id, limit, sort = 'id', direction = 'ASC') {
  try {
    const result = await order.findAll({
      where: {
        id: {
          [Op.gt]: id,
        },
      },
      limit: limit,
      order: [[sort, direction]],
    });

    return {
      id: id,
      list: result,
    };
  } catch (err) {
    throw new Error(err.message);
  }
}

module.exports = {
  getOrdersWithCursor,
};
