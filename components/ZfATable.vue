<script>
/**
 * 基于a-table 封装的一个table组件
 * */
// import '@/components/FullTable/full-table.less'
import { Table } from 'ant-design-vue'
import ButtonPopSetField from './ButtonPopSetField'
import TableLayout from "./TableLayout";
import {deepClone} from './../utils'

export default {
  // 自定义table
  name: 'ZfATable',
  // inheritAttrs: false,
  props: Object.assign({
      title: {
        type: String,
        default: ''
      },
      columns: {
        type: Array,
        required: true
      },
      // 用于存放table自定义字段
      tableKey: {
        type: Object,
        default: () => {}
      },
      // 用于显示刷新icon
      iconReload: {
        type: [Boolean, String],
        default: () => false
      }
    }, Table.props),
  data () {
    return {
      isScreen: false, // 是否全屏
      columnsNew: []
    }
  },
  computed: {
    columnsPro () {
      const data = deepClone(this.columnsNew)
      return data.filter(o => !o.hasOwnProperty('checked') || o.checked)
    }
  },
  created () {
    // 先通过localKey从 缓存取column 如果没有，直接用传递过来的
    this.columnsNew = deepClone(this.columns)
  },
  render (records) {
    const on = {
      ...this.$listeners
    }
    const props = Object.assign(deepClone(this.$props), {
      columns: this.columnsPro
    })
    const columns = deepClone(this.columns)
    return (<TableLayout title={this.title} class={this.isScreen ? 'full-screen' : ''}>
             <template slot="action">
               <div>
                 { this.$slots.button }
                 <div class="m-l-12 font-size-18 cursor-pointer" style="display: inline-block">
                   <a-icon type="fullscreen-exit" v-show={this.isScreen} onClick={this.changeFullScreen.bind(this, false)}/>
                   <a-tooltip placement="top" v-show={!this.isScreen} onClick={this.changeFullScreen.bind(this, true)}>
                      <template slot="title">
                        <span>全屏</span>
                      </template>
                      <a-icon type="fullscreen"/>
                  </a-tooltip>
                   <a-icon v-show={this.iconReload} onClick={this.reloadData} class="m-l-12  font-size-16 cursor-pointer" type="reload" />
                 </div>
                 <ButtonPopSetField
                   local-key={this.tableKey}
                   columns={columns}
                   onUpdateColumns={this.updateColumns}
                 />
              </div>
            </template>
            <template slot="title">
              { this.$slots.leftTitle || '查询结果' }
            </template>

            <a-table {...{ props: props, scopedSlots: this.$scopedSlots, on: on }} />
          </TableLayout>)
  },

  mounted () {
    // 键盘退出
    const that = this
    this.$nextTick(function () {
      document.addEventListener('keyup', function (e) {
        if (e.keyCode === 27) {
          that.changeFullScreen(false)
        }
      })
    })
  },
  methods: {
    /**
     * 更新column
     * */
    updateColumns (records) {
      console.log('rrrr:', records)
      console.log('******************************columns:', this.columns)
      this.columnsNew = deepClone(records)
    },
    /**
    * 切换全屏
    * */
    changeFullScreen (e) {
      this.isScreen = e
      if (e) {
        this.$message.info('按 Esc 键可退出全屏模式')
      }
      this.$store.commit('SET_FULL_SCREEN', e)
    },
    /**
     * 刷新表格
     * */
    reloadData () {
      this.$emit('reload')
    }
  }
}
</script>
<style >
.m-l-12 {
  margin-left: 12px;
}
.full-screen {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow-y:auto;
  z-index: 100;
  background-color: #fff;
  margin-top: 0 !important;
}

.m-l-12 {
  margin-left: 12px;
}
.font-size-16 {
  font-size: 16px;
}
.cursor-pointer {
  cursor: pointer;
}
</style>
