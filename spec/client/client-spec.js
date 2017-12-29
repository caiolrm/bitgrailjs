const Client = require('../../client');

describe('client', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    it('should import its modules successfully', done => {
        let client = new Client({ logLevel: process.env.LOG_LEVEL || 'DEBUG' });
        expect(client.order).not.toBeUndefined();
        expect(client.user).not.toBeUndefined();
        expect(client.wallet).not.toBeUndefined();
        done();
    });
});
