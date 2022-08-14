<template>
  <div class="nav-header">
    <template v-if="isFold">
      <i-ep-Fold @click="handleFoldClick" />
    </template>
    <template v-else>
      <i-ep-Expand @click="handleFoldClick" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isFold = ref(false)
const handleFoldClick = () => {
  isFold.value = !isFold.value
}
</script>

<style scoped lang="ts"></style>
