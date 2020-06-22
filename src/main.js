import Vue from "vue";
import App from "./App.vue";
import http from "./plugins/http";


import "roboto-fontface/css/roboto/roboto-fontface.css";
import "font-awesome/css/font-awesome.css";
import "@mdi/font/css/materialdesignicons.css";

Vue.prototype.$http = http;

new Vue({
  http,
  render: h => h(App)
}).$mount("#app");
