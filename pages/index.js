import { useCallback, useEffect } from 'react';
import { useWeb3React } from '@web3-react/core';
import styles from '../styles/Home.module.css';
import { connector } from '../config/web3';

export default function Home() {
  const { activate, active, account, error, chainId, deactivate } =
    useWeb3React();

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem('previouslyConnected', true);
  }, [activate]);

  const disconnect = () => {
    deactivate();
    localStorage.removeItem('previouslyConnected');
  };

  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true') connect();
  }, [connect]);

  return (
    <div className={styles.container}>
      <h1>Web3 demo app</h1>
      {active ? (
        <>
          <button onClick={disconnect}>Disconnect</button>
          <p>
            You are connected to {chainId === 1 ? 'Ethereum' : chainId} network{' '}
            <br /> Your account is {account}
          </p>
        </>
      ) : (
        <>
          <button onClick={connect}>Connect Wallet</button>
        </>
      )}
    </div>
  );
}
