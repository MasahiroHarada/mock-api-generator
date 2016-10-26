module.exports = (sequelize, DataTypes) => {
  const Mock = sequelize.define("mock", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    api_key: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    underscored: true
  });

  return Mock;
};
