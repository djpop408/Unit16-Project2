module.exports = function (sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        name: { type: DataTypes.STRING, allowNull: false },
        googleID: { type: DataTypes.STRING, allowNull: true }
    });
    Users.associate = function(models){
        Users.hasMany(models.Trips,{
            onDelete:"cascade"
        });
    }
    return Users;
};