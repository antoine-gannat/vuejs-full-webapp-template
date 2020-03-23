import * as mysql from 'mysql';
import HTTPResponse, { responses } from './declarations/httpResponse';

class Database {
  db: any;
  // connect to the database
  connect() {
    this.db = mysql.createPool({
      connectionLimit: 10,
      host: process.env.TEMPLATE_DB_HOST,
      user: process.env.TEMPLATE_DB_USERNAME,
      password: process.env.TEMPLATE_DB_PASSWORD,
      database: process.env.TEMPLATE_DB_NAME
    });
  }
  query(query: string, params?: any[]): Promise<any> {
    return (new Promise((resolve, reject) => {
      if (!this.db) {
        reject(responses.HTTP_500);
        return;
      }
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
  private handleDbError(error): HTTPResponse {
    console.error("Database request failed:", error);
    return (responses.HTTP_500);
  }
}

let database = new Database();

export default database;