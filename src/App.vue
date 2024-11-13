<template>
  <div class="max-md:min-h-screen flex flex-col md:max-w-5xl mx-auto font-albert">
    <header class="md:hidden">
      <SearchLocation :show="searchShow" @searchShow="changeSearchShow" @search="locationBySearch"/>
    </header>
    <main class="flex flex-grow md:justify-center w-full md:bg-[#2F9FF8] md:p-4 md:rounded-2xl max-md:mt-10 sm: px-4">
      <div class="flex flex-col w-full gap-4" v-if="infoIsNull">
        <div class="flex flex-col md:flex-row gap-4 w-full">
          <CurrentWeather
            class="md:basis-3/5"
            :weather="weather"
            :city="city"
            :search="searchShow"
            @searchShow="changeSearchShow"
          >
            <template v-slot:search>
              <div class="text-[#333333]">
                <SearchLocation :show="searchShow" @searchShow="changeSearchShow" @search="locationBySearch"/>
              </div>
            </template>
          </CurrentWeather>
          <AirQuality
            class="md:basis-2/5"
            :weather="weather"
            :air="air"
            :city="city"
            :ultraviolet="ultraviolet"
            @refresh="weatherInfo"
          />
        </div>
        <div class="w-full md:mt-0">
          <Forecast
            :forecast="forecast"
            :preDayWeather="preDayWeather"
          />
        </div>
      </div>
      <!-- loading... -->
      <div class="text-center m-auto" v-else>
        <div role="status" >
          <svg class="inline mr-2 w-20 h-20 text-[rgba(251,252,251,.8)] animate-spin fill-sky-800" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import {
  getAirInfo,
  getCityInfo,
  getForecastInfo,
  getPreForecastInfo,
  getUltravioletInfo,
  getWeatherInfo
} from '@/api/weather.js';
import AirQuality from '@/components/AirQuality.vue';
import CurrentWeather from '@/components/CurrentWeather.vue';
import Forecast from '@/components/Forecast.vue';
import SearchLocation from '@/components/SearchLocation.vue';
import { getPreFormattedDate } from '@/utils/utilsFunc.js';
import { computed, onBeforeMount, ref } from 'vue';

const stateNavigator = ref(0) // 用于判断是否加载loading
const cityList = ref([])
const city = ref({})
const weather = ref({})
const air = ref({})
const forecast = ref([])
const preDayWeather = ref([])
const ultraviolet = ref([])
const searchShow = ref(false)

const infoIsNull = computed(()=>{
  const cityKey = Object.keys(city.value).length
  const weatherKey = Object.keys(weather.value).length
  const airKey = Object.keys(air.value).length
  return cityKey && weatherKey && airKey && forecast.value.length
})

// 获取城市信息
const weatherLocation = async (query) => {
  // 获取城市信息
  const cityRes = await getCityInfo({ location: query });

  // 检查 cityRes 和 cityRes.location 是否有效
  if (!cityRes || !cityRes.location || cityRes.location.length === 0) {
    window.alert("Could not get city information");
    return;
  }

  city.value = cityRes.location[0];
  // 搜索可能会有多个结果，先存一下，后面用
  cityList.value = cityRes.location;
  weatherInfo(city.value);
}


const weatherInfo = (cityInfo, isRequestForecast = true) => {
  const { lon, lat } = cityInfo;
  const location = `${lon},${lat}`;

  // 获取实时天气预报
  getWeatherInfo({ location }).then(res => {
    weather.value = res?.now ?? {}; // 使用可选链和空值合并，确保返回空对象而不是 undefined
  });

  // 获取实时空气质量
  getAirInfo({ location }).then(res => {
    air.value = res?.now ?? {}; // 同样处理
  });

  // 获取10天天气预报
  isRequestForecast && getForecastInfo({ location }).then(res => {
    res.daily?.[0] && (res.daily[0].isToday = true);
    const temparr = res?.daily ?? []; // 如果 daily 不存在，则使用空数组

    // 获取昨日天气预报
    getPreForecastInfo({ location: cityInfo.id, date: getPreFormattedDate() }).then(res => {
      res?.weatherDaily && temparr.unshift({ ...res.weatherDaily, isPreDay: true });
      forecast.value = temparr;
      preDayWeather.value = res?.weatherHourly ?? []; // 如果 weatherHourly 不存在，则使用空数组
    });
  });

  // 获取太阳辐射（紫外线）
  getUltravioletInfo({ location }).then(res => {
    ultraviolet.value = res?.radiation ?? []; // 如果 radiation 不存在，则使用空数组
  });
};

// 通过经纬度查询天气预报信息（不传参就是当前位置查询）
async function getLocation(query) {
  if (query) {
    weatherLocation(query)
  } else {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(pos => {
        const {latitude, longitude} = pos.coords
        weatherLocation(`${longitude},${latitude}`)
      },
      err => {
        stateNavigator.value = err.code // code 1 User denied Geolocation
      })
    } else  {
      window.alert("Could not get location")
    }
  }
}

const changeSearchShow = (data) => {
  searchShow.value = data
}

function locationBySearch(query) {
  if(query){
    getLocation(query)
  } else {
    city.value = {}
    getLocation()
  }
}

onBeforeMount(()=>{
  getLocation('郑州市')
})
</script>

<style scoped></style>
