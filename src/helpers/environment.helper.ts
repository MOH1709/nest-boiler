export function onDevEnvironment(callback: () => unknown) {
  if (process.env.NODE_ENV === 'development') {
    callback();
  }
}
