import axiosInstance from '@/utils/axiosUtils'

// 城市搜索
export function getCityInfo (params) {
    return axiosInstance({
        baseURL: 'https://geoapi.qweather.com',
        url: '/v2/city/lookup',
        params,
        method: 'get'
    })
}

// 实时天气预报，免费可用
export function getWeatherInfo (params) {
    return axiosInstance({
        url: '/v7/weather/now',
        // url: '/v7/grid-weather/now',
        params,
        method: 'get'
    })
}

// 实时空气质量
export function getAirInfo (params) {
    return axiosInstance({
        url: '/v7/air/now',
        params,
        method: 'get'
    })
}

// 太阳辐射（紫外线），免费的403
export function getUltravioletInfo (params) {
    return axiosInstance({
        url: '/v7/solar-radiation/24h',
        params,
        method: 'get'
    })
}

// 多天预报
export function getForecastInfo (params) {
    return axiosInstance({
        url: '/v7/weather/7d',
        params,
        method: 'get'
    })
}

// 昨日天气预报，免费的403
export function getPreForecastInfo (params) {
    return axiosInstance({
        url: '/v7/historical/weather',
        params,
        method: 'get'
    })
}