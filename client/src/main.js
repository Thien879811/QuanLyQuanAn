import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import router from './router';

//Font Awesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faTwitter, faFontAwesome } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(fas, faTwitter, faFontAwesome)
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
//chart
import CanvasJSChart from '@canvasjs/vue-charts';

const vuetify = createVuetify({
    components,
    directives,
  })

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.use(vuetify)
.use(CanvasJSChart)
.mount('#app')

