/*
  此文件用于给react-app-rewired修改create-react-app脚手架的默认配置
 */
const { injectBabelPlugin } = require('react-app-rewired');
const rewireLess = require('react-app-rewire-less');

module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', style: true }], config);
  config = rewireLess(config, env, {
    modifyVars: {
      '@primary-color': '#1DA57A',
      '@font-size-base': '14px',
   },
  });
  return config;
};
