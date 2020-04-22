/**
 * @description: ant-design配置
 */

const { override, fixBabelImports, addLessLoader } = require("customize-cra");

module.exports = override(
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),

  addLessLoader({
    javascriptEnabled: true,
    modifyVars: { "@primary-color": "rgb(117,70,201)" },
  }),
);
