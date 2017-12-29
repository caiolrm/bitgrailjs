const Client = require('../../client');
const client = new Client({ logLevel: process.env.LOG_LEVEL || 'DEBUG' });
const public = client.public;

describe('public module', () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL = 20000;
    it('should get the markets as an object', done => {
        public.markets()
            .then(markets => {
                expect(markets.constructor).toBe(Object);
                done();
            })
            .catch(err => {
                console.log(err);
                expect(err).toBeNull();
                done();
            });
    });
    it('should get the ticker of btc-xrb as an object', done => {
        public.ticker('btc', 'xrb')
            .then(ticker => {
                expect(ticker.constructor).toBe(Object);
                done();
            })
            .catch(err => {
                console.log(err);
                expect(err).toBeNull();
                done();
            });
    });
    it('should get the order book of btc-xrb as an object', done => {
        public.orderBook('btc', 'xrb')
            .then(orderBook => {
                expect(orderBook.constructor).toBe(Object);
                done();
            })
            .catch(err => {
                console.log(err);
                expect(err).toBeNull();
                done();
            });
    });
    it('should get the trade history of btc-xrb as an array', done => {
        public.tradeHistory('btc', 'xrb')
            .then(tradeHistory => {
                expect(Array.isArray(tradeHistory)).toBe(true);
                done();
            })
            .catch(err => {
                console.log(err);
                expect(err).toBeNull();
                done();
            });
    });
});
