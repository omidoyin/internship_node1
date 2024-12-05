module.exports = (sequelize, DataTypes) => {
    const schedule = sequelize.define(
      "schedule",
      {
        date: {
            type: DataTypes.DATEONLY,
            allowNull: false,
          },
        startTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
        endTime: {
            type: DataTypes.TIME,
            allowNull: false,
        },
      },
      {
        timestamps: true,
        freezeTableName: true,
        tableName: "schedule",
      },
      {
        underscoredAll: false,
        underscored: false,
      }
    );
  
    return schedule;
  };