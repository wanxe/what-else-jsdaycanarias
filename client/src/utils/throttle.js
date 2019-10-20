// https://gist.github.com/beaucharman/e46b8e4d03ef30480d7f4db5a78498ca
export function throttle (callback, wait, immediate = false) {
  let timeout = null;
  let initialCall = true;

  return function () {
    const callNow = immediate && initialCall;
    const next = () => {
      callback.apply(this, arguments);
      timeout = null;
    };

    if (callNow) {
      initialCall = false;
      next();
    }

    if (!timeout) {
      timeout = setTimeout(next, wait);
    }
  };
};

/**
 * Normal event
 * event      | |      |
 * time     ----------------
 * callback   | |      |
 *
 * Call search at most once per 300ms while keydown
 * keydown     | |     |  |
 * time     -----------------
 * search          |       |
 *             |300|   |300|
 */
