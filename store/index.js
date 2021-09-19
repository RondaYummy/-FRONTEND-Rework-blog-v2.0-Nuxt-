export const actions = {
  async nuxtServerInit({
    commit,
  }, {
    req,
    app
  }) {
    // console.log('cookies', req.session);
    // TODO тоже для токенів не доробив нічо
    // if (req.session) {
    //   commit('user/add', req.session)
    // }

  }
}
