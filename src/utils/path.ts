import { getWBNBAddress } from './addressHelpers'

const getPath = (token: string): string[] => {
  return [getWBNBAddress(), token]
}

export default getPath