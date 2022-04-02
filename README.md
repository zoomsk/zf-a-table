# zfa-table  
介绍：zf-table是基于ant-design-vue a-table封装的一个表格组件 ,依赖于ant design vue

##### props   
`title` 表格标题  
`tableKey` 用于缓存表格column的key，因使用缓存localstorage时候吧tableKey作为Key，所以每次更改column需更改tableKey  
` iconReload（false）"` 是否展示刷新按钮  
其它props参考ant-design-vue（https://www.antdv.com/components/table-cn/）  
#### columns  
columns 新增两个属性   
checked: Bool // 是否默认展示  (默认true)
disabled: Bool // 是否禁用操作（默认false）
##### event  
`reload` 刷新回调  
### slot
` v-slot:leftTitle` 表格左侧头   
`v-slot:button` 表格右上头  
