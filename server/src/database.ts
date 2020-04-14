import * as mysql from 'mysql'
import { responses } from './declarations/httpResponse'
import { logger } from './logger'

class Database {
  db: any;
  // connect to the database
  connect () {
    this.db = mysql.createPool({
      connectionLimit: 10,
      host: process.env.TEMPLATE_DB_HOST,
      user: process.env.TEMPLATE_DB_USERNAME,
      password: process.env.TEMPLATE_DB_PASSWORD,
      database: process.env.TEMPLATE_DB_NAME
    })
    // test the database connection with a simple query
    this.query('SELECT 1').catch((err) => {
      logger.error('Failed to connect to the database')
      throw new Error(err)
    })
    logger.success('Connected to the database !')
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

  private handleDbError (error) {
    console.error('Database request failed:', error)
    return (responses.HTTP_500)
  }
}

const database = new Database()

export default database
