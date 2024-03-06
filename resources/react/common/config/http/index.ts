import axios from 'axios'

import { BASE_URL, APIv1 } from '../constant'

const Api = axios.create({
    baseURL: `${BASE_URL}/${APIv1}/`
})

export default Api;
