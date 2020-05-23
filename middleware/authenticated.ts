export default function({ store, route, redirect }: any) {
  if (!store.getters.isLoggedIn && route.name !== 'login') {
    redirect('/login')
  }
  if (store.getters.isLoggedIn && route.name === 'login') {
    redirect('/')
  }
}
