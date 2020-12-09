const devConfig = {
  baseUrl: 'https://apis.eraswap.info'
};

const prodConfig = {
  baseUrl: 'https://apis.eraswap.info'
}

export default process.env.REACT_APP_NODE === 'development' ? devConfig : prodConfig;
