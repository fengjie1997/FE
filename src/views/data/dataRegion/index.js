import i18n from '@/lang'
import store from '@/store/index'
import splitPane from 'vue-splitpane'
import { getCacheDict } from '@/utils/dictCache'
import Pagination from '@/components/Pagination'
import StandardMap from '@/components/Map/StandardMap'
import RegionProperty from '@/components/Map/StandardMap/RegionProperty'
import ElTree from '@/components/tree/src/tree.vue'
import download from '@/utils/downloadArea'
import {
  regionUploadUrl,
  delRegionRecord
} from '@/api/data/region.js'
import { mapState, mapActions, mapGetters } from 'vuex'
import { getGeoStyle } from '@/utils/mapUtil'
export default {
  name: 'DataRegion',
  components: { splitPane, StandardMap, Pagination, ElTree, RegionProperty },
  data() {
    return {
      regionUploading: false,
      selectDeleteData: [],
      checkedRegionKeys: [],
      expandedRegionKeys: [],
      deleteList: [],
      uploadState: true,
      mapLoadingMsg: {},
      checkedNodeList: [],
      treeLoading: false,
      geoList: [],
      radio: 'mif',
      checkList: false,
      dataRegionLoading: false,
      traceGeoJson: {},
      keyword: null,
      regionEditVisible: false,
      token: store.state.user.token,
      importType: 0,
      apiUrl: regionUploadUrl,
      checkedList: [],
      total: 0,
      options: [],
      listParams: {
        cellName: '',
        cellTypes: [],
        networkTypes: [],
        providers: [],
        provinceCitys: []
      },
      listQuery: {
        page: 1,
        limit: 50,
        search: undefined,
        field: 'id',
        isAsc: 0
      },
      treeData: [],
      viewType: 'map',
      stationTree: [],
      regionTableData: [],
      regionTableDataPage: [],
      props: {
        label: 'name',
        children: 'children'
      },
      providersOp: [],
      cellOptions: [],
      netTypeOptions: [
        {
          label: 'LTE',
          value: 'LET'
        }
      ],
      exportDialogVisible: false,
      dialogVisible: false,
      mapData: [],
      listLoading: false,
      adminRegion: [],
      fileList: [],
      regionTypeId: '',
      importParams: {
        type: 1,
        parentId: '',
        splitMifFile: false
      },
      regionTypes: getCacheDict('importRegionType'),
      fileTable: [],
      regionFormId: null,
      regionForm: {
        name: '',
        parentId: null,
        type: 0,
        lineWidth: 0,
        lineColor: '',
        fillColor: '',
        opacity: 0
      },
      regionCount: 0
    }
  },
  watch: {
    regionTableData(newData, oldData) {
      this.regionTableDataPage = this.regionTableData.slice(0, this.listQuery.limit)
      this.regionCount = this.regionTableData.length
    },
    listQuery: {
      handler(newQuery) {
        if (newQuery.page === 1) {
          this.regionTableDataPage = this.regionTableData.slice(0, newQuery.limit)
        } else {
          this.regionTableDataPage = this.regionTableData.slice(newQuery.limit * (newQuery.page - 1), newQuery.limit * (newQuery.page))
        }
      },
      deep: true
    },
    listParams: {
      handler(newParams) {
        this.getList(newParams, this.listQuery)
      },
      deep: true
    },
    dataRegionTree() {
      // ??????Tree??????????????????????????????????????????????????????
      this._refreshCheckedNAAStatus()
    }
  },
  computed: {
    ...mapState({
      adminRegions: state => state.dataManagement.adminRegions
    }),
    ...mapGetters({
      dataRegionTree: 'dataManagement/dataRegionTree',
      adminRegionMapping: 'dataManagement/adminRegionMapping'
    }),
    getImportParams() {
      var param = Object.assign({}, this.importParams)
      if (this.regionTypeId.length > 1) {
        param.parentId = this.regionTypeId[1]
      } else {
        param.parentId = this.regionTypeId[0]
      }
      return param
    },
    dataRegionTreeFlatten() {
      const flatten = regions => {
        let mapping = {}
        for (const region of regions) {
          mapping[region.id] = region
          if (Array.isArray(region.children) && region.children.length > 0) {
            mapping = { ...mapping, ...flatten(region.children) }
          }
        }
        return mapping
      }
      return flatten(this.dataRegionTree)
    }
  },
  created() {
    // ?????????????????????
    this.getAdminRegions()
    // ???????????????
    this.refreshRegionTree()
    // ????????????????????????
    this.requests = {}
  },
  mounted() {
    window.regionMap = this.$refs.refRegionMap.map
  },
  methods: {
    ...mapActions({
      getRegionTree: 'dataManagement/getRegionTree',
      getRegionInfo: 'dataManagement/getRegionInfo',
      getAdminRegions: 'dataManagement/getAdminRegions',
      saveRegion: 'dataManagement/saveRegion'
    }),
    handleSuccessSaveRegion(regionData) {
      this.$nextTick(() => {
        const mapWrapper = this.$refs.refRegionMap.map.mapWrapper
        if (regionData.geoJson && regionData.regionForm) {
          if (!this.checkedRegionKeys.includes(regionData.regionForm.id)) {
            this._addCheckedRegionKeys(regionData.regionForm.id)
          }
          regionData.geoJson.properties = { ...regionData.regionForm, ...getGeoStyle(regionData.regionForm) }
          mapWrapper.regionGeoOverlay.addData(regionData.geoJson)
          // ???????????????????????????????????????
          const regionIndex = this.regionTableData.findIndex(item => item.id === regionData.regionForm.id)
          if (regionIndex !== -1) {
            this.regionTableData[regionIndex] = regionData.regionForm
            this.$set(this.regionTableData, regionIndex, regionData.regionForm)
          } else {
            this.regionTableData.push(regionData.regionForm)
          }
        }
        this.getRegionTree({
          success: () => {
            // ?????????????????????????????????
            this.$nextTick(() => {
              const node = this.$refs.regionTree.getNode(regionData.regionForm.id)
              const checkedObj = {}
              checkedObj.checkedKeys = this.$refs.regionTree.getCheckedKeys()
              checkedObj.checkedNodes = this.$refs.regionTree.getCheckedNodes()
              this.handleNodeCascade(node.data, checkedObj)
              this.expandNodePath(regionData.regionForm.id)
            })
          }
        })
      })
    },
    handleFileDel() {
      this.deleteList.map(item => {
        this.fileList.map((item2, index) => {
          if (item === item2) {
            this.fileList.splice(index, 1)
          }
        })
      })
    },
    selectionChange(type) {
      this.deleteList = type
    },
    translateRegionType(row) {
      if (!row.type) return
      const typeItem = this.regionTypes.find(item => row.type === parseInt(item.code))
      if (!typeItem) return
      return typeItem.name
    },
    translateParentId(row) {
      if (!row.parentId) return
      const parentRegion = this.adminRegionMapping[row.parentId]
      if (!parentRegion) return
      return parentRegion.name
    },
    handleSearch() {
      this.getList(this.listParams, this.listQuery)
      this.$refs.refRegionMap.handleSearchLayer(this.listParams)
    },
    getList(params, listQuery) {
      // this.listLoading = true
      // fetchStationList(params, listQuery).then(res => {
      //   this.regionTableData = res.data.data.records
      //   this.total = Number(res.data.data.total)
      //   // ??????????????????
      //   this.listLoading = false
      // })
    },
    /**
    * ?????????????????????key
    **/
    handleNodeExpand(nodeData) {
      this.expandedRegionKeys.push(nodeData.id)
    },
    /**
     * ??????????????????key????????????
     **/
    handleNodeCollapse(nodeData) {
      const keyIndex = this.expandedRegionKeys.indexOf(nodeData.id)
      if (keyIndex !== -1) {
        this.expandedRegionKeys.splice(keyIndex, 1)
      }
    },
    /**
     * ??????Tree??????????????????
     */
    handleRegionTreeCheck(node, checkedObj) {
      const regionMap = this.$refs.refRegionMap
      const mapWrapper = regionMap.map.mapWrapper
      const drawCmp = mapWrapper.controls.draw
      // ??????????????????
      const cascadeResult = this.handleNodeCascade(node, checkedObj)
      // ??????????????????????????????
      if (cascadeResult.needCheckKeys.length > 0) {
        for (const key of cascadeResult.needCheckKeys) {
          // ??????????????????????????????
          this._cancelRegionInfoRequest(key)
          const loading = mapWrapper.notify({
            type: 'loading',
            content: this.$t('common.pleaseWait')
          })
          const req = this.getRegionInfo({
            regionId: key,
            success: regionInfo => {
              loading.destroy()
              // ?????????????????????
              mapWrapper.regionGeoOverlay.addData(regionInfo)
              mapWrapper.fitBounds(mapWrapper.regionGeoOverlay.getBounds())
              // ?????????????????????
              this.regionTableData.push(regionInfo.properties)
              delete this.requests[key]
            }
          })
          this.requests[key] = {
            req: req,
            loading: loading
          }
        }
      }
      // ????????????????????????
      if (cascadeResult.needUnCheckKeys.length > 0) {
        const capturedFeature = drawCmp._capturedItem
        for (const key of cascadeResult.needUnCheckKeys) {
          // ??????????????????????????????
          this._cancelRegionInfoRequest(key)
          // ?????????????????????
          // ?????????????????????????????????????????????????????????????????????
          if (capturedFeature && capturedFeature.feature.feature.properties.id === key) {
            regionMap.handleExitBtnClick()
          }
          mapWrapper.regionGeoOverlay.removeData(function(feature) {
            return feature['properties']['id'] === key
          })
          // ?????????????????????
          const tableItemIndex = this.regionTableData.findIndex(item => item.id === key)
          this.regionTableData.splice(tableItemIndex, 1)
        }
        const bounds = mapWrapper.regionGeoOverlay.getBounds()
        if (bounds) mapWrapper.fitBounds(bounds)
      }
    },
    /**
     * ??????????????????
     */
    handleNodeCascade(node, checkedObj) {
      const handleResult = {
        needCheckKeys: [],
        needUnCheckKeys: []
      }
      const checkedKeys = checkedObj.checkedKeys
      // true - ???????????????false - ????????????
      const isCheck = checkedObj.checkedNodes.includes(node)
      isCheck ? this._addCheckedRegionKeys(node.id) : this._removeFromCheckedRegionKeys(node.id)
      // ?????????????????????????????????????????????????????????????????????
      if (node.isNonAdminArea) {
        if (node.hasOwnProperty('children')) {
          const childKeys = node.children.map(item => item.id)
          if (childKeys.length > 0) {
            for (const key of childKeys) {
              if (isCheck) {
                if (!checkedKeys.includes(key)) {
                  handleResult.needCheckKeys.push(key)
                  // ??????????????????
                  this._addCheckedRegionKeys(key)
                }
              } else {
                if (checkedKeys.includes(key)) {
                  handleResult.needUnCheckKeys.push(key)
                  // ????????????????????????
                  this._removeFromCheckedRegionKeys(key)
                }
              }
              this.$refs.regionTree.setChecked(key, isCheck)
            }
          }
          return handleResult
        }
      } else {
        const treeNodesMap = this.$refs.regionTree.store.nodesMap
        const parentNode = treeNodesMap[node.id].parent.data
        isCheck ? handleResult.needCheckKeys.push(node.id) : handleResult.needUnCheckKeys.push(node.id)
        // ????????????????????????????????????...??????????????????
        if (parentNode.isNonAdminArea) {
          if (Array.isArray(parentNode.children) && parentNode.children.includes(node)) {
            if (isCheck) {
              let checkedAllChildren = true
              for (const child of parentNode.children) {
                if (!checkedObj.checkedNodes.includes(child)) {
                  checkedAllChildren = false
                  break
                }
              }
              // ????????????????????????????????????????????????
              if (checkedAllChildren) {
                this.$refs.regionTree.setChecked(parentNode.id, isCheck)
                this._addCheckedRegionKeys(parentNode.id)
              }
            } else {
              this.$refs.regionTree.setChecked(parentNode.id, isCheck)
              this._removeFromCheckedRegionKeys(parentNode.id)
            }
          }
        }
        return handleResult
      }
    },
    submitUpload() {
      if (this.regionTypeId === null || this.regionTypeId.length === 0) {
        this.$alert(this.$t('baseData.selectRegion1'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {
          }
        })
      } else if (this.importParams.type === '') {
        this.$alert(this.$t('baseData.selectRegion2'), this.$t('common.tip'), {
          confirmButtonText: this.$t('common.confirm'),
          callback: action => {
          }
        })
      } else {
        this.$refs.upload.submit()
        this.regionUploading = true
      }
    },
    getMessage(data) {
      if (data !== undefined) {
        if (data.errorCode === 11302) {
          return
        } else {
          if (data.code === 1) {
            return this.$t('common.success')
          } else {
            const key = 'errorCode' + '.' + data.errorCode.toString()
            data.message = i18n.t(key)
            return data.message
          }
        }
      } else {
        return
      }
    },
    exportData() {
      if (this.$refs.regionTree.getCheckedNodes().length === 0) {
        this.$notify({
          title: this.$t('common.error'),
          message: '????????????????????????????????????????????????',
          type: 'warning'
        })
      } else {
        this.exportDialogVisible = false
        const obj = {
          ids: [],
          names: []
        }
        this.$refs.regionTree.getCheckedNodes().map(item => {
          if (typeof item.id === 'number') {
            obj.ids.push(item.id)
            obj.names.push(item.name)
          }
        })
        const objData = {
          ids: obj.ids,
          oneRegion: this.checkList,
          type: this.radio
        }
        download('/area/export', '', 'post', objData, true, {
          success: () => {
            this.$notify({
              title: this.$t('common.success'),
              message: '?????????????????????....(?????????)',
              type: 'success'
            })
          },
          error: (errorData) => {
            this.$notify({
              title: this.$t('common.error'),
              message: this.$t('common.actionFailed'),
              type: 'error',
              duration: 2000 })
          }
        }).then(res => {
        })
      }
    },
    ifTogether() {
      this.checkList = !this.checkList
    },
    codeTO(obj) {
      if (obj.hasOwnProperty('response')) {
        if (obj.response.code === 0) {
          return this.$t('common.error')
        }
        if (obj.response.code === 1) {
          return this.$t('common.success')
        }
      }
    },
    uploadError(res) {
      this.regionUploading = false
    },
    uploadSuccess(res) {
      if (res.code === 1) {
        this.$notify({
          title: this.$t('common.success'),
          message: this.$t('common.updateSuccess'),
          type: 'success',
          duration: 2000
        })
        this.refreshRegionTree()
      } else {
        this.$notify({
          title: this.$t('common.error'),
          message: res.message,
          type: 'error',
          duration: 2000
        })
      }
      this.uploadState = false
      this.regionUploading = false
    },
    regionFilter() {
      const search = this.keyword
      let regionFilterData
      if (search) {
        regionFilterData = this.regionTableData.filter(item => item.name.indexOf(search) !== -1)
      } else {
        regionFilterData = this.regionTableData
      }
      this.regionCount = regionFilterData.length
      this.regionTableDataPage = regionFilterData.slice(0, this.listQuery.limit)
    },
    handleDel(row) {
      this.$confirm(this.$t('baseData.deleteTipAll'), {
        confirmButtonText: this.$t('common.confirm'),
        cancelButtonText: this.$t('common.cancel'),
        type: 'warning'
      }).then(() => {
        delRegionRecord([row.id]).then(res => {
          if (res.data.code === 1) {
            this._removeFromCheckedRegionKeys(row.id)
            // ???????????????
            this.refreshRegionTree()
            const regionMap = this.$refs.refRegionMap
            const mapWrapper = regionMap.map.mapWrapper
            const drawCmp = regionMap.map.mapWrapper.controls.draw
            const capturedFeature = drawCmp._capturedItem
            // ?????????????????????????????????????????????????????????????????????
            if (capturedFeature && capturedFeature.feature.feature.properties.id === row.id) {
              regionMap.handleExitBtnClick()
            }
            // ??????????????????????????????
            mapWrapper.regionGeoOverlay.removeData(function(feature) {
              return feature['properties']['id'] === row.id
            })
            // this.regionTableData.push(regionInfo.properties)
            const tableItemIndex = this.regionTableData.findIndex(item => item.id === row.id)
            this.regionTableData.splice(tableItemIndex, 1)
          }
        })
        this.$notify({
          type: 'success',
          message: '????????????!'
        })
      }).catch(() => {
        this.$notify({
          type: 'info',
          message: '???????????????'
        })
      })
    },
    selectDeleteOption(type) {
      this.selectDeleteData = type.map(item => {
        return item.id
      })
    },
    todeleteAllData() {
      if (this.regionTableDataPage.length >= 1) {
        this.$confirm(this.$t('baseData.deleteTipAll'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          var deleteList = []
          console.log(this.regionTableDataPage, '???????????????????????????')
          console.log(this.regionTableData, '???????????????????????????')
          this.regionTableData.map(item => {
            if (item.type !== 0) deleteList.push(item.id)
          })
          delRegionRecord(deleteList).then(res => {
            if (res.data.code === 1) {
              for (const item of deleteList) this._removeFromCheckedRegionKeys(item)
              // ?????????
              this.refreshRegionTree()
              const regionMap = this.$refs.refRegionMap
              const mapWrapper = regionMap.map.mapWrapper
              const drawCmp = regionMap.map.mapWrapper.controls.draw
              const capturedFeature = drawCmp._capturedItem
              // ?????????????????????????????????????????????????????????????????????
              if (capturedFeature && deleteList.includes(capturedFeature.feature.feature.properties.id)) {
                regionMap.handleExitBtnClick()
              }
              // ??????????????????????????????
              // this.regionTableData.push(regionInfo.properties)
              deleteList.map(itemData => {
                mapWrapper.regionGeoOverlay.removeData(function(feature) {
                  return feature['properties']['id'] === itemData
                })
                const tableItemIndex = this.regionTableData.findIndex(item => item.id === itemData)
                this.regionTableData.splice(tableItemIndex, 1)
              })
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.deleteSuccess'),
                type: 'success',
                duration: 2000
              })
            }
          })
        })
      } else {
        this.$notify({
          title: this.$t('common.error'),
          message: this.$t('baseData.chooseRoadFirst'),
          type: 'error',
          duration: 2000
        })
      }
    },
    todeleteData(row) {
      if (this.selectDeleteData.length > 0) {
        this.$confirm(this.$t('baseData.deleteTipAll'), {
          confirmButtonText: this.$t('common.confirm'),
          cancelButtonText: this.$t('common.cancel'),
          type: 'warning'
        }).then(() => {
          delRegionRecord(this.selectDeleteData).then(res => {
            if (res.data.code === 1) {
              for (const item of this.selectDeleteData) this._removeFromCheckedRegionKeys(item)
              // ?????????
              this.refreshRegionTree()
              const regionMap = this.$refs.refRegionMap
              const mapWrapper = regionMap.map.mapWrapper
              const drawCmp = regionMap.map.mapWrapper.controls.draw
              const capturedFeature = drawCmp._capturedItem
              // ?????????????????????????????????????????????????????????????????????
              if (capturedFeature && this.selectDeleteData.includes(capturedFeature.feature.feature.properties.id)) {
                regionMap.handleExitBtnClick()
              }
              // ??????????????????????????????
              // this.regionTableData.push(regionInfo.properties)
              this.selectDeleteData.map(itemData => {
                mapWrapper.regionGeoOverlay.removeData(function(feature) {
                  return feature['properties']['id'] === itemData
                })
                const tableItemIndex = this.regionTableData.findIndex(item => item.id === itemData)
                this.regionTableData.splice(tableItemIndex, 1)
              })
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.deleteSuccess'),
                type: 'success',
                duration: 2000
              })
            }
          })
        })
      } else {
        this.$notify({
          title: this.$t('common.error'),
          message: this.$t('baseData.chooseRoadFirst'),
          type: 'error',
          duration: 2000
        })
      }
    },
    handleChange(file, fileList) {
      this.fileList = fileList
    },
    handleRegionTableEdit(row) {
      this.regionEditVisible = true
      this.$nextTick(() => {
        this.$refs.regionPropertyForm.regionForm = row
      })
    },
    handleRegionTableEditSubmit() {
      const regionPropertyCmp = this.$refs.regionPropertyForm
      const regionEditForm = regionPropertyCmp.$refs.regionEditForm
      regionEditForm.validate(valid => {
        if (valid) {
          const regionFormData = regionPropertyCmp.regionForm
          this.saveRegion({
            id: regionFormData.id,
            params: regionFormData,
            success: () => {
              this.$notify({
                title: this.$t('common.success'),
                message: this.$t('common.updateSuccess'),
                type: 'success',
                duration: 2000
              })
              // ??????????????????????????????
              const mapWrapper = this.$refs.refRegionMap.map.mapWrapper
              const features = mapWrapper.regionGeoOverlay.getData().features
              let geoData
              for (const feature of features) {
                if (feature.properties.id === regionFormData.id) {
                  geoData = feature
                  break
                }
              }
              mapWrapper.regionGeoOverlay.removeData(feature => feature['properties']['id'] === regionFormData.id)
              if (geoData) {
                const regionStyleFormData = {
                  lineColor: regionFormData.lineColor,
                  fillColor: regionFormData.fillColor,
                  opacity: regionFormData.opacity,
                  lineWidth: regionFormData.lineWidth
                }
                geoData.properties = {
                  ...geoData.properties,
                  ...regionStyleFormData,
                  ...getGeoStyle(regionStyleFormData)
                }
                mapWrapper.regionGeoOverlay.addData(geoData)
              }
              // ????????????????????????????????????Tree
              if (regionFormData.type !== 0) {
                this.refreshRegionTree()
              }
              this.regionEditVisible = false
            }
          })
        }
      })
    },
    refreshRegionTree() {
      this.getRegionTree({
        beforeRequest: () => {
          this.dataRegionLoading = true
        },
        success: () => {
          this.dataRegionLoading = false
        }
      })
    },
    _addCheckedRegionKeys(key) {
      const keyIndex = this.checkedRegionKeys.indexOf(key)
      if (keyIndex !== -1) return
      this.checkedRegionKeys.push(key)
    },
    _removeFromCheckedRegionKeys(key) {
      const keyIndex = this.checkedRegionKeys.indexOf(key)
      if (keyIndex !== -1) {
        this.checkedRegionKeys.splice(keyIndex, 1)
      }
    },
    /**
    * ??????????????????????????????
    **/
    expandNodePath(nodeKey) {
      const path = []
      this._getNodePath(nodeKey, path)
      if (path.length > 0) {
        this.expandedRegionKeys = Array.from(new Set(this.expandedRegionKeys.concat(path)))
      }
    },
    /**
    * ???????????????????????????
    **/
    _getNodePath(nodeKey, path) {
      const nodesMap = this.$refs.regionTree.store.nodesMap
      const treeNode = nodesMap[nodeKey]
      if (treeNode.level > 1) {
        const parentNodeKey = treeNode.parent.data.id
        path.push(parentNodeKey)
        this._getNodePath(parentNodeKey, path)
      }
    },
    /**
     * ?????????????????????????????????????????????
     * @private
     */
    _refreshCheckedNAAStatus() {
      for (let i = 0; i < this.checkedRegionKeys.length; i++) {
        const key = this.checkedRegionKeys[i]
        if (typeof key === 'string' && key.startsWith('temp_')) {
          // ????????????????????????????????????????????????????????????
          if (!this.dataRegionTreeFlatten[key] || this.dataRegionTreeFlatten[key].children.length === 0) {
            this.checkedRegionKeys.splice(i, 1)
          }
        }
      }
    },
    /**
     * ????????????????????????
     * @param regionId
     * @private
     */
    _cancelRegionInfoRequest(regionId) {
      if (this.requests[regionId]) {
        this.requests[regionId].req.then(reqList => {
          for (const req of reqList) {
            req.cancel && req.cancel()
          }
        })
        this.requests[regionId].loading.destroy()
        delete this.requests[regionId]
      }
    }
  }
}
