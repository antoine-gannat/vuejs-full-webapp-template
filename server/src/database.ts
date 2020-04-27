import * as mysql from 'mysql'
import { responses } from './declarations/httpResponse'
import { logger } from './logger'

class Database {
  db: any;
  // connect to the database
  connect () {
    return new Promise((resolve, reject) => {
      this.db = mysql.createPool({
        connectionLimit: 10,
        host: process.env.template_webapp_DB_HOST,
        user: process.env.template_webapp_DB_USERNAME,
        password: process.env.template_webapp_DB_PASSWORD,
        database: process.env.template_webapp_DB_NAME
      })
      // test the database connection with a simple query
      this.query('SELECT 1')
        .then(() => {
          resolve(true)
          logger.success('Connected to the database !')
        })
        .catch((err) => {
          logger.error('Failed to connect to the database')
          reject(err)
        })
    })
  }

  query (query: string, params?: any[]): Promise<any> {
    return (new Promise((resolve, reject) => {
      if (!this.db) {
        reject(responses.HTTP_500)
        return
      }
      this.db.query(query, params || [], (error, results) => {
        if (error) {
          reject(this.handleDbError(error))
        } else {
          resolve(results)
        }
      })
    }))
  }

  getDb () {
    return (this.db)
  }

  private handleDbError (error:any) {
    console.error('Database request failed:', error)
    return (responses.HTTP_500)
  }
}

const database = new Database()

export default database
