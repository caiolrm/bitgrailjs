'use strict';

const fs = require('fs');
const path = require('path');
const basename = path.basename(module.filename);
const request = require('request');
const crypto = require('crypto');

module.exports = class Client {
    constructor(opts = {}) {
        this.apiKey = opts.apiKey;
        this.secretKey = opts.secretKey;
        this.basePath = opts.basePath || 'https://api.bitgrail.com/v1';
        this.logLevel = opts.logLevel;
        this._importModules();
    }

    _importModules() {
        return fs
            .readdirSync(__dirname)
            .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
            .forEach(file => {
                let clientModule = this._import(path.join(__dirname, file));
                this[clientModule._name] = clientModule;
            });
    }

    _import(filename) {
        this._log(`importing module ${filename}`, 'DEBUG');
        let moduleContents = require(filename)(this);
        moduleContents._name = this._getNameByFilename(path.parse(filename).name);
        return moduleContents;
    }

    _getNameByFilename(filename) {
        return filename
            .split('-')
            .map((val, index) => {
                if (index > 0)
                    return val.toUpperCase();
                return val.toLowerCase();
            })
            .join("");
    }

    _sign(key, input) {
        this._log(`signing ${input}`, 'DEBUG');
        var hmac = crypto.createHmac("sha512", key);
        return hmac
            .update(new Buffer(input, 'utf-8'))
            .digest("hex");
    }

    _encode(data) {
        this._log(`encoding ${JSON.stringify(data)}`, 'DEBUG');
        return Object
            .keys(data)
            .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
            .join('&');
    }

    error(err) {
        return new Error(err.message);
    }

    post(url, data) {
        this._log(`sending POST to ${url} with ${data ? JSON.stringify(data) : 'no parameters'}`, 'HTTP');
        return new Promise((resolve, reject) => {
            let body = this._encode(Object.assign(data || {}, { nonce: Date.now() }));
            let headers = {
                "Content-Type": "application/x-www-form-urlencoded",
                "Key": this.apiKey,
                "Signature": this._sign(this.secretKey, body)
            };
            let options = {
                uri: url,
                method: 'POST',
                headers: headers,
                body: body
            };
            return request.post(options, (err, response, body) => {
                this._log(`POST callback with (err: ${err}, status: ${response.statusCode}, body: ${body}`, 'HTTP');
                if (err)
                    return reject(this.error(err));
                let bodyJson = body && JSON.parse(body);
                if (bodyJson.success)
                    return resolve(Object.assign(response, { body: bodyJson.response }));
                return reject(this.error({ code: response.statusCode, message: response.response }));
            });
        });
    }

    get(url) {
        this._log(`sending GET to ${url}`, 'HTTP');
        return new Promise((resolve, reject) => {
            let options = {
                uri: url,
                method: 'GET'
            };
            return request.get(options, (err, response, body) => {
                this._log(`GET callback with (err: ${err}, status: ${response.statusCode}, body: ${body}`, 'HTTP');
                if (err)
                    return reject(this.error(err));
                let bodyJson = body && JSON.parse(body);
                if (bodyJson.success)
                    return resolve(Object.assign(response, { body: bodyJson.response }));
                return reject(this.error({ code: response.statusCode, message: response.response }));
            });
        });
    }

    _log(message, logLevel) {
        if (this.logLevel) {
            switch (this.logLevel.toUpperCase()) {
                case 'DEBUG':
                    if (logLevel === 'DEBUG')
                        console.log(`DEBUG | ${message}`);
                case 'HTTP':
                    if (logLevel === 'HTTP' || logLevel === 'DEBUG')
                        console.log(`HTTP | ${message}`);
            }
        }
    }
};
