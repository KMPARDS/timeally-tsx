const devConfig = {
  baseUrl: 'https://apis.eraswap.info',
  dayswappersAuthorizedWallet: process.env.REACT_APP_DAYSWAPPERS_AUTHORIZED_WALLET
};

const prodConfig = {
  baseUrl: 'https://apis.eraswap.info',
  dayswappersAuthorizedWallet: process.env.REACT_APP_DAYSWAPPERS_AUTHORIZED_WALLET
};

export default process.env.REACT_APP_NODE === 'development' ? devConfig : prodConfig;
