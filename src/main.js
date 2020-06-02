import 'bootstrap/dist/css/bootstrap.min.css';

import Vue from 'vue'
import App from './App.vue'
import QuantumVue from "@/QuantumVue/QuantumVue";
import _ from 'lodash';

window._ = _;

Vue.config.productionTip = false;

Vue.use(QuantumVue());

new Vue({
    render: h => h(App),
}).$mount('#app');
