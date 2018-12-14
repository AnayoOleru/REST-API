// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const app = require('../index');
// const routes = require('../routes/routes');


// chai.use(chaiHttp);
// const { expect } = chai;



// describe('GET \'/api/v1\'', () => {
//   it('It should return  welcome message', (done) => {
//     chai.request(app)
//       .get('/api/v1')
//       .end((err, res) => {
//         expect(err).to.be.null;
//         expect(res).to.have.headers;
//         expect(res).to.have.status(200);
//         expect(res).to.not.redirect;
//         expect(res.body).to.be.an('object');
//         done();
//       });
//   });
// });

// describe('GET /foods', () => {
//     it('should return all food order records', (done) => {
//       chai.request(app)
//         .get('/api/v1/foods')
//         .end((err, res) => {
//           expect(res.status).to.eql(200);
//           expect(res.body).to.not.be.empty; 
//           done(err);
//         });
//     });
//   });

// //   user can register
// describe('POST /users', () => {
//     it('It should return  welcome message', (done) => {
//       chai.request(app)
//         .post('/api/v1/users')
//         .end((err, res) => {
//           expect(err).to.be.null;
//           expect(res).to.have.headers;
//           expect(res).to.have.status(200);
//           expect(res).to.not.redirect;
//           expect(res.body).to.be.an('object');
//           done();
//         });
//     });
//   });



const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const should = chai.should();
const { expect, assert } = chai;

const apiVersion = '/api/v1';

chai.use(chaiHttp);

// Test to get all foods without authorization

describe('## /GET foods without Authorization header', () => {
  it('should GET all the foods', (done) => {
    chai.request(app)
      .get(`${apiVersion}/food`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// get all food orders with authorization
describe('## /GET foods with Authorization header', () => {
  it('should GET all the foods', (done) => {
    chai.request(app)
      .get(`${apiVersion}/foods`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

// test create a new food 
describe('## /POST create new food order without Authorization header', () => {
  it('should POST a new food', (done) => {
    chai.request(app)
      .post(`${apiVersion}/foods`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});

// to fetch a specific order by its ID
describe('## /GET foods/:orderId', () => {
  const orderId = '001';
  it('should GET a specific order by its ID', (done) => {
    chai.request(app)
      .get(`${apiVersion}/foods/${orderId}`)
      .set('Authorization', 'Bearer a41f8a8dbb67735da4d0f1ac100975ea3dc1409b022d4043d8584f0a18c3efbe')
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});


// for cancelling a food delivery order
describe('## /PUT food/:foodId/cancel without Authorization header', () => {
  it('should cancel a food delivery order', (done) => {
    chai.request(app)
      .put(`${apiVersion}/foods/:foodId/cancel`)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
