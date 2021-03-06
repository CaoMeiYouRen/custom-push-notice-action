import axios, { AxiosResponse, Method } from 'axios'

class AjaxConfig {
    url: string
    query?: Record<string, unknown>
    data?: Record<string, unknown>
    method?: Method = 'GET'
    headers?: Record<string, unknown>
}

/**
 * axios 接口封装
 *
 * @author CaoMeiYouRen
 * @export
 * @param {AjaxConfig} config
 * @returns {Promise<AxiosResponse<any>>}
 */
export async function ajax(config: AjaxConfig): Promise<AxiosResponse<any>> {
    try {
        const { url, query = {}, data = {}, method = 'GET', headers = {} } = config
        const resp = await axios(url, {
            method,
            headers,
            params: query,
            data,
            timeout: 10000,
            baseURL: '',
        })
        return resp
    } catch (error) {
        if (error.toJSON) {
            console.error(error.response || error.toJSON())
            return error.response
        }
        console.error(error)
        throw error
    }
}
