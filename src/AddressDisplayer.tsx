import React, { useState, useEffect } from 'react';
import { EraswapInfo } from './utils';

export function AddressDisplayer(props: { address: string; chars?: number }) {
  const [username, setUsername] = useState<string | null>(null);
  useEffect(() => {
    window.provider
      .resolveUsername(props.address)
      .then(setUsername)
      .catch(() => {});
  }, []);
  const addrElement = (
    <span className="hex-string">
      {props.chars ? `${props.address.slice(0, props.chars)}...` : props.address}
    </span>
  );
  return (
    <a target="_blank" href={EraswapInfo.getAddressHref(props.address)}>
      {username === null ? (
        addrElement
      ) : (
        <>
          {username} ({addrElement})
        </>
      )}
    </a>
  );
}
