import { WBNB } from '../constants/constants'

const getPath = (token: string): string[] => {
  return [WBNB, token]
}

export default getPath