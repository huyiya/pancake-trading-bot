# Pancake trading bot

## Motivation
![JOJO-1d](https://user-images.githubusercontent.com/33257682/135823603-97454050-ea81-41cd-8750-ddcf17adc899.png)

## Usage
### 1. Clone this repository
### 2. Create .env
```bash
# 56: Mainnet
# 97: Testnet
CHAIN_ID = 56
BSC_WSS_MAINNET = wss://bsc-ws-node.nariox.org:443
BSC_WSS_TESTNET = wss://speedy-nodes-nyc.moralis.io/a017edfc35305ed845462871/bsc/testnet/ws

GAS_LIMIT = 800000

TARGET_TOKEN = <ADDRESS_OF_TOKEN_YOU_WANT_TO_BUY>

PRIVATE_KEY = <YOUR_PRIVATE_KEY>

# true: If liquidity is added with BNB and vice versa
LIQUIDITY_IN_BNB = <true/false>
# If LIQUIDITY_IN_BNB = true
AMOUNT_BNB = <AMOUNT_OF_BNB_YOU_WANT_TO_BUY>
# If LIQUIDITY_IN_BNB = false
AMOUNT_BUSD = <AMOUNT_OF_BUSD_YOU_WANT_TO_BUY>

```

### 3. Install dependencies
```bash
$ npm i
```

### 4. Run
```bash
$ npm run pm2
```

## Flow
![Flow-sniper-bot](https://user-images.githubusercontent.com/33257682/135856184-a4ee9f73-d765-47c7-9503-4572da3a71b4.png)

## Examples
### Add Liquidity ETH
```js
{
  name: 'addLiquidityETH',
  params: [
    {
      name: 'token',
      value: '0x5ca42204cdaa70d5c773946e69de942b85ca6706',
      type: 'address'
    },
    {
      name: 'amountTokenDesired',
      value: '2090000000000000000',
      type: 'uint256'
    },
    {
      name: 'amountTokenMin',
      value: '2048200000000000000',
      type: 'uint256'
    },
    {
      name: 'amountETHMin',
      value: '22011260993127187',
      type: 'uint256'
    },
    {
      name: 'to',
      value: '0x1e75eb18cb551cb256181866f9a027aa2126f4ac',
      type: 'address'
    },
    { name: 'deadline', value: '1632965849', type: 'uint256' }
  ]
}
```

### Add Liquidity
```js
{
  name: 'addLiquidity',
  params: [
    {
      name: 'tokenA',
      value: '0x97641c20355571820f591839d972ad2d38ad9f00',
      type: 'address'
    },
    {
      name: 'tokenB',
      value: '0xe9e7cea3dedca5984780bafc599bd69add087d56',
      type: 'address'
    },
    {
      name: 'amountADesired',
      value: '3988969714144387799899',
      type: 'uint256'
    },
    {
      name: 'amountBDesired',
      value: '1313420514796066633164',
      type: 'uint256'
    },
    {
      name: 'amountAMin',
      value: '3957057956431232697499',
      type: 'uint256'
    },
    {
      name: 'amountBMin',
      value: '1302913150677698100098',
      type: 'uint256'
    },
    {
      name: 'to',
      value: '0x09e44cdfdd15f3b3ab15bf1768e9faa9759ccb59',
      type: 'address'
    },
    { name: 'deadline', value: '1632965890', type: 'uint256' }
  ]
}
```

## Risks
- This is a demo