<template>
  <el-form label-width="60px">
    <el-form-item label="手机号" prop="phone">
      <el-input v-model="phone.number" />
    </el-form-item>
    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input v-model="phone.code" />
        <el-button type="primary" @click="getCode" class="get-btn"
          >获取验证码</el-button
        >
      </div>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const phone = reactive({
  number: '',
  code: ''
})

const getCode = () => {
  console.log('验证码')
}
</script>

<style scoped>
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
