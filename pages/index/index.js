// pages/index/index.js
Page({
  data: {
    // 系统状态数据
    totalLockers: 24,
    availableLockers: 8,
    occupiedLockers: 16,
    usageRate: 67,
    // 格口大小统计
    smallLockers: 8,
    mediumLockers: 8,
    largeLockers: 8
  },

  onLoad(options) {
    // 页面加载时执行
    console.log('首页加载');
    this.updateSystemStatus();
  },

  onShow() {
    // 页面显示时执行
  },

  // 导航到用户端
  navigateToUser() {
    wx.navigateTo({
      url: '../user/user'
    });
  },

  // 导航到骑手端
  navigateToRider() {
    wx.navigateTo({
      url: '../rider/rider'
    });
  },

  // 导航到快递小哥端
  navigateToCourier() {
    wx.navigateTo({
      url: '../courier/courier'
    });
  },

  // 导航到商家管理端
  navigateToMerchant() {
    wx.navigateTo({
      url: '../merchant/merchant'
    });
  },

  // 更新系统状态
  updateSystemStatus() {
    // 模拟从服务器获取最新状态
    console.log('更新系统状态');
    // 这里可以添加实际的数据获取逻辑
  },

  // 获取系统状态
  getSystemStatus() {
    // 获取系统状态
    console.log('获取系统状态');
    wx.showToast({
      title: '系统运行正常',
      icon: 'success',
      duration: 1500
    });
  }
})