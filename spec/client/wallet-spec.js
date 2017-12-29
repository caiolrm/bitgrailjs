const Client = require('../../client');
const client = new Client({ apiKey: process.env.API_KEY, secretKey: process.env.SECRET_KEY, logLevel: process.env.LOG_LEVEL || 'DEBUG' });
const wallet = client.wallet;

describe('wallet module', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    it('should get the balances as an object', done => {
        wallet.balances()
            .then(balances => {
                expect(balances.constructor).toBe(Object);
                done();
            })
            .catch(err => {                
                expect(err).toBeNull();
                done();
            });
    });
    it('should get a valid btc address', done => {
        wallet.getDepositAddress('btc')
            .then(address => {                
                expect(address).not.toBeNull();
                done();
            })
            .catch(err => {                
                expect(err).toBeNull();
                done();
            });
    });
});
