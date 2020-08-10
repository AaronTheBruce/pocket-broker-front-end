# Pocket Broker
An application made to track prices of cryptocurrencies and allow users to view and set events of interest to be notified by.
Ambition; implement a system akin to a stock trainer which would allow users to set event related to price changes to purchase and sell cryptocurrency.

## Tech Stack
React, Flask, Restx, Docker, CoinGecko API

#### API URL
api.coingecko.com/api/v3

## Front-End Features

A user should be able to sign-up and login/logout and be authenticated.
User should be able to select cryptos to follow and make

### User
- name
- address
- city,
- state,
- zip_code

### Watchlist
- user
- crypto

### Cryptos (Separate Table tied in with Portfolio?)
- name(forEach): String, the name of the cryptocurrency


## without API

### Price
- value: float,
- timestamp: datetime,
- crypto_id

### EventConfig
- watchlist_id
- percent_change
- timeframe
- user_id

### Events
- Timeframe: Datetime, time of concern; can be a day to a week/month. Meant to be of basis for percentages of average changes
- start_price: Price 1 (time) ago
- end_price: Price Now
- event_config_id

Assessed Timeframe 1 week [ **************** ]
Event happens @ 2 data point            localmin[ *]    localmax[* ]

(Bonus fields)
- Sellout number(nullable): numeric, USD value of crypto you'd be willing to liquidate your holdings for
- Sellout price(nullable): numeric, if this number is reached, trigger a sell event
- Buyin number(nullable): numeric, USD value of crypto you'd be willing to trigger a massive buyin of that crypto
- Buyin price(nullable): numeric, if this number is reached trigger a buy event

### Notifications
- Time: datetime, when the event was triggered
- crypto: string, the name of the crypto involved
- price: numeric, the current price of the crypto at the time of change
- percentage of change: percentage, the total % change of the event.

### Portfolio
- Cryptocurrency: boolean, allows user to select and choose which cryptos to obtain information for
- user_id

### Assets
- join for crypto and protfolio

### Wallet (Bonus TODO)
- relevant banking information
