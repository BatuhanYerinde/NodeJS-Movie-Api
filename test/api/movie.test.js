const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);


let token, movie_id;

describe('/api/movies tests', () => {
    before((done) => {
        chai.request(server)
            .post('/entry/authenticate')
            .send({username: 'BatuhanYerinde', password:'batu1234'})
            .end((err,res) =>{

                token = res.body.token;
                done();
            });
    });
    describe('/GET movies', () => {
        it('it should GET all the movies', (done) => {
            chai.request(server)
                .get('/api/movies')
                .set('x-access-token', token)
                .end((err , res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });
    describe('POST movie',() => {
       it('it should POST a movie', (done) => {
           const movie = {
               title : 'udemy',
               director_id : '5dff14790893df2a10e396d6',
               category : 'komedi',
               country : 'Turkiye',
               year : 1982,
               imdb_score : 8
           };

           chai.request(server)
               .post('/api/movies')
               .send(movie)
               .set('x-access-token',token)
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.should.have.property('title');
                   res.body.should.have.property('director_id');
                   res.body.should.have.property('category');
                   res.body.should.have.property('country');
                   res.body.should.have.property('year');
                   res.body.should.have.property('imdb_score');
                   movie_id = res.body._id;
                   done();
               });
       });
    });
    describe('/GET/:movie_id movie',() => {
       it('it should GET a movie by the given id',(done) => {
           chai.request(server)
               .get('/api/movies/' + movie_id)
               .set('x-access-token', token)
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.should.have.property('title');
                   res.body.should.have.property('director_id');
                   res.body.should.have.property('category');
                   res.body.should.have.property('country');
                   res.body.should.have.property('year');
                   res.body.should.have.property('imdb_score');
                   res.body.should.have.property('_id').eql(movie_id);
                   done();
               });
       });
    });
    describe('/PUT/:movie_id movie',() => {
        it('it should UPDATE a movie given by id', (done) => {
            const movie = {
                title : 'kıyamet',
                director_id : '5dff14790893df2a10e396d6',
                category : 'korku-sevgi',
                country : 'Turkiye',
                year : 1983,
                imdb_score : 100
            };

            chai.request(server)
                .put('/api/movies/' + movie_id)
                .send(movie)
                .set('x-access-token',token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title').eql(movie.title);
                    res.body.should.have.property('director_id').eql(movie.director_id);
                    res.body.should.have.property('category').eql(movie.category);
                    res.body.should.have.property('country').eql(movie.country);
                    res.body.should.have.property('year').eql(movie.year);
                    res.body.should.have.property('imdb_score').eql(movie.imdb_score);

                    done();
                });
        });
    });
    describe('/DELETE/:movie_id movie',() => {
        it('it should DELETE a movie given by id', (done) => {

            chai.request(server)
                .delete('/api/movies/' + movie_id)
                .set('x-access-token',token)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(true);
                    done();
                });
        });
    });
});