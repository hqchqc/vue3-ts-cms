<template>
  <el-form label-width="60px" ref="formRef">
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
import type { ElForm } from 'element-plus'
import { reactive, defineExpose, ref } from 'vue'
import { useStore } from 'vuex'

const formRef = ref<InstanceType<typeof ElForm>>()
const store = useStore()
const phone = reactive({
  number: '',
  code: ''
})

const getCode = () => {
  console.log('验证码')
}

const loginAction = () => {
  // 开始进行登录验证
  store.dispatch('login/phoneLoginAction', { ...phone })
}

defineExpose({
  loginAction
})
</script>

<style scoped>
.get-code {
  display: flex;
}

.get-btn {
  margin-left: 8px;
}
</style>
