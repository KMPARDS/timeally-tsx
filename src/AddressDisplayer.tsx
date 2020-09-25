import React, { useState, useEffect } from 'react';

export function AddressDisplayer(props: { address: string }) {
  const [username, setUsername] = useState<string | null>(null);
  useEffect(() => {
    window.provider
      .resolveUsername(props.address)
      .then(setUsername)
      .catch(() => {});
  }, []);
  return <>{username === null ? props.address : `${username} (${props.address})`}</>;
}
