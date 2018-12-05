const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

// connect to database in the .env file 
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Food Tables
 */
const createFoodTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      foods(
        id UUID PRIMARY KEY,
        food_name VARCHAR(128) NOT NULL,
        restaurant VARCHAR(128) NOT NULL,
        owner_id UUID NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
      )`;

    //   after creating tables show all the tables and end. If error, diplay the error
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

// create user table
const createUserTable = () => {
    const queryText =
      `CREATE TABLE IF NOT EXISTS
        users(
          id UUID PRIMARY KEY,
          email VARCHAR(128) UNIQUE NOT NULL,
          password VARCHAR(128) NOT NULL,
          created_date TIMESTAMP,
          modified_date TIMESTAMP
        )`;
  
    pool.query(queryText)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  }

/**
 * Drop Food Tables
 */
const dropFoodTable = () => {
  const queryText = 'DROP TABLE IF EXISTS foods';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop User Table
 */
const dropUserTable = () => {
    const queryText = 'DROP TABLE IF EXISTS users returning *';
    pool.query(queryText)
      .then((res) => {
        console.log(res);
        pool.end();
      })
      .catch((err) => {
        console.log(err);
        pool.end();
      });
  }

  /**
 * Create All Tables
 */
const createAllTables = () => {
    createUserTable();
    createFoodTable();
  }
  /**
   * Drop All Tables
   */
  const dropAllTables = () => {
    dropUserTable();
    dropFoodTable();
  }

  pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
  });

// exports to be used in package.json to fire them up, 
module.exports = {
  createFoodTables,
  createUserTables,
  createAllTables,
  dropUserTable,
  dropFoodTable,
  dropAllTables
};

require('make-runnable');