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

export const EraswapInfo = {
  baseUrl: 'https://eraswap.info',
  getAddressHref: function (address: string) {
    return `${this.baseUrl}/address/${address}`;
  },
  getTxHref: function (txHash: string) {
    return `${this.baseUrl}/txn/${txHash}`;
  },
};

export function renderSecondsRemaining(numberOfSeconds: number): string {
  const days = Math.floor(numberOfSeconds / 60 / 60 / 24);
  const hours = Math.floor((numberOfSeconds - days * 60 * 60 * 24) / 60 / 60);
  const minutes = Math.floor((numberOfSeconds - days * 60 * 60 * 24 - hours * 60 * 60) / 60);
  const seconds = numberOfSeconds - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60;

  return `${days !== 0 ? `${days} days, ` : ''}${hours !== 0 ? `${hours} hours, ` : ''}${
    minutes !== 0 ? `${minutes} minutes and ` : ''
  }${seconds} seconds`;
}

export function renderTimestampRemaining(unixTimestampSeconds: number): string {
  const currentTimestamp = Math.round(Date.now() / 1000);
  let secondsRemaining = currentTimestamp - unixTimestampSeconds;
  if (secondsRemaining < 0) secondsRemaining = 0;
  return renderSecondsRemaining(secondsRemaining);
}

export function renderEthersJsError(error: any): string {
  return (
    (error?.error?.reason && `Error from Smart Contract ${error?.error?.reason}`) ||
    (error?.error?.message && `Error from Blockchain: ${error?.error?.message}`) ||
    (error?.message && `Error on UI: ${error?.message}`) ||
    `Weird error: ${typeof error === 'object' ? JSON.stringify(error) : error}`
  );
}

export const hexToNum = (hex: string | ethers.BigNumber) =>
  Number(Number(ethers.utils.formatEther(hex)).toFixed(2));

export const lessDecimals = (ethersBigNumber: ethers.BigNumber, decimals = 2) => {
  let lessDecimals = ethers.utils.formatEther(ethersBigNumber).split('.');
  if (lessDecimals[1].length >= decimals) {
    lessDecimals[1] = lessDecimals[1].slice(0, decimals);
  }
  return lessDecimals.join('.');
};
export const sliceDataTo32Bytes = (data: string, index = 0) => {
  return '0x' + data.slice(2 + 64 * index, 2 + 64 * (index + 1));
};

export const getTimeRemaining = (totalSeconds: number) => {
  const days = Math.floor(totalSeconds / 60 / 60 / 24);
  const hours = Math.floor((totalSeconds - days * 60 * 60 * 24) / 60 / 60);
  const minutes = Math.floor((totalSeconds - days * 60 * 60 * 24 - hours * 60 * 60) / 60);
  const seconds = totalSeconds - days * 60 * 60 * 24 - hours * 60 * 60 - minutes * 60;
  return `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
};

export const getOrdinalString = (number: number) => {
  const numberString = String(number);
  const lastChar = numberString.charAt(numberString.length - 1);
  let ordinalString = '';
  switch (lastChar) {
    case '1':
      ordinalString = 'st';
      break;
    case '2':
      ordinalString = 'nd';
      break;
    case '3':
      ordinalString = 'rd';
      break;
    default:
      ordinalString = 'th';
      break;
  }
  return numberString + ordinalString;
};
