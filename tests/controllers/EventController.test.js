const chaiHttp = require('chai-http');
const chai = require('chai');
const mocha = require('mocha');
const app = require('../../app');
const expect = chai.expect;
const uuid = require('uuid');
const eventUUID = uuid.v4();
const ticketUUID = uuid.v4();
chai.use(chaiHttp);


describe('EventControllerTest', async ()=>{
    describe('/POST event', async ()=>{
        const mockEventData = {
            id: eventUUID,
            event_name: 'Testing Event from Controller',
            location_id: '26a657fb-10a7-46f8-a837-c0b43cd73f83',
            schedule_start: '2020-10-10 09:00',
            schedule_end: '2020-10-15 23:59',
        }
        it('testCreateEvent', (done)=>{
            chai.request(app)
                .post('/event/create')
                .send(mockEventData)
                .end((err, res)=>{
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.a('object');
                    done();
                });
        });

        it('testCreateEventWithFormValidationError', (done)=>{
            mockEventData.location_id = 'xyzabcd'; //in this case, we try to modify location_id using non-valid UUID pattern
            chai.request(app)
                .post('/event/create')
                .send(mockEventData)
                .end((err, res)=>{
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error_code','FORM_VALIDATION');
                    done();
                });
        });

        it('testCreateEventWithDuplicateEventID', (done)=>{
            //in this case, we put back the location_id using the original UUID pattern
            //since the eventUUID is not re-generate here, so it will be a duplicate issue
            mockEventData.location_id = '26a657fb-10a7-46f8-a837-c0b43cd73f83';
            chai.request(app)
                .post('/event/create')
                .send(mockEventData)
                .end((err, res)=>{
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('error_code', 'INTERNAL_SERVER_ERROR');
                    done();
                });
        });
    });

    describe('/POST ticket', async ()=>{
        const mockTicketData = {
            id: ticketUUID,
            event_id: eventUUID,
            ticket_type: 'VVIP',
            price: 80000,
            quota: 16,
        }

        it('testCreateTicket', (done) => {
            chai.request(app)
                .post('/event/ticket/create')
                .send(mockTicketData)
                .end((err, res)=>{
                    expect(res).to.have.status(201);
                    expect(res.body).to.be.a('object');
                    done();
                })
        });

        it('testCreateTicketWithFormValidationError', (done) => {
            mockTicketData.event_id = 'xyzxyz';
            chai.request(app)
                .post('/event/ticket/create')
                .send(mockTicketData)
                .end((err, res)=>{
                    expect(res).to.have.status(400);
                    expect(res.body).to.have.property('error_code','FORM_VALIDATION');
                    done();
                })
        });

        it('testCreateTicketWithDuplicateTicketID', (done) => {
            mockTicketData.event_id = eventUUID
            chai.request(app)
                .post('/event/ticket/create')
                .send(mockTicketData)
                .end((err, res)=>{
                    expect(res).to.have.status(500);
                    expect(res.body).to.have.property('error_code', 'INTERNAL_SERVER_ERROR');
                    done();
                })
        });
    })

    describe('/GET event', async ()=>{
        it('testGetEvent', (done)=>{
            chai.request(app)
                .get('/event/get_info')
                .query({
                    event_id: eventUUID
                })
                .end((err, res)=>{
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.a.property('id');
                    expect(res.body.ticket).to.be.a('array');
                    expect(res.body.ticket[0]).to.have.a.property('ticket_type')
                    done();
                })
        })
    });
});