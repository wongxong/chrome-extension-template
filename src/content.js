import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./icons";
import {
  Form,
  FormItem,
  Input,
  Button,
  Loading,
  Link,
  Checkbox,
  InputNumber,
  Message
} from 'element-ui';

[
  Form, FormItem,
  Input, Button,
  Loading, Link,
  Checkbox,
  InputNumber
].forEach(item => {
  Vue.use(item);
});

Vue.prototype.$ELEMENT = { size: 'small', zIndex: 9000 };
Vue.prototype.$message = Message;

Vue.config.productionTip = false;

if (process.env.NODE_ENV === "production") {
  loadStyle(chrome.extension.getURL("css/app.css"));
}

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount(initRootContainer());

function initRootContainer() {
  let el = document.querySelector(globalConfig.domId);

  if (!el) {
    el = document.createElement('div');
    el.id = globalConfig.domId;
    document.body.appendChild(el);
  }

  return el;
}

function loadStyle(href) {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.charset = "UTF-8";
  link.href = href;
  document.body.appendChild(link);
}
