const chaiHttp = require('chai-http');
const chai = require('chai');
const mocha = require('mocha');
const app = require('../../app');
const expect = chai.expect;
const staticUUID = require('uuid').v4();
chai.use(chaiHttp);


describe('EventController', async ()=>{
    describe('/POST', async ()=>{
        it('testCreateEvent', (done)=>{
            const mockEventData = {
                id: staticUUID,
                event_name: 'Testing Event from Controller',
                location_id: '26a657fb-10a7-46f8-a837-c0b43cd73f83',
                schedule_start: '2020-10-10 09:00',
                schedule_end: '2020-10-15 23:59',
            }
            chai.request(app)
                .post('/events/create')
                .send(mockEventData)
                .end((req, res)=>{
                    console.log(res.status);
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });
    });

    describe('/GET', async ()=>{
        it('testGetEvent', (done)=>{
            chai.request(app)
                .get('/events/get_info')
                .query({
                    event_id: staticUUID
                })
                .end((req, res)=>{
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.a.property('id');
                    expect(res.body.id).to.equal(staticUUID);
                    done();
                })
        })
    });
});