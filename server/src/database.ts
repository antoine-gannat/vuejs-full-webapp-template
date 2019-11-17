import * as mysql from 'mysql';

class Database {
    db: any;
    connect() {
        this.db = mysql.createPool({
            connectionLimit: 10,
            host: process.env.STOCKSIMULATOR_DB_HOST,
            user: process.env.STOCKSIMULATOR_DB_USERNAME,
            password: process.env.STOCKSIMULATOR_DB_PASSWORD,
            database: process.env.STOCKSIMULATOR_DB_NAME
        });
    }
    getDb() {
        return (this.db);
    }
}

let database = new Database();

export default database;