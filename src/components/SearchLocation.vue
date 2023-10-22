<template>
    <!-- 桌面端搜索栏 -->
    <div v-if="show" class="w-full my-4 md:block hidden">
      <div class="flex items-center rounded-full p-2 bg-white">
        <img class="h-6 w-auto mr-2" src="@/assets/search.png" alt=""  @click="searchForPC">
        <input
          v-model="inputValue"
          type="text"
          class="flex-1 focus:outline-none"
          placeholder="Search..."
          @click="()=>{}"
          @keydown.enter="searchForPC"
        />
        <img class="h-6 w-auto ml-2" src="@/assets/reset.png" alt=""  @click="clearInput">
      </div>
    </div>

    <!-- 移动端全屏搜索栏，仅在移动端显示 -->
    <div v-if="show" class="md:hidden w-screen h-screen bg-[#F5F6F9] z-50 p-4" @click="searchClose">
      <div class="flex items-center bg-white rounded-full p-2" @click="()=>{return false}">
        <img class="h-6 w-auto mr-2" src="@/assets/search.png" alt="" @click.stop="searchForMobile">
        <input
          v-model="inputValue"
          type="text"
          class="flex-1 focus:outline-none"
          placeholder="Search..."
          @click.stop="()=>{}"
          @keydown.enter="searchForMobile"
        />
        <img class="h-6 w-auto ml-2" src="@/assets/reset.png" alt=""  @click.stop="clearInput">
      </div>
    </div>
</template>

<script setup>
import { defineEmits, ref } from 'vue'

const emit = defineEmits(['searchShow', 'search'])
const searchClose = () => {
  emit('searchShow', false)
}

const props = defineProps({
  show: { type: Boolean, default: true }
})

const inputValue = ref('')

const clearInput = () => {
  inputValue.value = ''
}

const searchForPC = () => {
  emit('search', inputValue.value.trim())
  inputValue.value = ''
}

const searchForMobile = () => {
  emit('search', inputValue.value.trim())
  emit('searchShow', false)
  inputValue.value = ''
}
</script>
