export default {
  host: process.env.MYSQL_HOST || 'localhost',
  port: Number(process.env.MYSQL_PORT) || 3306,
  user: process.env.MYSQL_USER || 'root',
  database: process.env.MYSQL_DATABASE || 'store_manager',
  password: process.env.MYSQL_PASSWORD || 'password',
};
