const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const uuid = require('uuid');

const app = require('../../app');

chai.use(require('chai-http'));

describe('LocationControllerTest', ()=>{
    describe('/POST location', ()=>{
        it('testCreateLocation', (done)=>{
            chai.request(app)
                .post('/location/create')
                .send({
                    id: uuid.v4(),
                    location_name: 'Testing Location in Controller'
                })
                .end((err, res)=>{
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('data')
                    done();
                })
        })
    })
})