const Client = require('../../client');
const client = new Client({ apiKey: process.env.API_KEY, secretKey: process.env.SECRET_KEY, logLevel: process.env.LOG_LEVEL || 'DEBUG' });
const user = client.user;

describe('user module', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    it('should get the last trades as an object', done => {        
        user.lastTrades()
            .then(trades => {
                expect(trades.constructor).toBe(Object);
                done();
            })
            .catch(err => {
                expect(err).toBeNull();
                done();
            });
    });
    it('should get the deposits history of btc as an object', done => {
        let client = new Client({ apiKey: process.env.API_KEY, secretKey: process.env.SECRET_KEY });
        user.depositsHistory('btc')
            .then(deposits => {
                expect(deposits.constructor).toBe(Object);
                done();
            })
            .catch(err => {
                console.log(err);
                expect(err).toBeNull();
                done();
            });
    });
    it('should get the withdraws history of xrb as an object', done => {
        let client = new Client({ apiKey: process.env.API_KEY, secretKey: process.env.SECRET_KEY });
        user.withdrawsHistory('xrb')
            .then(withdraws => {
                expect(withdraws.constructor).toBe(Object);
                done();
            })
            .catch(err => {
                expect(err).toBeNull();
                done();
            });
    });
});
