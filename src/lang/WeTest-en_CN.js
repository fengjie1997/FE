export default {
  /**
   * wetest基础表格表头字段定义
   */
  WeTestTableHead: {
    /**
     * 业务、任务
     */
    creator: 'creator',
    updator: 'updator',
    distributor: 'distributor', // taskPlan的creator
    distributeDt: 'distributeDt', // taskPlan的createDt
    createDt: 'createDt',
    startDt: 'startDt',
    endDt: 'endDt',
    eventDt: 'eventDt',
    updateDt: 'updateDt',
    remainDt: 'remainDt',
    businessName: 'businessName',
    businessId: 'businessId',
    jobName: 'jobName', // 为区别taskName类名(即时通讯)
    jobId: 'jobId',
    noUpdate: '无更新记录',
    isRetrieved: '是否下发',
    task: '业务类型', // 第一级(例如：即时通讯)
    taskName: '测试业务', // 第二级(例如：微信)
    status: '任务状态',
    /**
     * 设备
     */
    deviceModel: '设备类型',
    groupId: '设备分组',
    uuid: 'UUID',
    deviceId: '设备ID',
    kernelVersion: '内核版本',
    manufacturer: '生产商',
    osVersion: '系统版本',
    appVersion: 'App版本',
    /**
     * license(appType字段查看数据模块)
     */
    licenseId: 'licenseId',
    isDisable: '是否禁用',
    license: 'license码',
    remain: '剩余可绑数',
    total: '可绑总数',
    type: 'license类型'

  },
  /**
   * wetest按钮定义
   */
  WeTestButton: {
    /**
     * 公共按钮
     */
    confirm: '确认',
    cancel: '取消',
    edit: '编辑',
    delete: '删除',
    search: '搜索',
    /**
     * 任务
     */
    createTask: '新建任务',
    addBusiness: '添加业务',
    seeBusiness: '查看业务',
    businessDetail: '业务详情',
    seeIssue: '查看下发'

  },
  weTest: {
    selectHistoryTask: '查看历史下发',
    businessName: '业务名称',
    testNumber: '测试次数',
    createTime: '创建时间',
    creator: '创建者',
    updator: '更新者',
    businessSet: '',
    ipConfig: '域名/IP配置',
    businessType: '测试业务',
    businessId: '业务ID',
    taskName: 'Task Name',
    taskId: '任务ID',
    taskState: '任务状态',
    taskAssignment: '下发任务',
    setTask: '新建任务',
    addDevice: '新增设备',
    editTask: '编辑任务',
    searchBusiness: '查看业务',
    searchParameter: '查看参数',
    selectBusiness: '选择业务',
    appName: 'App名',
    appType: 'App类型',
    eventTime: '测试时间',
    updateDt: '更新时间',
    startDt: '开始时间',
    endDt: '截止时间',
    id: 'ID',
    history: '历史下发',
    license: 'license',
    licenseType: 'license类型',
    remain: '剩余可绑数',
    licenseTotal: 'license可绑设备总数',
    isDisable: '是否禁用',
    editLicense: '编辑license',
    createLicense: '新建license',
    updateLicense: '修改license',
    expandLicense: '延长license',
    bind: '绑定',
    bindSuccess: '绑定成功'
  },
  business: {
    ping: 'PING',
    ftp: 'Multi_FTP',
    tcp: 'TCP',
    udp: 'UDP',
    pbm: 'PBM',
    httpWeb: 'HttpWeb',
    weChat: '微信',
    skype: 'Skype',
    call: '普通通话',
    douyin: '抖音',
    taobao: '淘宝',
    wechatPay: '微信支付',
    alipay: '支付宝',
    game: '王者荣耀',
    jd: '京东',
    todayNews: '今日头条',
    xinlang: '新浪视频',
    souhu: '搜狐视频',
    tenxun: '腾讯视频',
    youku: '优酷视频',
    douyinvideo: '抖音视频',
    customvideo: '自定义视频'
  },
  /**
   * WeTest参数配置
   */
  parameter: {
    select: '测试参数选择',
    testTimes: '测试次数',
    refreshTimes: '动作执行次数',
    selectAction: '选择动作',
    clearCacheTimes: '删除缓存间隔次数',
    sendFileTimeout: '发送文件超时时长',
    testIntervalS: '间隔时长(s)',
    testDuration: '测试时长(s)',
    ip: '域名/IP',
    pkgSize: '发送包大小(bytes)',
    pkgPeriod: '发送包周期(s)',
    sendPkgNum: '发送包个数',
    duration: '时长',
    testType: '测试类型',
    pingTest: 'PING测试',
    pingServer: 'PING服务器',
    port: '端口',
    account: '登录账号',
    password: '登录密码',
    downloadFile: '下载文件',
    uploadPath: '上传路径',
    threadNum: '线程数量',
    bandwidth: '发送带宽(Mbps)',
    timeOut: '超时时间(s)',
    url: 'URL地址',
    friendName: '好友名称',
    sendTxt: '发送文本',
    imageSize: '发送图片大小(M)',
    voiceSize: '发送语音时长(s)',
    videoSize: '发送视频时长(s)',
    videoFile: '发送视频文件',
    sendVideoFileSelect: '是否发送视频文件',
    callingOrCalled: '主叫/被叫',
    payAmount: '支付金额',
    payPassword: '支付密码',
    playSecondS: '播放时长',
    videoQuality: '视频质量',
    videoUrl: 'URL地址',
    noFlowTimeoutS: '无流量超时',
    bufferMaxTimes: '最大卡顿次数',
    bufferMaxTimeX: '最大卡顿时长'
  },
  weTestResult: {
    /**
     * 主页面信息
     */
    app_name: '软件名称',
    unique_id: 'UUID',
    version: '软件版本号',
    tele_num: '手机号',
    mobile_type: '终端类型',
    plan_id: '测试计划ID',
    start_time: '开始时间',
    end_time: '结束时间',
    event_time: '测试时间',
    result_id: '数据ID',
    result_type: '数据类型',
    task: '测试类型',
    task_id: '业务ID',
    task_name: '业务名',
    /**
     * ott基础业务
     */
    app_version: '第三方APP版本号',
    start_app_delay: '启动APP时延',
    send_text_delay: '发送APP时延',
    send_text_result: '发送消息结果',
    send_text_jitter_upload: '发送消息上行抖动值',
    send_text_jitter_download: '发送消息下行抖动值',
    send_text_pkg_count_upload: '发送消息上行包个数',
    send_text_pkg_count_download: '发送消息下行包个数',
    send_text_pkg_interval_upload: '发送消息上行包间隔',
    send_text_pkg_interval_download: '发送消息下行包间隔',
    send_img_delay: '发送图片时延',
    send_img_result: '发送图片结果',
    send_img_jitter_upload: '发送图片上行抖动值',
    send_img_jitter_download: '发送图片下行抖动值',
    send_img_pkg_count_upload:	'发送图片上行包个数',
    send_img_pkg_count_download: '发送图片下行包个数',
    send_img_pkg_interval_upload: '发送图片上行包个数',
    send_img_pkg_interval_download: '发送图片下行包个数',
    send_voice_delay: '发送语音时延',
    send_voice_result: '发送语音结果',
    send_voice_jitter_upload: '发送语音上行抖动值',
    send_voice_jitter_download: '发送语音下行抖动值',
    send_voice_pkg_count_upload: '发送语音上行包个数',
    send_voice_pkg_count_download: '发送语音下行包个数',
    send_voice_pkg_interval_upload: '发送语音上行包间隔',
    send_voice_pkg_interval_download: '发送语音下行包间隔',
    send_video_delay: '发送视频时延',
    send_video_result: '发送视频结果',
    send_video_jitter_upload: '发送视频上行抖动值',
    send_video_jitter_download: '发送视频下行抖动值',
    send_video_pkg_count_upload: '发送视频上行包个数',
    send_video_pkg_count_download: '发送视频下行包个数',
    send_video_pkg_interval_upload: '发送视频上行包间隔',
    send_video_pkg_interval_download: '发送视频下行包间隔',
    browse_friends_circle_img_delay: '浏览朋友圈图片时延',
    browse_friends_circle_img_result: '浏览朋友圈图片结果',
    browse_friends_circle_img_jitter_upload: '浏览朋友圈图片上行抖动值',
    browse_friends_circle_img_jitter_download: '浏览朋友圈图片下行抖动值',
    browse_friends_circle_img_pkg_count_upload: '浏览朋友圈图片上行包个数',
    browse_friends_circle_img_pkg_count_download: '浏览朋友圈图片下行包个数',
    browse_friends_circle_img_pkg_interval_upload: '浏览朋友圈图片上行包间隔',
    browse_friends_circle_img_pkg_interval_download: '浏览朋友圈图片下行包间隔',
    failed_reason_code: '失败原因码',
    failed_reason: '失败原因描述',
    /**
     * 网络信息后缀
     */
    province: '省份',
    city: '城市',
    address: '详细地址',
    latitude: '纬度',
    longitude: '经度',
    source: '定位来源',
    network_type_id: '网络类型ID',
    network_name: '网络类型名',
    operator_id: '运营商ID',
    operator: '运营商标识',
    internal_ip: '内网IP',
    external_ip: '外网IP',
    wlan_ssid: 'WLAN_SSID',
    wlan_rssi: 'WLAN_RSSI',
    gsm_lac: 'GSM_LAC',
    gsm_cid: 'GSM_CID',
    gsm_rxqual: 'GSM_RXQUAL',
    cdma_strength: '场强',
    cdma_nid: 'NID',
    cdma_bsid: 'BSID',
    cdma_sid: 'SID',
    evdo_snr: 'SNR',
    evdo_ecio: 'ECIO',
    evdo_rssi: 'RSSI',
    tdscdma_dbm: 'DBM',
    tdscdma_rscp: 'RSCP',
    lte_rsrp: 'RSRP',
    lte_rsrq: 'RSRQ',
    lte_ci:	'LTE_CI',
    lte_pci: 'LTE_PCI',
    lte_tac: 'LTE_TAC',
    lte_snr: 'LTE_SNR',
    /**
     * 浏览类APP访问（京东、淘宝、今日头条）：
     */
    appVersion: '第三方APP版本号',
    first_page_delay: '首页打开时延',
    first_page_jitter_upload: '首页打开上行抖动值',
    first_page_jitter_download: '首页打开下行抖动值',
    first_page_pkg_count_upload: '首页打开上行包个数',
    first_page_pkg_count_download: '首页打开下行包个数',
    first_page_pkg_interval_upload: '首页打开上行包间隔',
    first_page_pkg_interval_download: '首页打开下行包间隔',
    second_page_delay: '首页打开时延',
    second_page_jitter_upload: '频道打开上行抖动值',
    second_page_jitter_download: '频道打开下行抖动值',
    second_page_pkg_count_upload: '频道打开上行包个数',
    second_page_pkg_count_download: '频道打开下行包个数',
    second_page_pkg_interval_upload: '频道打开上行包间隔',
    second_page_pkg_interval_download: '频道打开下行包间隔',
    /**
     * 抖音
     */
    imei: 'IMEI',
    start_connection_server_delay: '第三方APP版本号',
    start_connection_server_jitter_upload: '连接服务上行抖动值',
    start_connection_server_jitter_download: '连接服务下行抖动值',
    start_connection_server_pkg_count_upload: '连接服务上行包个数',
    start_connection_server_pkg_count_download: '连接服务下行包个数',
    start_connection_server_pkg_interval_upload: '连接服务上行包间隔',
    start_connection_server_pkg_interval_download: '连接服务下行包间隔',
    video_play_all_delay: '视频播放总时延',
    play_upload_min_rate: '视频播放上行最小速率',
    play_upload_max_rate: '视频播放上行最大速率',
    play_upload_avg_rate: '视频播放上行平均速率',
    play_download_min_rate: '视频播放下行最小速率',
    play_download_max_rate: '视频播放下行最大速率',
    play_download_avg_rate: '视频播放下行平均速率',
    play_jitter_upload: '视频播放上行抖动值',
    play_jitter_download: '视频播放下行抖动值',
    /**
     * 游戏类（王者荣耀）：
     */
    first_page_all_delay: '首页打开上行抖动值',
    first_page_upload_byte: '首页打开上行字节数',
    first_page_download_byte: '首页打开下行字节数',
    upload_all_byte: '上行总字节数',
    download_all_byte: '下行总字节数',
    upload_all_pkgs: '上行总包数',
    download_all_pkgs: '下行总包数',
    ip_max_vitality_count: 'IP最大活跃个数',
    max_vitality_ip: '最大活跃IP',
    ip_min_vitality_count: 'IP最小活跃个数',
    min_vitality_ip: '最小活跃IP',

    /**
     * HTTP网页浏览：
     */
    video_portal: '视频门户',
    video_title: '视频标题',
    video_url: '视频地址',
    video_parse_url: '视频解析地址',
    video_ip: '视频服务器IP地址',
    video_quality: '视频品质',
    dns_delay: 'DNS解析时延/ms',
    reproduction_delay: '播放开始时延/ms',
    avg_speed: '平均速率/kbps',
    max_speed: '峰值速率/kbps',
    rebuffer_count: '重缓冲次数',
    rebuffer_total_delay: '重缓冲总时延/ms',
    rtt: '往返时延/ms',
    tcp_shake_delay: 'TCP握手时延',
    video_server_loc: '视频服务器地址及运营商',
    play_bitrate: '播放比特率/bps',
    total_bitrate: '总比特率/bps',
    video_width: '视频宽度',
    video_height: '视频高度',
    video_duration: '视频长度/ms',
    max_single_rebuffer_delay: '最大单次缓冲时延/ms',
    receive_latency: '数据接收时长/ms',
    stalling_ratio: '卡顿比',
    play_duration: '播放时长/ms',
    request_result: '请求结果（1表示请求成功）',
    play_result: '播放结果（1表示播放成功）',
    play_failed_reason_code: '播放失败原因码',
    play_failed_reason: '播放失败原因',

    /**
     * HTTP网页浏览：
     */
    website_name: '门户网站名称',
    web_url: '浏览页面地址',
    web_server_ip: '主页IP地址',
    connect_delay: '连接时延/ms',
    request_delay: '请求时延/ms',
    first_pkg_delay: '首包时延/ms',
    first_screen_delay: '首屏时延/ms',
    full_page_load_delay: '整页加载时延/ms',
    full_page_download_avg_rate: '下载平均速率',

    /**
     * FIR下载
     */
    download_file_name: '下载文件名',
    download_file_url: '文件地址',
    download_dns_delay: 'DNS时延/ms',
    download_file_ip: '文件服务器IP地址',
    download_avg_speed: '平均速率/Mbps',
    download_max_speed: '峰值速率/Mbps',

    /**
     * FTP上传
     */
    upload_server_name: '上传服务器名',
    upload_server_url: '上传服务器地址',
    upload_dns_delay: 'DNS时延/ms',
    upload_file_ip: '上传文件服务器IP地址',
    upload_avg_speed: '平均速率/Mbps',
    upload_max_speed: '峰值速率/Mbps',

    /**
     * OTT普通通话
     */
    task_duration: '业务时长（测试时长）',
    call_type: '拨打类型',
    called_tele_num: '被叫号码',
    call_start_time: '开始时间（业务启动时间）',
    call_connect_time: '接通时间（拨打开始时间）',
    call_end_time: '结束时间（拨打结束时间）',
    call_result: '通话结果',

    /**
     * PBM业务
     */
    up_bandwidth_avg: '上行带宽(平均)/bps',
    up_bandwidth_max: '上行带宽(最大)/bps',
    up_bandwidth_min: '上行带宽(最小)/bps',
    up_delay: '上行时延/ms',
    up_pkgs: '上行包数',
    up_loss_pkgs: '上行丢包数',
    up_loss_pkg_rate: '上行丢包率(已经*100)',
    down_bandwidth_avg: '下行带宽(平均)/bps',

    /**
     * PING业务：
     */
    url: '测试URL',
    pkg_size: '发送包大小',
    try_times: '尝试次数',
    pkg_loss_rate: '丢包率',
    avg_delay: '平均时延',
    jitter: '抖动',

    /**
     * 扫码支付（支付宝、微信支付）：
     */
    scan_delay: '扫码时延',
    scan_result: '扫码结果',
    scan_jitter_upload: '扫码上行抖动值',
    scan_jitter_download: '扫码下行抖动值',
    scan_pkg_count_upload: '扫码上行包个数',
    scan_pkg_count_download: '扫码下行包个数',
    scan_pkg_interval_upload: '扫码上行包间隔',
    scan_pkg_interval_download: '扫码下行包间隔',
    payment_delay: '支付时延',	payment_result: '支付结果',
    payment_jitter_upload: '支付上行抖动值',
    payment_jitter_download: '支付下行抖动值',
    payment_pkg_count_upload: '支付上行包个数',
    payment_pkg_count_download: '支付下行包个数',
    payment_pkg_interval_upload: '支付上行包间隔',
    payment_pkg_interval_download: '支付下行包间隔',
    /**
     * OTT语音通话（微信通话、Skype通话）：
     */
    audio_call_connect_delay: '接通时延',
    audio_call_connect_jitter_upload: '接通上行抖动值',
    audio_call_connect_jitter_download: '接通下行抖动值',
    audio_call_connect_pkg_count_upload: '接通上行包个数',
    audio_call_connect_pkg_count_download: '接通下行包个数',
    audio_call_connect_pkg_interval_upload: '接通上行包间隔',
    audio_call_connect_pkg_interval_download: '接通下行包间隔',
    audio_call_upload_all_byte: '通话上行总字节数',
    audio_call_upload_all_pkgs: '通话上行总包数',
    audio_call_upload_min_rate: '通话上行最小速率',
    audio_call_upload_max_rate: '通话上行最大速率',
    audio_call_upload_avg_rate: '通话上行平均速率',
    audio_call_download_all_byte: '通话下行总字节数',
    audio_call_download_all_pkgs: '通话下行总包数',
    audio_call_download_min_rate: '通话下行最小速率',
    audio_call_download_max_rate: '通话下行最大速率',
    audio_call_download_avg_rate: '通话下行平均速率',
    audio_call_jitter_upload: '通话上行抖动值',
    audio_call_jitter_download: '通话下行抖动值',
    audio_mos: '语音mos值'
  }
}
