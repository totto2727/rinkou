import axios from 'axios'

import { ENDPOINT } from '@/configs/apiGateway'

export type Header = { Authorization: string }
export const apiGateway = axios.create({ baseURL: ENDPOINT })
