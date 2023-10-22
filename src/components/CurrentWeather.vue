<template>
  <div class="w-full font-semibold text-md flex-wrap text-white">
    <div
      class="
        flex 
        flex-col 
        py-3
        px-10
        rounded-2xl 
        relative
        h-full
        max-md:bg-gradient-to-r from-[#67E1D2] to-[#54A8FF] 
        max-md:shadow-[0_10px_30px_-12px_rgba(7,89,133,0.45)]
      "
    >
      <!-- pc端的地区和时间 -->
      <div class="flex flex-col max-md:hidden flex-1">
        <div class="flex">
          <div class="mr-10 flex items-center gap-2">
            <span>{{ `${city.adm2} ${city.name}` }}</span>
            <button @click="searchForPC"><img class="h-3 w-auto transform" :class="`${search ? 'rotate-90' : '-rotate-90'}`" src="@/assets/change.png" alt=""></button>
          </div>
          <div>{{ `${dayOfWeek} ${formattedDate}` }}</div>
        </div>
        <div class="text-[#333333]">
          <slot name="search"></slot>
        </div>
      </div>
      <!-- pc端及移动端的天气图标及温度 -->
      <div class="
        flex
        flex-1
        max-md:justify-between
        relative
      ">
        <div class="max-md:relative opacity-90">
          <QWeatherIcon class="max-md:absolute max-md:top-[-35px]" :icon="weather.icon" :size="100" :fill="true" />
        </div>
        <div class="flex flex-col md:ml-10 ">
          <span class="text-7xl bg-clip-text text-transparent bg-gradient-to-br from-white from-40% ...">{{ `${weather.temp}&#176` }}</span>
          <span class="max-md:hidden">{{ weather.text }}</span>
        </div>
      </div>
      <!-- 移动端的地区、状态、温度 -->
      <div class="md:hidden flex flex-col mt-3">
        <div class="mr-10 flex items-center gap-2">
          <span>{{ `${city.adm2} ${city.name}` }}</span>
          <button @click="searchForMobile"><img class="h-3 w-auto" src="@/assets/change.png" alt=""></button>
        </div>
        <span>{{ weather.text }}</span>
        <span>{{ `${dayOfWeek} ${formattedDate}` }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import QWeatherIcon from './QWeatherIcon.vue';
import { translateTime } from '@/utils/utilsFunc.js'
import { defineEmits } from 'vue'

const props = defineProps({
    weather: { type: Object },
    city: { type: Object },
    search: { type: Boolean }
})

const emit = defineEmits(['searchShow'])

const searchForPC = () => {
  emit('searchShow', !props.search)
}

const searchForMobile = () => {
  emit('searchShow', true)
}

const { dayOfWeek, formattedDate } = translateTime(props.weather.obsTime)
</script>

<style scoped>
</style>
