// MOC基础任务配置
import Vue from 'vue'
import { commonOptions } from '../../common/common'
import { getDictByTagName } from '@/utils/dictCache.js'
import { proxySetting } from './proxySetting'
import { urlListRule } from './urlList'
import { baiduyunAccount } from './baiduyunAccount'
const taskRule = [
  {
    type: 'select',
    field: 'psCallMode',
    title: '测试模式',
    value: getDictByTagName('PSCallMode')['1'].value,
    options: getDictByTagName('PSCallMode'),
    col: {
      span: 13,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'websiteType',
    title: '网站类型',
    value: getDictByTagName('httpdownWebsiteType')[0].value,
    options: getDictByTagName('httpdownWebsiteType'),
    col: {
      span: 11,
      xs: 12
    }
  },
  {
    type: 'select',
    field: 'endCondition',
    title: '结束条件',
    value: getDictByTagName('mftpdownloadEndCondition')['1'].value,
    options: getDictByTagName('mftpdownloadEndCondition'),
    col: {
      span: 13,
      xs: 12
    }
  },
  {
    type: 'InputNumber',
    field: 'downloadTimeout',
    title: '下载超时(s)',
    value: 1200,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'downloadDuration',
    title: '下载时长(s)',
    value: 300,
    col: {
      span: 13,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'noDataTimeout',
    title: '无流量超时(s)',
    value: 60,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'InputNumber',
    field: 'threadCount',
    title: '线程数',
    value: 1,
    col: {
      span: 13,
      xs: 24
    },
    props: {
      min: 0
    }
  },

  {
    type: 'switch',
    title: '保存文件',
    field: 'isSaveFile',
    value: false,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      'trueValue': true,
      'falseValue': false,
      slot: {
        open: '是',
        close: '否'
      }
    }
  },
  {
    type: 'input',
    field: 'saveDirectory',
    title: '保存目录',
    value: '',
    col: {
      span: 13,
      xs: 24
    }
  },
  {
    type: 'InputNumber',
    field: 'port',
    title: '端口',
    value: 80,
    col: {
      span: 11,
      xs: 24
    },
    props: {
      min: 0
    }
  },
  {
    type: 'switch',
    title: '启用代理',
    field: 'useProxy',
    value: false,
    col: {
      span: 24,
      xs: 24
    },
    props: {
      'trueValue': true,
      'falseValue': false,
      slot: {
        open: '是',
        close: '否'
      }
    }
  }
]
var rules = taskRule.concat(urlListRule, proxySetting, baiduyunAccount)
var taskMultiHttpDownload = {
  type: 'template',
  name: 'children',
  hasChildren: true,
  field: 'mhttpDownTestConfig',
  col: { span: 24, xs: 24 },
  template: '<el-collapse v-model="active" class="form-collapse"><el-collapse-item name="1"><template slot="title"><el-divider>{{title}}</el-divider></template><form-create v-model="modelForm" :rule="rule" :option="option" /></el-collapse-item></el-collapse>',
  vm: new Vue({
    data: {
      data: {},
      title: 'Multi HTTP Download 测试设置',
      active: ['1'],
      modelForm: {},
      rule: rules,
      option: commonOptions
    },
    computed: {
      formData() {
        var formData = this.modelForm.formData()
        this.rule.forEach(item => {
          if (item.field === 'urlList') {
            formData['urlList'] = item.vm.list
          }
          if (item.field === 'proxySetting') {
            formData['proxySetting'] = item.vm.modelForm.formData()
          }
          if (item.field === 'baiduyunAccount') {
            formData['baiduyunAccount'] = item.vm.modelForm.formData()
          }
        })
        return formData
      }
    },
    watch: {
      data(newData) {
        console.log(newData)
        this.rule.forEach(item => {
          if (item.field === 'urlList') {
            item.vm.list = newData['urlList']
          }
          if (item.field === 'proxySetting') {
            item.vm.modelForm.setValue(newData['proxySetting'])
          }
          if (item.field === 'baiduyunAccount') {
            console.log(item)
            item.vm.data = newData['baiduyunAccount']
            item.vm.modelForm.setValue(newData['baiduyunAccount'])
          }
        })
      }
    }
  })
}
export { taskMultiHttpDownload }
