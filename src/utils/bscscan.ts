import 'dotenv/config'

export const getBscscanUrl = (): string => {
  const chainId = Number(process.env.CHAIN_ID)

  return chainId === 56
    ? 'https://bscscan.com'
    : 'https://testnet.bscscan.com'
}