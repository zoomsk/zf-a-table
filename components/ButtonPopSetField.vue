<template>
  <a-popconfirm placement="bottomRight" @confirm="confirm" ok-text="保存">
    <template slot="title">
      <h4 style=" " class="">列展示
        <a-button @click="resetFields" type="link" class="f-r" size="small">重置</a-button>
      </h4>
      <h5 class="font-size-12 gray-color">固定在左侧</h5>
      <div class="pop-item" style="display: block; width: 200px;" v-for="(item) in fixedLeftColumns" :key="item.key">
        <a-row class="m-b-6">
          <a-col span="18">
            <a-checkbox
              @change="changeColumns"
              v-model="item.checked"
              :disabled="item.disabled">
              {{ item.title }}
            </a-checkbox>
          </a-col>
          <a-col class="pop-item-tool" span="6" style="display: none">
            <a-tooltip placement="top">
              <template slot="title">
                <span>取消固定</span>
              </template>
              <a-icon
                @click="fixedFields(item, 'no')"
                type="vertical-align-middle"
                class="primary-color cursor-pointer"/>
            </a-tooltip>
          </a-col>
        </a-row>
      </div>
      <h5 class="font-size-12 gray-color">不固定</h5>
      <div class="pop-item" style="display: block; width: 200px;" v-for="(item) in noFixedColumns" :key="item.key">
        <a-row class="m-b-6">
          <a-col span="18">
            <a-checkbox
              @change="changeColumns"
              v-model="item.checked"
              :disabled="item.disabled">
              {{ item.title }}
            </a-checkbox>
          </a-col>
          <a-col class="pop-item-tool" span="6" style="display: none">
            <a-tooltip placement="top">
              <template slot="title">
                <span>固定到列首</span>
              </template>
              <a-icon
                @click="fixedFields(item, 'left')"
                type="vertical-align-top"
                class="primary-color cursor-pointer"/>
            </a-tooltip>
            <a-tooltip placement="top">
              <template slot="title">
                <span>固定到列尾</span>
              </template>
              <a-icon
                @click="fixedFields(item, 'right')"
                type="vertical-align-bottom"
                class="m-l-8 primary-color cursor-pointer"/>
            </a-tooltip>
          </a-col>
        </a-row>
      </div>

      <h5 class="font-size-12 gray-color">固定在右侧</h5>
      <div class="pop-item" style="display: block; width: 200px;" v-for="(item) in fixedRightColumns" :key="item.key">
        <a-row class="m-b-6">
          <a-col span="18">
            <a-checkbox
              @change="changeColumns"
              v-model="item.checked"
              :disabled="item.disabled">
              {{ item.title }}
            </a-checkbox>
          </a-col>
          <a-col class="pop-item-tool" span="6" style="display: none">
            <a-tooltip placement="top">
              <template slot="title">
                <span>取消固定</span>
              </template>
              <a-icon
                @click="fixedFields(item, 'no')"
                type="vertical-align-middle"
                class="primary-color cursor-pointer"/>
            </a-tooltip>
          </a-col>
        </a-row>
      </div>

    </template>
    <a-tooltip placement="top">
      <template slot="title">
        <span>列设置</span>
      </template>
      <a-icon class="m-l-12 font-size-18 cursor-pointer" type="setting"/>
    </a-tooltip>
  </a-popconfirm>
</template>

<script>
import {deepClone} from './../utils'
// 全局修改key
const prefixKey = 'v1'
export default {
  name: 'ButtonPopSetField',
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    columnFields: {
      type: Array,
      default: () => []
    },
    localKey: {
      type: String,
      default: () => 'default-field-key'
    }
  },
  data () {
    return {
      tempData: [],
      columnsNew: []
    }
  },
  created () {
    const obj = localStorage.getItem(this.tableKey)
    console.log('obj:', obj)
    console.log('obj:', !!obj)
    if (!obj || obj?.length <= 2) {
      this.tempData = deepClone(this.columns)
      localStorage.setItem(this.tableKey, JSON.stringify(this.columnsNew))
    } else {
      const temp = JSON.parse(obj)
      this.tempData = temp.map(o => {
        if (!o.hasOwnProperty('checked')) {
          o.checked = true
        }
        return o
      })
    }
    console.log('tempData:', this.tempData)
    this.changeColumns()
  },
  methods: {
    confirm () {
    },
    resetFields () {
      this.tempData = deepClone(this.columns).map(o => {
        if (!o.hasOwnProperty('checked')) {
          o.checked = true
        }
        return o
      })
      this.changeColumns()
    },
    fixedFields (item, str) {
      if (str === 'left' && this.fixedLeftColumns.length >= 3) {
        this.$message.error('左侧最多浮动三个属性')
        return
      }
      if (str === 'right' && this.fixedRightColumns.length >= 3) {
        this.$message.error('右侧最多浮动三个属性')
        return
      }
      const data = deepClone(this.tempData)
      const index = data.findIndex(o => o.key === item.dataIndex)
      item.fixed = str
      data[index] = item
      this.tempData = data
      this.changeColumns()
    },
    changeColumns () {
      const data = deepClone(this.tempData)
      console.log('data;;;;;;;;', this.columns)
      localStorage.setItem(this.tableKey, JSON.stringify(data))
      // 解决table中 fixed 顺序错乱引起的bug 进行排序
      this.$emit('updateColumns', data)
    }
  },
  computed: {
    fixedLeftColumns () {
      return this.tempData.filter(o => o?.fixed === 'left' || !!o?.fixed)
    },
    noFixedColumns () {
      return this.tempData.filter(o => !o.hasOwnProperty('fixed'))
    },
    fixedRightColumns () {
      return this.tempData.filter(o => o?.fixed === 'right')
    },
    tableKey () {
      return `${ prefixKey }${ this.localKey }`
    }
  }
}
</script>

<style scoped>
  .pop-item-tool {
    display: none;
  }

 .pop-item:hover .pop-item-tool {
   display: block;
 }
</style>
