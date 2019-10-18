import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import '@mdi/font/css/materialdesignicons.css'


Vue.use(Vuetify, {
  theme: {
    primary: '#0d447f',
    secondary: '#55524e',
    accent: '#8acaf8',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  },
  options: {
    customProperties: true
  },
  iconfont: 'mdi',
})



// $dark blue: #0d447f; - tz primary
// $neitral blue: #8acaf8;- tz accent
// $light blue: #e5f3fd; - tz
// $dark grey: #55524e; grey darken-2 - tz secondary
// $neitral grey: #e2e2e2; grey lighten-2 - made by me
// $light grey: #f4f4f4; grey lighten-4 - tz
// $border: #eee