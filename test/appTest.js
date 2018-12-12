const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');
const routes = require('../routes/routes');


chai.use(chaiHttp);
const { expect } = chai;



describe('GET \'/api/v1\'', () => {
  it('It should return  welcome message', (done) => {
    chai.request(app)
      .get('/api/v1')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.headers;
        expect(res).to.have.status(200);
        expect(res).to.not.redirect;
        expect(res.body).to.be.an('object');
        done();
      });
  });
});

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

