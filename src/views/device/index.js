import { fetchDeviceList, fetchGroupList, switchDebug, switchLock, importDevice, fetchDeviceDelete, fetchDeviceExport } from '@/api/device/device.js'
import { checkNodeEquals } from '@/utils'
import { TestPlanListView, addDeviceView } from './components/index'
import Pagination from '@/components/Pagination'
import { getCacheDict } from '@/utils/dictCache'
import { getDeviceType } from '@/utils/MonitoredTable'
import FleetCardTable from '@/components/FleetCardTable'
import { mapGetters } from 'vuex'

export default {
  name: 'DeviceTable',
  components: { Pagination, TestPlanListView, addDeviceView, FleetCardTable },
  data() {
    return {
      dialogVisibleImport: false,
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: false,
      pageParams: {
        page: 1,
        limit: 20
      },
      listQuery: {
        search: undefined,
        type: undefined,
        status: undefined,
        field: 'status',
        isAsc: 0
      },
      filterFieldList: [
        { label: this.$t('device.deviceName'), placeholder: this.$t('common.inputTip'), type: 'input', value: 'search', width: '200px' },
        { label: this.$t('common.deviceType'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'type', list: 'deviceTypeOptions', optionKey: 'key', multiple: false, clearable: true },
        { label: this.$t('device.deviceStatus'), placeholder: this.$t('common.pleaseSelect'), type: 'select', value: 'status', list: 'deviceStatusOptions', optionKey: 'key', multiple: false, clearable: true }
      ],
      listTypeInfo: {
        deviceTypeOptions: [],
        deviceStatusOptions: []
      },
      deviceId: '',
      deviceDialogStatus: '',
      monitorPhoneDeviceStatus: '',
      deviceTitle: '',
      typeId: '',
      deviceType: [],
      selectGroupIds: [],
      deviceProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      deviceData: [],
      dialogFormVisible: false,
      dialogVisible: false,
      deviceDialog2: false,
      alog: false,
      // ?????????????????????
      treeData: [],
      dialogStatus: '',
      textMap: {
        update: this.$t('common.edit'),
        create: this.$t('common.create')
      },
      downloadLoading: false,
      popoverVisible: false, // ??????????????????
      fileList: [],
      multipleTable: []
    }
  },
  computed: {
    ...mapGetters({
      flattenGroups: 'flattenGroups'
    })
  },
  created() {
    this.getFormOptions()
    this.$nextTick(() => {
      this.getGroupList()
      this.handleDeviceTypeDict()
      this.getDeviceList()
    })
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      return checkNodeEquals(data, value)
    },
    async getGroupList() {
      fetchGroupList().then(res => {
        const data = res.data
        if (data.code === 1) {
          this.treeData = data.data
          this.deviceData = [{
            id: -1,
            name: this.$t('device.deviceMar'),
            children: data.data
          }]
        }
      })
    },
    async getDeviceList(filterData) {
      this.listLoading = true
      const filterDataCopy = filterData ? { ...filterData } : this.tempParams
      const params = this.tempParams = Object.assign({}, this.listQuery, filterDataCopy, this.pageParams)
      fetchDeviceList(params, this.selectGroupIds).then(response => {
        const data = response.data
        if (data.code === 1) {
          this.list = data.data.records
          this.total = parseInt(data.data.total)
        }
      }).finally(() => {
        this.listLoading = false
      })
    },
    /**
     * ??????????????????
     * @param {*} data
     */
    handleSwitchLeftGroup(data) {
      const groupIds = []
      this.getGroupIdAll(data, groupIds)
      console.log(groupIds)
      this.selectGroupIds = Object.assign([], groupIds)
      this.pageParams.page = 1
      this.getDeviceList()
    },
    /**
     * ??????????????????????????????????????????
     * @param {*} data
     * @param {*} res
     */
    getGroupIdAll(data, res) {
      if (data.id !== -1) {
        res.push(data.id)
      }
      if (data.children !== undefined) {
        data.children.forEach(element => {
          this.getGroupIdAll(element, res)
        })
      }
    },
    // ??????????????????
    getTableDeviceType(data) {
      return getDeviceType(data.toString())
    },
    // ??????????????????
    getDeviceGroupName(groupId) {
      const group = this.flattenGroups[groupId]
      if (!group) return groupId
      return group.name
    },
    // ??????????????????
    getDeviceStatus(status) {
      const dict = getCacheDict('deviceStatus')
      if (!Array.isArray(dict)) return status
      const matched = dict.find(item => parseInt(item.code) === status)
      if (!matched) return status
      return matched.name
    },
    /**
     * ????????????
     * @param {int} rowIndex
     */
    handleSwitchDebug(rowIndex) {
      const row = this.list[rowIndex]
      const { id, isDebug } = row
      const tip = this.$t(`device.tips.${isDebug ? 'debug' : 'removeDebug'}`)
      this.$confirm(tip, this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'info'
      }).then(() => {
        this.listLoading = true
        switchDebug(id, isDebug).then(res => {
          const data = res.data
          if (data.code === 1) {
            this.$notify({
              title: this.$t('common.success'),
              message: this.$t('common.updateSuccess'),
              type: 'success',
              duration: 2000
            })
          }
        }).finally(() => {
          this.listLoading = false
        })
      }).catch(() => {
        row.isDebug = isDebug ? 0 : 1
        this.$set(this.list, rowIndex, row)
      })
    },
    /**
     * ?????????
     * @param {int} rowIndex
     */
    handleSwitchLock(rowIndex) {
      const row = this.list[rowIndex]
      const { id, locked } = row
      const tip = this.$t(`device.tips.${locked ? 'lock' : 'unlock'}`)
      this.$confirm(tip, this.$t('common.tip'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'info'
      }).then(() => {
        this.listLoading = true
        switchLock(id, locked).then(res => {
          const data = res.data
          if (data.code === 1) {
            this.$notify({
              title: this.$t('common.success'),
              message: this.$t('common.updateSuccess'),
              type: 'success',
              duration: 2000
            })
          }
        }).finally(() => {
          this.listLoading = false
        })
      }).catch(() => {
        row.locked = locked ? 0 : 1
        this.$set(this.list, rowIndex, row)
      })
    },
    /**
     * ??????
     */
    handleFilter(filterData) {
      this.pageParams.page = 1
      this.getDeviceList(filterData)
    },
    /**
     * ??????????????????
     * @param {int} deviceId ??????id
     */
    handleTestPlanView(name, id, type) {
      this.$router.push({
        path: `/testPlan/list/${name}/${id}/${type}`
      })
    },
    /**
     * ??????????????????
     */
    createDevice() {
      this.$refs.saveDevice.handleSaveDevice()
    },
    updateDevice() {
      this.$refs.saveDevice.handleUpdateDevice()
    },
    /**
     * ??????????????????
     */
    handleClear() {
      this.$refs.saveDevice.resetForm()
    },
    /**
     * ??????deviceType????????????
     */
    handleDeviceTypeDict() {
      this.deviceType = getCacheDict('deviceType')
    },
    handleDeviceTitle(typeId) {
      for (let i = 0; i < this.deviceType.length; i++) {
        if (this.deviceType[i].code === typeId.toString()) {
          this.deviceTitle = this.deviceType[i].name
          break
        }
      }
    },
    handleDeviceView(typeId) {
      this.deviceDialogStatus = 'create'
      this.typeId = typeId
      this.handleDeviceTitle(typeId)
      this.dialogVisible = true
    },
    handleEditDeviceView(typeId, id) {
      this.typeId = typeId
      this.deviceId = id
      this.deviceDialogStatus = 'update'
      this.handleDeviceTitle(typeId)
      this.dialogVisible = true
      this.$nextTick(() => {
        this.$refs.saveDevice.getDeviceInfo(typeId, id)
      })
    },
    testme(deviceId) {
      console.log(deviceId)
      this.$router.push({
        path: `/testPlan/list/${deviceId}`
      })
    },
    handleNodeClick(data) {
      this.selectGroupIds = []
      // ????????????ID
      const collectGroups = (data) => {
        this.selectGroupIds.push(data.id)
        if (data.children) {
          for (const item of data.children) {
            collectGroups(item)
          }
        }
      }
      collectGroups(data)
      this.getDeviceList()
    },
    handleRefresh() {
      this.selectGroupIds = []
      this.getGroupList()
      this.getDeviceList()
    },
    /**
     * ????????????Excel
     */
    submitUpload() {
      const list = document.getElementsByClassName('el-upload-list__item is-ready')
      if (list.length === 0) {
        this.$message({
          type: 'warning',
          message: this.$t('common.importMessage')
        })
        return
      }
      this.$refs.upload.submit()
    },
    uploadSectionFile(param) {
      const fileObj = param.file
      // FormData ??????
      const form = new FormData()
      // ????????????
      form.append('file', fileObj)
      importDevice(form).then(response => {
        if (response.data.code === 1) {
          this.$notify({
            title: this.$t('common.success'),
            message: this.$t('common.createSuccess'),
            type: 'success',
            duration: 2000
          })
          this.getDeviceList()
          this.dialogVisible = false
        }
        this.fileList = []
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleDelete() {
      console.log(this.multipleSelection)
      const device = []
      for (const i in this.multipleSelection) {
        device[i] = this.multipleSelection[i].id
      }
      if (device.length > 0) {
        this.$confirm(this.$t('common.deleteTip'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning',
          center: false
        }).then(() => {
          if (device !== '') {
            fetchDeviceDelete(device).then(response => {
              if (response.data.code === 1) {
                this.getDeviceList()
                this.$notify({
                  title: this.$t('common.success'),
                  message: this.$t('common.deleteSuccess'),
                  type: 'success',
                  duration: 2000
                })
              }
            })
          }
        })
      } else {
        this.$alert(this.$t('common.deviceMessage'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.cancel'),
          callback: action => {
          }
        })
      }
    },
    /**
     * ????????????
     */
    handleExport() {
      const device = []
      for (const i in this.multipleSelection) {
        device[i] = this.multipleSelection[i].id
      }
      if (device.length > 0) {
        if (device !== '') {
          fetchDeviceExport(device).then(response => {
            console.log(response)
            // if (response.data.code === 1) {
            //   this.$notify({
            //     title: this.$t('common.success'),
            //     message: this.$t('common.deleteSuccess'),
            //     type: 'success',
            //     duration: 2000
            //   })
            // }
          })
        }
      } else {
        this.$alert(this.$t('common.deviceMessage'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.cancel'),
          callback: action => {
          }
        })
      }
    },
    handleImport() {
      this.dialogVisibleImport = true
    },
    handleCancleImport() {
      this.dialogVisibleImport = false
    },
    getFormOptions() {
      // ????????????
      const deviceTypes = getCacheDict('deviceType')
      for (let i = 0; i < deviceTypes.length; i++) {
        this.listTypeInfo.deviceTypeOptions.push({
          label: deviceTypes[i].name,
          key: deviceTypes[i].code,
          value: deviceTypes[i].code
        })
      }
      // ????????????
      const deviceStatusList = getCacheDict('deviceStatus')
      for (let i = 0; i < deviceStatusList.length; i++) {
        this.listTypeInfo.deviceStatusOptions.push({
          label: deviceStatusList[i].name,
          key: deviceStatusList[i].code,
          value: deviceStatusList[i].code
        })
      }
    }
  }
}
