import * as mysql from 'mysql';
import HttpResponse from './declarations/httpResponse';

class Database {
  db: any;
  // connect to the database
  connect() {
    this.db = mysql.createPool({
      connectionLimit: 10,
      host: process.env.STOCKSIMULATOR_DB_HOST,
      user: process.env.STOCKSIMULATOR_DB_USERNAME,
      password: process.env.STOCKSIMULATOR_DB_PASSWORD,
      database: process.env.STOCKSIMULATOR_DB_NAME
    });
  }
  query(query: string, params?: any[]): Promise<any> {
    if (!this.db) {
      return new Promise((resolve, reject) => {
        reject({ code: 500, message: 'Database not connected' });
      });
    }
    return (new Promise((resolve, reject) => {
      this.db.query(query, params || [], (error, results) => {
        if (error) {
          reject(this.handleDbError(error));
        } else {
          resolve(results);
        }
      });
    }));
  }
  getDb() {
    return (this.db);
  }
  private handleDbError(error): HttpResponse {
    let response: HttpResponse = { code: 500, message: 'An internal error occured.' };
    console.error("Database request failed:", error);
    return (response);
  }
}

let database = new Database();

export default database;