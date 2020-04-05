const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);
let token,directorId;

describe('api/director tests', () => {
    before((done) => {
       chai.request(server)
           .post('/entry/authenticate')
           .send({username : 'AliYerinde',password : 'ali1234'})
           .end((err,res) => {
              token = res.body.token;
              done();
           });
    });
    describe('/GET directors', () => {
        it('it should GET all the directors',(done) => {
            chai.request(server)
                .get('/api/directors')
                .set('x-access-token',token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    describe('/POST director',() => {
        it('it should POST a director',(done) =>{
           const director = {
               name : "Trt",
               surname : "Spor",
               bio : "Kanal"
           };
           chai.request(server)
               .post('/api/directors')
               .send(director)
               .set('x-access-token',token)
               .end((err,res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('name');
                  res.body.should.have.property('surname');
                  res.body.should.have.property('bio');
                  directorId = res.body._id;
                  done();
               });
        });
    });
    describe('/GET/:director_id director',() =>{
        it('it should GET a director by the given id',(done) => {
            chai.request(server)
                .get('/api/directors/'+ directorId)
                .set('x-access-token',token)
                .end((err,res) => {

                    res.should.have.status(200);
                    res.body.should.be.a('array');

                    done();
                });
        });
    });
});