# BitgrailJS

A unofficial nodejs client for the https://bitgrail.com API, you can get their docs at https://bitgrail.com/api-documentation

> THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.

# API keys

For private methods get a pair of API keys at https://bitgrail.com/api-keys and use both to instantiate a client like this:

```javascript
const Bitgrailjs = require('bitgrailjs');
const client = new Bitgrailjs({ apiKey: 'YOU_API_KEY_HERE', secretKey: 'YOUR_SECRET_HERE' });
```

*OBS:* To be able to use trading or withdraw methods, you must enable "Allow trading" and/or "Allow withdraw" options when generating a new pair

# Submodules

The client has 4 submodules: public, order, user and wallet. Each module implement calls to specific endpoints at bitgrail as simple methods returning promises. For example, wallet has the `getDepositAddress` method receiving a `coin` parameter, so the usage would be something like:

```javascript
const Bitgrailjs = require('bitgrailjs');
const client = new Bitgrailjs({ apiKey: process.env.API_KEY, secretKey: process.env.SECRET_KEY });
const wallet = client.wallet;

wallet.getDepositAddress('btc').then(address => console.log(address));
```

### Public

- `markets()`
- `ticker(fiat, coin)`
- `orderBook(fiat, coin)`
- `tradeHistory(fiat, coin)`

### Order

- `openOrders()`
- `buy(market, amount, price)`
- `sell(market, amount, price)`
- `cancel(id)`

### User

- `lastTrades(coin)`
- `depositsHistory(coin)`
- `withdrawsHistory(coin)`

### Wallet

- `balances()`
- `getDepositAddress(coin)`
- `withdraw(coin, amount, address)`

### Websocket

This client has no support for that at the moment, but it probably will at some point.

# Setup

```bash
npm install bitgrailjs --save
```