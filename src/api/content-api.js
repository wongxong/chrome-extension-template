
export function request(cmd, data) {
  return new Promise((resolve, reject) => {
    chrome.runtime.sendMessage({
      cmd,
      data
    }, response => {
      console.log(response);
      if(typeof response.type === 'undefined' || response.type === 'success') {
        resolve(response);
      } else {
        reject(response);
      }
    });
  });
}

export function initApp_api() {
  return request('initApp');
}

export function login_api(data) {
  return request('signin', data);
}

export function saveInfo_api(data) {
  return request('saveInfo', data);
}

export function createTask_api(data) {
  return request('createTask', data);
}

export function emptyTasks_api() {
  return request('emptyTasks');
}

export function getTask_api() {
  return request('getTask');
}

export function updateStatus_api(status) {
  return request('updateStatus', { status });
}