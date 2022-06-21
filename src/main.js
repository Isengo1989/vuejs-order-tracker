import Vue from 'vue'
import App from './App.vue'
import router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'

import * as firebase from "firebase";
import "firebase/database";

let config = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    databaseURL: "YOUR_DATABASE_URL",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_BUCKET",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

firebase.initializeApp(config);

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App),
}).$mount('#app');

Vue.use(VueGoogleMaps, {
    load: {
        key: 'YOUR_GOOGLE_MAPS_JS_API_KEY',
        libraries: 'places',

    }
})
