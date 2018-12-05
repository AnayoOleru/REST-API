const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

const dbQuery = {
  /**
   * DB Query: PRomise
   * @param {object} req
   * @param {object} res
   * @returns {object} object 
   */
  query(text, params){
    return new Promise((resolve, reject) => {
      pool.query(text, params)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      })
    })
  }
}

module.exports = dbQuery;