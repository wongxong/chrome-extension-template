import {
  getItem,
  setItem,
  removeItem,
  clearAll
} from '@/utils/storage';
import {
  signin,
  createTask,
  emptyTasks,
  getTask,
  saveInfo
} from '@/api/background-api';

const MessageListeners = [];

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  console.log('[Extension Facebook]: get message from content. ', msg);

  MessageListeners.forEach(cb => {
    cb(sender.tab.id, msg, sendResponse);
  });

  return true;
});

/**
 * 接收来自 content 的消息
 */
export function onMessage(cb) {
  cb && MessageListeners.push(cb);
}

/**
 * send message to content
 */
export function sendMessage(tabId, cmd, data) {
  console.log('[Extension Facebook]: send message to content. ', cmd, data);
  chrome.tabs.sendMessage(tabId, { cmd, data });
}

function handleError(sendResponse, err) {
  const errorInfo = {
    type: 'error',
    message: err ? err.message : 'error'
  };
  sendResponse(errorInfo);
}

onMessage(function(tabId, { cmd, data }, sendResponse) {
  if(cmd === 'initApp') {
    // sendMessage(tabId, cmd, {
    //   user: getItem('user'),
    //   status: getItem(tabId + '_status')
    // });
    const currentTaskIndex = getItem(tabId + '_currentTaskIndex') || 0;
    const tasks = getItem(tabId + '_tasks') || [];
    const totalTasks = tasks.length;
    const currentTask = totalTasks > currentTaskIndex ? tasks[currentTaskIndex] : null;

    sendResponse({
      type: 'success',
      data: {
        user: getItem('user'),
        status: getItem(tabId + '_status'),
        totalTasks,
        currentTask,
        currentTaskIndex
      }
    });
  }
});

onMessage(function(tabId, { cmd, data }, sendResponse) {
  if(cmd === 'signin') {
    signin(data)
      .then(res => {
        res.data = {
          user_id: res.user_id,
          user_name: data.user_name
        };
        setItem('user', res.data);
        // sendMessage(tabId, cmd, res);
        sendResponse(res);
      })
      .catch(err => {
        handleError(sendResponse, err);
      });
  }
});

onMessage(function(tabId, { cmd, data }, sendResponse) {
  if(cmd === 'signout') {
    clearAll();
    // sendMessage(tabId, cmd);
    sendResponse({
      type: 'success',
      message: '已退出登录'
    });
  }
});

onMessage(function(tabId, { cmd, data }, sendResponse) {
  if(cmd === 'createTask') {
    createTask(tabId, data).then(sendResponse);
  }
});

onMessage(function(tabId, { cmd, data }, sendResponse) {
  if(cmd === 'emptyTasks') {
    emptyTasks(tabId).then(sendResponse);
  }
});

onMessage(function(tabId, { cmd, data }, sendResponse) {
  if(cmd === 'getTask') {
    getTask(tabId, data).then(sendResponse);
  }
});

onMessage(function(tabId, { cmd, data }, sendResponse) {
  if(cmd === 'saveInfo') {
    saveInfo(data).then(sendResponse);
  }
});

onMessage(function(tabId, { cmd, data }, sendResponse) {
  if(cmd === 'updateStatus') {
    setItem(tabId + '_status', data.status);
    sendResponse({
      type: 'success',
      data
    });
  }
});