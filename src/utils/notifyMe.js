import icon from '../../public/images/logo128.png';

export default function notifyMe(message) {
  if(!message) return;
  
  const title = '插件提示';
  const option = {
    body: message,
    silent: true,
    icon
  };
  
  // Let's check if the browser supports notifications
  if(!("Notification" in window)) {
    alert(message);
  }

  // Let's check whether notification permissions have already been granted
  else if(Notification.permission === "granted") {
    // If it's okay let's create a notification
    var notification = new Notification(title, option);
  }

  // Otherwise, we need to ask the user for permission
  else if(Notification.permission !== "denied") {
    Notification.requestPermission().then(function (permission) {
      // If the user accepts, let's create a notification
      if(permission === "granted") {
        var notification = new Notification(title, option);
      }
    });
  }

  // At last, if the user has denied notifications, and you 
  // want to be respectful there is no need to bother them any more.
  else {
    alert(message);
  }
}