<template>
  <a-card :bordered="false" :bodyStyle="{padding:0}">
    <div class="ant-pro-table-toolbar" v-if="header">
      <div class="ant-pro-table-toolbar-title">
        <template v-if="title">
          {{ title }}
        </template>
        <template v-else>
          <slot name="title"></slot>
        </template>
      </div>
      <div class="ant-pro-table-toolbar-option">
        <slot name="action"></slot>
      </div>
    </div>
    <slot></slot>
  </a-card>
</template>

<script>
  export default {
    name: 'TableLayout',
    props: {
      title: {
        type: String,
        default: ''
      },
      header: {
        type: Boolean,
        default: true
      }
    }
  }
</script>
<style scoped>
.ant-pro-table-toolbar-title {
  flex: 1 1;
  color: rgba(0, 0, 0, .85);
  font-weight: bold;
  font-size: 16px;
  line-height: 24px;
  text-align: left;
}
.ant-pro-table-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 54px;
  padding: 0 24px;
}


.ant-pro-table-toolbar-option {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
