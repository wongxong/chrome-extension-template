import qs from 'qs';
import axios from 'axios';
import { isUndef, getValueByPath } from "@/utils/util";
import { version } from '../../public/manifest.json';
import {
  getItem,
  setItem,
  removeItem
} from '@/utils/storage';

const HTTP_CODE_MAP = {
  "400": "请求错误",
  "401": "未授权，请登录",
  "403": "拒绝访问",
  "404": "请求地址出错",
  "408": "请求超时",
  "500": "服务器内部错误",
  "501": "服务未实现",
  "502": "网关错误",
  "503": "服务不可用",
  "504": "网关超时",
  "505": "HTTP版本不受支持"
};
const APP_CODE = {
  "ERROR": {},
  "SUCCESS": {
    "200": 1
  }
};

export const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 30 * 1000
});

service.interceptors.request.use(
  config => {
    const method = config.method.toUpperCase();

    if(method === 'GET') {
      config.params = qs.stringify(
        Object.assign(
          { version }, 
          config.params || {}
        )
      );
    } else {
      config.data = qs.stringify(
        Object.assign(
          { version }, 
          config.data || {}
        )
      );
    }

    return config;
  },
  errorHandler
);

service.interceptors.response.use(
  response => {
    console.log(response);
    const { data } = response;
    const { type } = data;

    if (isUndef(type)) {
      return data;
    }

    if(type === 'success') {
      return data.data;
    }

    return Promise.reject(data);
  },
  errorHandler
);

function errorHandler(error) {
  const status = getValueByPath(error, 'error.response');

  let message;

  if (status && (message = HTTP_CODE_MAP[status])) {
    error.message = message;

    if (status === '404') {
      error.message += `: ${error.response.config.baseURL + error.response.config.url}`;
    }
  }

  return Promise.reject(error);
}

export function get(url, params) {
  return service({
    method: 'get',
    url,
    params
  });
}

export function post(url, data) {
  return service({
    method: 'post',
    url,
    data
  });
}

export const request = service;

// export const request = (options = {}) => {
//   return new Promise((resolve, reject) => {
//     let prefix = globalConfig.baseURL[process.env.NODE_ENV];
    
//     options.url = prefix + options.url;
//     options.method = options.method || 'GET';
//     options.dataType = 'json';
//     options.timeout = 1000 * 15;

//     if(options.method.toUpperCase() === 'POST') {
//       const fm = new FormData();
//       if(options.data) {
//         Object.keys(options.data).forEach(k => {
//           fm.append(k, JSON.stringify(options.data[k]));
//         });
//       }

//       fm.append('version', version);

//       options.data = fm;
//       options.cache = false;
//       options.contentType = false;
//       options.processData = false;
//     } else {
//       options.data = $.extend({ version }, options.data);
//     }

//     jQuery.ajax(options)
//     .done(res => {
//       if(res && res.type === 'success') {
//         resolve(res);
//       } else {
//         reject(res ? res : { 
//           type: 'error', 
//           message: 'no content' 
//         });
//       }
//     })
//     .fail(err => {
//       err.type = err.type || 'error';
//       reject(err);
//     });
//   });
// };

export function signin(data) {
  return post('/query_login', data);
}

export function createTask(tabId, data) {
  setItem(tabId + '_tasks', data);
  setItem(tabId + '_currentTaskIndex', null);
  setItem(tabId + '_status', true);
  return Promise.resolve({
    type: 'success',
    message: '创建任务成功'
  });
}

export function emptyTasks(tabId) {
  setItem(tabId + '_tasks', []);
  setItem(tabId + '_currentTaskIndex', null);
  setItem(tabId + '_status', false);
  return Promise.resolve({
    type: 'success',
    message: '任务已清除'
  });
}

export function getTask(tabId, data) {
  let tasks = getItem(tabId + '_tasks');
  let currentTaskIndex = getItem(tabId + '_currentTaskIndex');

  if(currentTaskIndex != null) {
    currentTaskIndex += 1;
  } else {
    currentTaskIndex = 0;
  }

  let currentTask = tasks.length ? tasks[currentTaskIndex] : null;

  setItem(tabId + '_currentTaskIndex', currentTaskIndex);

  return Promise.resolve({
    type: 'success',
    message: 'success',
    data: {
      url: currentTask
    }
  });
}

export function saveInfo(data) {
  // return request({
  //   method: 'post',
  //   url: '/linkedin_tools/save_data',
  //   data: data
  // });
  let savedData = getItem('savedData') || [];

  savedData = savedData.concat(data);

  setItem('savedData', savedData);

  return Promise.resolve({
    type: 'success',
    message: 'success'
  });
}