// src/index.js
// 这里import 的 btn和btnDemo.vue的name属性名相同 ！

import ZfATable from "./components/ZfATable";

ZfATable.install = Vue => Vue.component(ZfATable.name, ZfATable) // 给组件配置install方法

export default ZfATable;
