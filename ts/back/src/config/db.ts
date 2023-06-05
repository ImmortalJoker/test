import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  process.env.PGDATABASE!,
  process.env.PGUSER!,
  process.env.PGPASSWORD!,
  {
    host: process.env.PGHOST!,
    port: Number(process.env.PGPORT),
    dialect: 'postgres'
  }
);

export const testDbConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
