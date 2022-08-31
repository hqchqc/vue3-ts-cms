<template>
  <div class="user-info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar size="small"></el-avatar>
        <span>{{ name }}</span>
      </span>
      <div class="i-ep-arrow-down"></div>
      <span class="i-ep-setting"></span>
      <template #dropdown>
        <el-dropdown-item>退出登录</el-dropdown-item>
        <el-dropdown-item divided>用户信息</el-dropdown-item>
        <el-dropdown-item>系统管理</el-dropdown-item>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { computed } from 'vue'

const store = useStore()
const name = computed(() => store.state.login.userInfo.name)
</script>

<style scoped lang="less">
.example-showcase .el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.el-dropdown-link {
  display: flex;
  align-items: center;
  cursor: pointer;
}
</style>
