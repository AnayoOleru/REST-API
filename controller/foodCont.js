const moment = require('moment');
const uuidv4 = require('uuid/v4');
const dbQuery = require('../dbQuery/query');


const Food = {
  /**
   * Create A new food
   * @param {object} req 
   * @param {object} res
   * @returns {object} food object 
   */
  async create(req, res) {
    const text = `INSERT INTO
      foods(id, food_name, restaurant, created_date, modified_date)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      uuidv4(),
      req.body.food_name,
      req.body.restaurant,
      moment(new Date()),
      moment(new Date())
    ];

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
    const findAllQuery = 'SELECT * FROM foods';
    try {
      const { rows, rowCount } = await dbQuery.query(findAllQuery);
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
    const text = 'SELECT * FROM foods WHERE id = $1';
    try {
      const { rows } = await dbQuery.query(text, [req.params.id]);
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
    const findOneQuery = 'SELECT * FROM foods WHERE id=$1';
    const updateOneQuery =`UPDATE foods
      SET food_name=$1,restaurant=$2,modified_date=$3
      WHERE id=$4 returning *`;
    try {
      const { rows } = await dbQuery.query(findOneQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'foods not found'});
      }
      const values = [
        req.body.food_name || rows[0].food_name,
        req.body.restaurant || rows[0].restaurant,
        moment(new Date()),
        req.params.id
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
    const deleteQuery = 'DELETE FROM foods WHERE id=$1 returning *';
    try {
      const { rows } = await dbQuery.query(deleteQuery, [req.params.id]);
      if(!rows[0]) {
        return res.status(404).send({'message': 'food not found'});
      }
      return res.status(204).send({ 'message': 'deleted' });
    } catch(error) {
      return res.status(400).send(error);
    }
  }
}

export default Food;