const Client = require('../../client');
const client = new Client({ apiKey: process.env.API_KEY, secretKey: process.env.SECRET_KEY, logLevel: process.env.LOG_LEVEL || 'DEBUG' });
const order = client.order;

describe('order module', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    it('should get the open orders as an array', done => {
        order.openOrders()
            .then(orders => {
                expect(Array.isArray(orders)).toBe(true);
                done();
            })
            .catch(err => {
                console.log(err);
                expect(err).toBeNull();
                done();
            });
    });
});
