'use strict';

module.exports = (client => ({
    markets: () => {
        return new Promise((resolve, reject) => {
            client.get(`${client.basePath}/markets`)
                .then(response => resolve(response.body))
                .catch(reject);
        });
    },
    ticker: (fiat, coin) => {
        return new Promise((resolve, reject) => {
            client.get(`${client.basePath}/${fiat}-${coin}/ticker`)
                .then(response => resolve(response.body))
                .catch(reject);
        });
    },
    orderBook: (fiat, coin) => {
        return new Promise((resolve, reject) => {
            client.get(`${client.basePath}/${fiat}-${coin}/orderbook`)
                .then(response => resolve(response.body))
                .catch(reject);
        });
    },
    tradeHistory: (fiat, coin) => {
        return new Promise((resolve, reject) => {
            client.get(`${client.basePath}/${fiat}-${coin}/tradehistory`)
                .then(response => resolve(response.body))
                .catch(reject);
        });
    }
}));
