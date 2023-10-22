<template>
    <div class="z-20">
        <!-- 顶部导航栏，仅在PC端显示 -->
        <nav class="bg-blue-500 p-4 hidden md:block">
            <a href="#" class="text-white mr-4">Home</a>
            <a href="#" class="text-white mr-4">About</a>
            <a href="#" class="text-white mr-4">Services</a>
            <a href="#" class="text-white">Contact</a>
        </nav>

        <!-- 移动端抽屉导航按钮，仅在移动端显示 -->
        <button @click="toggleDrawer" class="md:hidden block text-white">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
        </button>

        <!-- 移动端抽屉导航，仅在移动端显示 -->
        <div  v-if="isDrawerOpen" >
            <div class="md:hidden fixed top-0 left-0 w-64 h-full p-4 bg-blue-500 z-10">
                <a href="#" class="block text-white p-2">Home</a>
                <a href="#" class="block text-white p-2">About</a>
                <a href="#" class="block text-white p-2">Services</a>
                <a href="#" class="block text-white p-2">Contact</a>
            </div>

            <!-- 用于点击空白处关闭抽屉导航的遮罩层 -->
            <div @click="closeDrawer" class="md:hidden fixed top-0 left-0 w-screen h-screen bg-black opacity-25 z-9"></div>
        </div>
        
    </div>
</template>

<script setup>
import { ref } from 'vue'

const isDrawerOpen = ref(false)

const toggleDrawer = () => {
    isDrawerOpen.value = !isDrawerOpen.value
}

const closeDrawer = () => {
    isDrawerOpen.value = false
}
</script>