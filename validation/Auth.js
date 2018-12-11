const jwt = require('jsonwebtoken');
const db = require('../dbQuery/query'); 

const Auth = {
  /**
   * Verify Token
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
  async verifyToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if(!token) {
      return res.status(400).send({ 'message': 'Token is not provided' });
    }
    try {
      const decoded = await jwt.verify(token, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decoded.userId]);
      if(!rows[0]) {
        return res.status(400).send({ 'message': 'The token you provided is invalid' });
      }
      req.user = { id: decoded.userId };
      next();
    } catch(error) {
      return res.status(400).send(error);
    }
  },
  /**
   * Require Authentication
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
   async requireAuth(req, res, next){
    const { authorization: token = '' } = req.headers || {};
  
    if (!token) {
      res.status(401).send({ error: { message: 'Unauthorized' } });
      return;
    }
  
    try {
      const { id } = await jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) return reject();
        return resolve(decoded);
      });

      const result = await db.query('SELECT id, email, is_admin FROM users WHERE id = $1', [id]);
  
      if (result.rowCount <= 0) {
        res.status(401).send({ error: { message: 'Unauthorized' } });
        return;
      }
      const user = result.rows[0];
      req.user = user;
      next();
    } catch (error) {
      res.status(500).send({ error: { message: 'Error verifying user.' } });
    }
  },
  /**
   * authenticate admin
   * @param {object} req 
   * @param {object} res 
   * @param {object} next
   * @returns {object|void} response object 
   */
  async adminAuth(req, res, next){
    const user = Object.assign({}, req.user);
    if (user && user.is_admin) {
      return next();
    }
    return res.status(401).send({ error: { message: 'Unauthorized' } });
  }
}

module.exports = Auth;