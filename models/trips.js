module.exports = function (sequelize, DataTypes) {
    var Trips = sequelize.define("Trips", {
        name: { type: DataTypes.STRING, allowNull: false },
        destination: { type: DataTypes.STRING, allowNull: false },
        date_start: { type: DataTypes.DATE, allowNull: false },
        date_end: { type: DataTypes.DATE, allowNull: false },
        airline:{type:DataTypes.STRING,allowNull:true}
    });

    Trips.associate = function(models){
        Trips.belongsTo(models.Users,{
            foreignKey: {
                allowNull: false
            }  
        })
    }

    return Trips;
};
