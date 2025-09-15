/**
 * @type {import('@babel/core').ConfigFunction}
 */
module.exports = function (api) {
  // Cache the configuration, which is a good practice for build performance
  api.cache(true);

  const presets = [
    // This preset compiles modern ES2015+ JavaScript features down to a compatible version.
    // It's essential for ensuring your code works across different browsers.
    '@babel/preset-env',

    // This preset handles the syntax for React, specifically JSX.
    // It is required for any React application to properly translate JSX into JavaScript.
    '@babel/preset-react'
  ];

  const plugins = [
    // The `relay` plugin is necessary for processing the `graphql` tagged templates.
    // This plugin is what resolves the "Uncaught Invariant Violation" error you are seeing.
    'relay'
  ];

  return {
    presets,
    plugins
  };
};
