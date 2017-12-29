'use strict';

module.exports = (client => ({
    lastTrades: () => {
        return new Promise((resolve, reject) => {
            client.post(`${client.basePath}/lasttrades`)
                .then(response => resolve(response.body))
                .catch(reject);
        });
    },
    depositsHistory: coin => {
        return new Promise((resolve, reject) => {
            client.post(`${client.basePath}/depositshistory`, { coin: coin })
                .then(response => resolve(response.body))
                .catch(reject);
        });
    },
    withdrawsHistory: coin => {
        return new Promise((resolve, reject) => {
            client.post(`${client.basePath}/withdrawshistory`, { coin: coin })
                .then(response => resolve(response.body))
                .catch(reject);
        });
    }
}));
