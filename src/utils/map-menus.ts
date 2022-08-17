import type { RouteRecordRaw } from 'vue-router'

export function mapMenuToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1. 先去加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  const routeFiles = require.context('../router/main', true, /\.ts/)

  routeFiles.keys().forEach(async (key) => {
    const route = routeFiles(key)
    allRoutes.push(route.default)
  })

  // 2. 根据菜单获取需要添加的routes

  const _recurseGetRoutes = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.type === 2) {
        const route = allRoutes.find((item) => item.path === menu.url)
        if (route) {
          routes.push(route)
        }
      } else {
        _recurseGetRoutes(menu.children)
      }
    }
  }

  _recurseGetRoutes(userMenus)

  return routes
}
