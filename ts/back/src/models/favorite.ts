import { DataTypes } from 'sequelize';

import { sequelize as sq } from '../config/db';

export const Favorite = sq.define("favorite", {
  id: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  neo_reference_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  user: {
    type: DataTypes.STRING,
    allowNull: false,
  }
});

Favorite.sync().then(() => {
  console.log("Favorite model successfully synced")
})
