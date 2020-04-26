import router from '@/router'
export default {
  logOut: ({ commit }) => {
    // revoke token
    router.push({ name: 'login' }).then(result => {
      commit('clear')
    })
  },
  authentication: async ({ commit, dispatch }, payload) => {
    // get some api
    // mocking api wait response
    commit('setUser', payload)
    commit('setCompanyId', 'gdrnVHaLWM0maicdnoV4')
    await dispatch('connectDb')
    router.push({ name: 'tables-list' })
  },
  connectDb: async ({ commit, dispatch, getters }) => {
    if (getters.companyId) {
      commit('app/toggleLoading', null, { root: true })
      await dispatch('table/getTables', null, { root: true })
      await dispatch('menu/getMenu', null, { root: true })
      // refactor
      await dispatch('orders/getOrders', null, { root: true })
      await dispatch('waiter/getWaiter', null, { root: true })
      commit('app/toggleLoading', null, { root: true })
    }
  }
}
