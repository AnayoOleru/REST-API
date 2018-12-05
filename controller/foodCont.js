const moment = require('moment');
const uuidv4 = require('uuid/v4');
const dbQuery = require('../dbQuery/query');

// food class controller with five methods connected to the endpoints routes
const Food = {
  /**
   * Create A new row in food table: when request to GET /foods API is called this block runs: 
   * @param {object} req 
   * @param {object} res
   * @returns {object} food object 
   */
  async create(req, res) {
    const text = `INSERT INTO
      foods(id, food_name, restaurant, owner_id, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
      
    //   grab the values given by the user on the request body(body-parser)
    const values = [
      uuidv4(),
      req.body.food_name,
      req.body.restaurant,
      req.user.id,
      moment(new Date()),
      moment(new Date())
    ];
    console.log(values);
    
    //SQL  catch and try  
    try {
      const { rows } = await dbQuery.query(text, values);
      return res.status(201).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get All Food
   * @param {object} req 
   * @param {object} res 
   * @returns {object} foods array
   */
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM foods where owner_id = $1';
    try {
      const { rows, rowCount } = await dbQuery.query(findAllQuery, [req.user.id]);
      return res.status(200).send({ rows, rowCount });
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Get A Food
   * @param {object} req 
   * @param {object} res
   * @returns {object} food object
   */
  async getOne(req, res) {
    const text = 'SELECT * FROM foods WHERE id = $1 AND owner_id = $2';
    try {
      const { rows } = await dbQuery.query(text, [req.params.id, req.user.id]);
      if (!rows[0]) {
        return res.status(404).send({'message': 'Food not found'});
      }
      return res.status(200).send(rows[0]);
    } catch(error) {
      return res.status(400).send(error)
    }
  },
  /**
   * Update A Food
   * @param {object} req 
   * @param {object} res 
   * @returns {object} updated food
   */
  async update(req, res) {
    const findOneQuery = 'SELECT * FROM foods WHERE id=$1 AND owner_id = $2';
    const updateOneQuery =`UPDATE foods
      SET food_name=$1,restaurant=$2,modified_date=$3
      WHERE id=$4 AND owner_id = $6 returning *`;
    try {
      const { rows } = await dbQuery.query(findOneQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'foods not found'});
      }
      const values = [
        req.body.food_name || rows[0].food_name,
        req.body.restaurant || rows[0].restaurant,
        moment(new Date()),
        req.params.id,
        req.user.id
      ];
      const response = await dbQuery.query(updateOneQuery, values);
      return res.status(200).send(response.rows[0]);
    } catch(err) {
      return res.status(400).send(err);
    }
  },
  /**
   * Delete A Food
   * @param {object} req 
   * @param {object} res 
   * @returns {void} return static code 204 
   */
  async delete(req, res) {
    const deleteQuery = 'DELETE FROM foods WHERE id=$1 AND owner_id = $2 returning *';
    try {
      const { rows } = await dbQuery.query(deleteQuery, [req.params.id, req.user.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'food not found'});
      }else{
      return res.status(204).send({ 'message': 'deleted' });
      }
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

module.exports = Food;