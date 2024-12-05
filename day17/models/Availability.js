module.exports = (sequelize, DataTypes) => {
    const availability = sequelize.define(
        'availability', 
        {
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            day: {
                type: DataTypes.STRING, // You may want to use an ENUM for days
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
            tableName: "availablity",
        },
        {
            underscoredAll: false,
            underscored: false,
        }
        
    );
    return  availability;
};