export function routine(fn: Function, msec: number): NodeJS.Timeout {
  let working = true;
  fn().then(() => (working = false));

  const intervalId = setInterval(async () => {
    if (!working) {
      working = true;
      await fn();
      working = false;
    }
  }, msec);

  return intervalId;
}
