module.exports = function(sequelize, DataTypes) {
  var Packinglist = sequelize.define("Packinglist", {
    text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    quantity: DataTypes.INTEGER,
    season: {
      type: DataTypes.STRING,
      defaultValue: "All"
    },
    complete: DataTypes.BOOLEAN
  });
  
  return Packinglist;
};