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
$ npm run start
```

Or (Run in the background)

```
$ npm run pm2
```

## Flow
![Flow-sniper-bot](https://user-images.githubusercontent.com/33257682/135856184-a4ee9f73-d765-47c7-9503-4572da3a71b4.png)

## Example

> ⚠️ The example is done on the testnet. But in reality, it's more complicated when you have compete with many other bots. This results in your transaction will be delay about **~1 block**

> 🐰 Try Pancakeswap Testnet: https://pancakeswap-test.vercel.app/

```bash
[17:41:54.849 PM] [info] Connected
[17:41:54.853 PM] [info] - Network: 97
[17:41:54.853 PM] [info] - Buyer: 0x8b9A97Eb383d0be96f4c071755AA8bd31eF3eF50
[17:41:54.853 PM] [info] - Target Token: 0x7a6fdBA9A52c2FB5AA951BEf62a5Bd13A06A11c7 - CAKEB5
[17:41:54.853 PM] [info] - Liquidity in BNB: false
[17:41:54.853 PM] [info] - LP Pair (CAKEB5-BUSD): 0x0000000000000000000000000000000000000000
[17:41:54.853 PM] [info] - Purchase Amount: 60 BUSD
[17:49:35.964 PM] [info] - 🚀 Target Token was added: https://testnet.bscscan.com/tx/0x1c7335e1a9998521a830b9364919b02e7cce3994825631d82ac60b465120a65c
[17:49:41.597 PM] [info] - 🥳 Buy success: https://testnet.bscscan.com/tx/0x891fc1b0eebbd21b91400bab69c8b0be8716f65dad8cfe94af2874df7a849fad
```

### Add Liquidity
```js
{
  name: 'addLiquidity',
  params: [
    {
      name: 'tokenA',
      value: '0x7a6fdba9a52c2fb5aa951bef62a5bd13a06a11c7',
      type: 'address'
    },
    {
      name: 'tokenB',
      value: '0x2becd5bea6b1f32cf291c602383ad689f46742aa',
      type: 'address'
    },
    {
      name: 'amountADesired',
      value: '100000000000000000000',
      type: 'uint256'
    },
    {
      name: 'amountBDesired',
      value: '100000000000000000000',
      type: 'uint256'
    },
    {
      name: 'amountAMin',
      value: '100000000000000000000',
      type: 'uint256'
    },
    {
      name: 'amountBMin',
      value: '100000000000000000000',
      type: 'uint256'
    },
    {
      name: 'to',
      value: '0x930a6ac63a0ddc209f2f99d526965f2866e82da1',
      type: 'address'
    },
    { name: 'deadline', value: '1633432169', type: 'uint256' }
  ]
}
```

## ⛔️ Risks
- This is a demo