export function simulateAsyncCall() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Async call completed after 3 seconds');
    }, 3000);
  });
}
