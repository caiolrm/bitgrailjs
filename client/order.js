'use strict';

module.exports = (client => ({
    openOrders: () => {
        return new Promise((resolve, reject) => {
            client.post(`${client.basePath}/openorders`)
                .then(response => resolve(response.body))
                .catch(reject);
        });
    },
    buy: (market, amount, price) => {
        return new Promise((resolve, reject) => {
            client.post(`${client.basePath}/buyorder`, {
                market: market,
                amount: amount,
                price: price
            })
                .then(response => resolve(response.body))
                .catch(reject);
        });
    },
    sell: (market, amount, price) => {
        return new Promise((resolve, reject) => {
            client.post(`${client.basePath}/sellorder`, {
                market: market,
                amount: amount,
                price: price
            })
                .then(response => resolve(response.body))
                .catch(reject);
        });
    },
    cancel: id => {
        return new Promise((resolve, reject) => {
            client.post(`${client.basePath}/cancelorder`, { id: id })
                .then(response => resolve(response.body))
                .catch(reject);
        });
    }
}));
