import { convertStyle } from '@/utils/tool'
import trans from '@/utils/transform'
import { parseTime } from '@/utils/time'

export default {
  data() {
    return {
      columns: [
        { prop: 'imei', label: 'IMEI号', width: '150', render: this.renderLink },
        { prop: 'status', label: '设备状态', width: '100', render: (h, ctx) => {
          const em = convertStyle(trans.auditStatus, ctx.row.status)
          return h('span', { style: { color: em.color } }, em.name)
        }
        },
        { prop: 'supplierName', label: '设备供应商', width: '150' },
        { prop: 'simExpirationTime', label: '流量到期时间', width: '150', formatter: (row) => {
          return parseTime(row.stime, '{y}-{m}-{d}')
        }
        },
        { prop: 'action', label: '操作', align: 'center', fixed: 'right', width: '150', render: this.renderBtn }
      ]
    }
  },
  mounted() {
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    renderLink(h, data) {
      return h('span', {
        style: { color: '#439DF7', cursor: 'pointer' },
        on: { click: () => this.handelBtn(data, data.methods = 'detail') }
      }, data.row.imei)
    },
    renderBtn(h, data) {
      if (data.row.vehicleNo) {
        return h('div', [
          h('el-button', {
            directives: [{
              name: 'check',
              value: 'HardwareListLook'
            }],
            props: { type: 'text', size: 'small' },
            on: { click: () => this.handelBtn(data, data.methods = 'detail') } }
          , '查看')
        ])
      }
    }
  }
}
