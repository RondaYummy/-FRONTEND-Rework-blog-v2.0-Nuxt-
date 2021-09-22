export const mutations = {
  add(state, user) {
    const stat = state;
    stat.user = user
  },
}

export const state = () => ({
  user: {},
})
