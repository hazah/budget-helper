module.exports = {
  modifyOptions: function ({ options: { razzleOptions } }) {
    razzleOptions.staticCssInDev = true;
    return razzleOptions;
  },
};
