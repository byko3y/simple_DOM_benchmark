const rsltReady = Promise.resolve().then(() => {
  timeIt(func_js);
  timeIt(byko3y_js);
  return rslt;
});

let performance;
if (typeof window === 'undefined') {
  const perf_hooks = require('perf_hooks');
  performance = perf_hooks.performance;
} else {
  performance = window.performance;
  window.rsltReady = rsltReady;
}

let obj = {a: 10};
 
const hasF = function(object, key) {
    return Object.prototype.hasOwnProperty.call(object, key);
}

function func_js() {
  for (let i = 0; i < 10 ** 8; i++) {
      hasF(obj, 'a');
      hasF(obj, 'b');
  }
}

function byko3y_js() {
  for (let i = 0; i < 10 ** 8; i++) {
    ({}).hasOwnProperty.call(obj, 'a');
    ({}).hasOwnProperty.call(obj, 'b');
  }
}

let rslt = [];

function timeIt(func) {
  let startTime = performance.now();
  func()
  let endTime = performance.now();
  const msg = `Call to ${func.name} took ${endTime - startTime} milliseconds`
  console.log(msg);
  rslt.push(msg);
}
