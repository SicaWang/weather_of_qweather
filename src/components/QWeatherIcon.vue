<template>
    <SvgIcon :name="`${ icon }${ fill ? '-fill' : '' }`" :size="size"/>
</template>

<script setup>
defineProps({
    icon: { type: String },
    size: { type: Number },
    fill: { type: Boolean, default: false }
})
</script>

<style scoped>
</style>
