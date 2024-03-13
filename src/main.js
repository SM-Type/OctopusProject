import './assets/main.scss'

import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import AxisNavContent from './components/AxisNavContent.vue' // Opentype Global ??

// createApp(App).mount('#app')
const app = createApp(App)
app.component('axis-nav-content', AxisNavContent) // Opentype Global ??
// app.mount('#app');
// use vuex in app
app.use(store)

const request = indexedDB.open('myDatabase', 1)

request.onupgradeneeded = function (event) {
  const db = event.target.result
  db.createObjectStore('myStore', { keyPath: 'id' })
}

request.onsuccess = function (event) {
  const db = event.target.result
  store.commit('setDatabase', db)
  app.mount('#app')
}
