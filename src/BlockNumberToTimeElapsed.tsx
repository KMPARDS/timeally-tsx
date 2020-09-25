import React, { useState, useEffect } from 'react';
import { renderTimestampRemaining } from './utils';

export function BlockNumberToTimeElapsed(props: { blockNumber: number }) {
  const [timestamp, setTimestamp] = useState<number | null>(null);
  useEffect(() => {
    window.provider
      .getBlock(props.blockNumber)
      .then((block) => setTimestamp(block.timestamp))
      .catch(() => {});
  }, []);

  const [, updateState] = React.useState();
  const forceUpdate = React.useCallback(() => updateState({}), []);
  useEffect(() => {
    const intervalId = setInterval(() => {
      forceUpdate();
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);
  return <>{timestamp !== null ? `${renderTimestampRemaining(timestamp)} ago` : 'Loading...'}</>;
}
