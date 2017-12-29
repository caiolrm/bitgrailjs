'use strict';

module.exports = (client => ({
    balances: () => {
        return new Promise((resolve, reject) => {
            client.post(`${client.basePath}/balances`)
                .then(response => resolve(response.body))
                .catch(reject);
        });
    },
    getDepositAddress: coin => {
        return new Promise((resolve, reject) => {
            client.post(`${client.basePath}/getdepositaddress`, { coin: coin })
                .then(response => resolve(response.body))
                .catch(reject);
        });
    },
    withdraw: (coin, amount, address) => {
        return new Promise((resolve, reject) => {
            client.post(`${client.basePath}/withdraw`, {
                coin: coin,
                amount: amount,
                address: address
            })
                .then(response => resolve(response.body))
                .catch(reject);
        });
    }
}));
