<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="logo" />
      <span v-if="!collapse" class="title">Vue3+Ts</span>
    </div>
    <el-menu
      default-active="1"
      class="el-menu-vertical"
      :collapse="collapse"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
    >
      <template v-for="item in userMenums" :key="item.id">
        <template v-if="item.type === 1">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <div :class="handleCalcIcon(item.icon)" />
              <!-- 按需加载有时候不生效 -->
              <!-- <div class="i-ep-monitor"></div>
              <div class="i-ep-setting"></div>
              <div class="i-ep-goods"></div>
              <div class="i-ep-chat-line-round"></div> -->
              <span class="iconFont">{{ item.name }}</span>
            </template>
            <template v-for="subItem in item.children" :key="subItem.id">
              <el-menu-item
                :index="subItem.id + ''"
                @click="handleMenuItemClick(subItem)"
              >
                <div :class="handleCalcIcon(subItem.icon)" />
                <span>{{ subItem.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>

        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { useStore } from '@/store'
import { computed, defineProps } from 'vue'
import { useRouter } from 'vue-router'

defineProps({
  collapse: {
    type: Boolean,
    default: false
  }
})

const store = useStore()
const userMenums = computed(() => store.state.login.userMenus)
const router = useRouter()

const handleCalcIcon = (iconName: string) => {
  if (!iconName) return ''
  const [, , ...rest] = iconName?.split('-')
  const prefix = 'i-ep-'
  return prefix + rest.join('-')
}

const handleMenuItemClick = (item: any) => {
  console.log('item', item)
  router.push({
    path: item?.url ?? '/not-found'
  })
}
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }
    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  .iconFont {
    margin-left: 5px;
  }

  .el-submenu {
    background-color: #001529 !important;
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep(.el-submenu__title) {
    background-color: #001529 !important;
  }

  .el-menu-item:hover {
    color: #fff !important;
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100%-48px);
}
</style>
