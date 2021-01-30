const rewireMobX = require('react-app-rewire-mobx');
// const rewirePreact = require('react-app-rewire-preact');
// const {injectBabelPlugin} = require('react-app-rewired');
const path = require("path");

/* config-overrides.js */
module.exports = function override(config, env) {
  // add a plugin
  // config = injectBabelPlugin('emotion/babel',config)

  // use the Preact rewire
  if (env === "production") {
    console.log("⚡ Production build with Preact");
    // config = rewirePreact(config, env);
  }

  const istanbulLoader = {
    test: /\.js$/,
    loader: 'istanbul-instrumenter-loader',
    options: {
      esModules: true
    },
    include: path.resolve('src/'),
    exclude: [
      /getWeb3.js/, // getWeb is dealing with multiple networks, not related to dapp logic
      /StatusPage.js/ // StatusPage.js is dead code
    ],
    enforce: "post",
  };
  if (!config.module.rules) {
    config.module.rules = [istanbulLoader];
  } else {
    config.module.rules.push(istanbulLoader);
  }

  // use the MobX rewire
  config = rewireMobX(config,env);

  return config;
}
