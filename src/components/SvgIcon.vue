<template>
  <svg aria-hidden="true" :class="customClass" :style="{ width: size, height: size }">
    <use :href="symbolId" :fill="color" />
  </svg>
  
</template>

<script>
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'SvgIcon',
  props: {
    prefix: {
      type: String,
      default: 'icon', // 图标前缀
    },
    name: {
      type: String,
      required: true, // 图标名称
    },
    color: {
      type: String,
      default: '#333', // 图标颜色
    },
    size: {
      type: [String, Number], // 支持 String 和 Number 类型
      default: '1em', // 图标大小，支持 'px', 'em', 'rem' 等
    },
    customClass: {
      type: String,
      default: '', // 额外的自定义类名
    },
  },
  setup(props) {
    // 动态生成 symbolId，用于 `<use>` 标签的 `href`
    const symbolId = computed(() => `#${props.prefix}-${props.name}`);
    return { symbolId };
  },
});
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: middle;
}
</style>
