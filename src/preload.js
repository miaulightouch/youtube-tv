// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

const hideCursor = () => {
  document.body.style.cursor = 'none';
};

let timer = 0;
const showCursor = () => {
  window.clearTimeout(timer);
  document.body.style.cursor = 'initial';
  timer = window.setTimeout(hideCursor, 1000);
};

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('mousemove', showCursor);
  showCursor();
});
