
export function on(el, event, fn) {
  el.addEventListener(event, fn, false);
}

export function off(el, event, fn) {
  el.removeEventListener(event, fn, false);
}

export function one(el, event, fn) {
  var listener = function() {
    off(el, event, fn);
    off(el, event, listener);
  };
  on(el, event, fn);
  on(el, event, listener);
}

export function triggerEvent(el, type) {
	let eventName;
	if(type.match(/mouse|click/)) {
		eventName = 'MouseEvents';
	} else if(type.match(/input|key/)) {
		eventName = 'KeyboardEvent';
	} else {
		eventName = 'HTMLEvents';
	}
	const evt = document.createEvent(eventName);
	evt.initEvent(type, true, true);
	el.dispatchEvent ? el.dispatchEvent(evt) : el.fireEvent('on' + type, evt);
	return evt;
}