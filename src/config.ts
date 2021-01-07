const devConfig = {
  baseUrl: 'http://localhost:3000',
  dayswappersAuthorizedWallet: process.env.REACT_APP_DAYSWAPPERS_AUTHORIZED_WALLET,
};

const prodConfig = {
  baseUrl: 'http://localhost:8001' || 'https://apis.eraswap.info',
  dayswappersAuthorizedWallet: process.env.REACT_APP_DAYSWAPPERS_AUTHORIZED_WALLET,
};

export default process.env.REACT_APP_NODE === 'development' ? devConfig : prodConfig;
