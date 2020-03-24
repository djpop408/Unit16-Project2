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

  Packinglist.sync().then(() => {
    //General all season
    Packinglist.create({ text: "Socks", quantity: 4, season: "All", complete: false });
    Packinglist.create({ text: "Underwear", quantity: 4, season: "All", complete: false });
    Packinglist.create({ text: "Tee Shirt", quantity: 4, season: "All", complete: false });
    Packinglist.create({ text: "Shirt", quantity: 3, season: "All", complete: false });
    Packinglist.create({ text: "Long pants", quantity: 1, season: "All", complete: false });
    Packinglist.create({ text: "Hat", quantity: 1, season: "All", complete: false });
    Packinglist.create({ text: "Shoes", quantity: 1, season: "All", complete: false });
  });
  
  return Packinglist;
};