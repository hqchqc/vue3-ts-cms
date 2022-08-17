<template>
  <div class="nav-header">
    <template v-if="isFold">
      <i-ep-Fold @click="handleFoldClick" />
    </template>
    <template v-else>
      <i-ep-Expand @click="handleFoldClick" />
    </template>
    <div class="content">
      <div>面包屑</div>
      <div>用户信息</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const emit = defineEmits(['foldChange'])

const isFold = ref(false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
  emit('foldChange', isFold.value)
}
</script>

<style scoped lang="less">
.nav-header {
  width: 100%;
  display: flex;

  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
