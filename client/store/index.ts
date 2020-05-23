import firebase from '~/plugins/firebase'

export const strict = false

export const state = () => ({
  user: null,
  version: '0.1.0'
})

export const mutations = {
  setUser(state: any, user: any) {
    state.user = user
  }
}

export const actions = {
  setUser({ commit }: any, user: any) {
    commit('setUser', user)
  },
  login({ commit }: any, { email, password }: any) {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((res) => resolve(res.user))
        .catch((err) => reject(err))
    })
  },
  logout({ commit }: any) {
    return new Promise((resolve) => {
      firebase
        .auth()
        .signOut()
        .then(() => {
          commit('setUser', null)
          resolve()
        })
    })
  }
}

export const getters = {
  isLoggedIn(state: any) {
    return !!state.user
  }
}
