import { ethers } from 'ethers';

export function routine(fn: Function, msec: number): NodeJS.Timeout {
  let working = true;
  const result = fn();
  if (result instanceof Promise) {
    result.then(() => (working = false));
  } else {
    working = false;
  }

  const intervalId = setInterval(async () => {
    if (!working) {
      working = true;
      await fn();
      working = false;
    }
  }, msec);

  return intervalId;
}

export function isValidAmountInput(input: string): boolean {
  try {
    ethers.utils.parseEther(input);
    return true;
  } catch {
    return false;
  }
}
