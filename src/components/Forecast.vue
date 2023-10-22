<template>
  <div class="w-full md:text-white max-md:text-[#333333] font-semibold text-md flex-wrap overflow-x-auto whitespace-no-wrap p-4">
    <!-- 移动端 -->
    <div class="md:hidden">
      <swiper
        :modules="[Autoplay]"
        :slides-per-view="4"
        :space-between="20"
        :pagination="{ clickable: true }"
      >
        <swiper-slide class="pb-10" v-for="item in forecast" :key="item.fxDate || item.date">
          <div class="flex flex-col items-center gap-2 h-full px-2 py-10 max-md:mx-4 max-sm:mx-1" :class="{ 
            'rounded-full bg-gradient-to-b from-[#67E1D2] to-[#54A8FF] text-white shadow-[0_-10px_20px_-20px_rgba(7,89,133,0.45)]': item.isToday 
          }">
            <span>{{ formatDate(item.fxDate || item.date) }}</span>
            <span>{{ translateTime(item.fxDate || item.date).formattedDate }}</span>
            <QWeatherIcon :icon="item.isPreDay ? preDayIcon : item.iconDay" :size="30" :fill="true" />
            <span>{{ `${item.tempMax}&#8451` }}</span>
            <!-- <span>{{ `${item.tempMin}&#8451~${item.tempMax}&#8451` }}</span> -->
          </div>
        </swiper-slide>
      </swiper>
    </div>
    <!-- pc -->
    <div class="max-md:hidden">
      <swiper
        :modules="[Autoplay]"
        :slides-per-view="7"
        :space-between="20"
        :pagination="{ clickable: true }"
      >
        <swiper-slide v-for="item in forecast" :key="item.fxDate || item.date">
          <div class="flex flex-col items-center gap-2 h-full py-10 lg:mx-4 md:mx-3" :class="{
            'rounded-full bg-gradient-to-b from-[#ECFFFD] to-[#DCE4ED] text-[#333333]': item.isToday 
          }">
            <span>{{ formatDate(item.fxDate || item.date) }}</span>
            <span>{{ translateTime(item.fxDate || item.date).formattedDate }}</span>
            <QWeatherIcon :icon="item.isPreDay ? preDayIcon : item.iconDay" :size="30" :fill="true" />
            <span>{{ `${item.tempMax}&#8451` }}</span>
            <!-- <span>{{ `${item.tempMin}&#8451~${item.tempMax}&#8451` }}</span> -->
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import { formatDate, translateTime, findMostFrequentItem } from '@/utils/utilsFunc.js'
import QWeatherIcon from './QWeatherIcon.vue';
import { computed } from 'vue';

const props = defineProps({
  forecast: { type: Object, default: [] },
  preDayWeather: { type: Object, default: [] }
})

const preDayIcon = computed(()=>{
  return findMostFrequentItem(props.preDayWeather.map(item=>{return item.icon}))
})
</script>
