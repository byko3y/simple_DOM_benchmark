let performance;
if (typeof window === 'undefined') {
  const perf_hooks = require('perf_hooks');
  performance = perf_hooks.performance;
} else {
  performance = window.performance;
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

function timeIt(func) {
  setTimeout(() => {
    let startTime = performance.now();
    func()
    let endTime = performance.now();
    console.log(`Call to ${func.name} took ${endTime - startTime} milliseconds`);
  }, 1000);
}

timeIt(func_js);
timeIt(byko3y_js);