import mysql from "mysql2/promise";

const db = await mysql.createConnection({
  host: "db-biblioteca.cw2dxrj7cvep.us-east-1.rds.amazonaws.com",
  user: "admin",
  password: "71781037Ss",
  database: "biblioteca"
});

export default db;