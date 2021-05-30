/**
 * multi ftp download
 * @param MFTPDownList
 * @return {}
 */
import Vue from 'vue'
import NodeForm from './nodeForm.vue'
import { rules } from './rules'
import { commonOptions } from '../../common/common'

var taskMultiFtpUpload =
  {
    type: 'template',
    hasChildren: true,
    field: 'mftpUploadTestConfig',
    col: { span: 24, xs: 24 },
    template: '<NodeForm ref="nodeForm" :rule="rule" @update="updateForm" />',
    vm: new Vue({
      components: { NodeForm },
      data: {
        data: {},
        formData: {},
        modelForm: {},
        rule: rules,
        option: commonOptions
      },
      computed: {
        formDatas() {
          return this.getFormData()
        }
      },
      watch: {
        // 编辑表单
        data(newData) {
          console.log(newData)
          this.$refs.nodeForm.setForm(newData)
        }
      },
      methods: {
        updateForm(data) {
          this.formData = data
        }
      }
    })
  }

export { taskMultiFtpUpload }
