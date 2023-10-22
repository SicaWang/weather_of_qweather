<template>
  <div class="w-full text-[#333333] font-semibold text-md flex-wrap">
    <div
      class="
        flex 
        flex-col 
        p-4 
        rounded-2xl 
        relative 
        bg-[#FFFFFF] 
        shadow-[0_10px_30px_-12px_rgba(7,89,133,0.45)] 
        h-full
      "
    >
      <div class="flex justify-between">
        <span>空气质量</span>
        <button @click="refresh"><img class="w-6 h-6" src="@/assets/refresh.png" alt="refresh"></button>
      </div>
      <div class="grid grid-cols-3 gap-4 h-full mt-6">
        <template v-for="(item, index) in dispalyInfo" :key="index">
          <div v-if="item.data" class="flex flex-col text-center items-center gap-2">
            <img :src="item.icon" :alt="item.name" v-if="item.icon" class="w-6 h-6">
            <span>{{ item.name }}</span>
            <span>{{ item.data }}{{ item.unit }}</span>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
    weather: { type: Object },
    air: { type: Object },
    city: { type: Object },
    ultraviolet: { type: Array, default: [] }
})

const emits = defineEmits(['refresh'])
const refresh = () => {
  emits('refresh', props.city, false)
}

// 获取紫外线（太阳直射辐射）
const curUltraviolet = computed(()=>{
  const curHour = (new Date).getHours()
  return props.ultraviolet.find(item=>{
    const hour = (new Date(item.fxTime)).getUTCHours()
    return hour === curHour
  })?.direct
})

const dispalyInfo = [
  {
    name: '风速',
    icon: '../src/assets/wind.png',
    data: props.weather.windSpeed,
    unit: 'km/h'
  },
  {
    name: '二氧化硫',
    icon: '../src/assets/drop.png',
    data: props.air.so2
  },
  {
    name: '降水量',
    icon: '../src/assets/cloudrain.png',
    data: props.weather.precip,
    unit: 'mm'
  },
  {
    name: '紫外线',
    icon: '../src/assets/sunhorizon.png',
    data: curUltraviolet.value
  },
  {
    name: '体感温度',
    icon: '../src/assets/thermometer.png',
    data: props.weather.feelsLike
  },
  {
    name: '臭氧',
    icon: '../src/assets/sunhorizon.png',
    data: props.air.o3
  }
]
</script>

<style scoped></style>
