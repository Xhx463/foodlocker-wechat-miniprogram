// pages/merchant/merchant.js
Page({
  data: {
    // 系统状态
    totalLockers: 24,
    availableLockers: 8,
    occupiedLockers: 16,
    usageRate: 67,
    
    // 柜子状态 - 分为大中小格口
    // 小格口(1-8): 适合外卖, 中格口(9-16): 适合一般快递, 大格口(17-24): 适合大件快递
    lockerStatus: Array(24).fill().map((_, index) => {
      let size;
      if (index < 8) {
        size = 'small'; // 小格口
      } else if (index < 16) {
        size = 'medium'; // 中格口
      } else {
        size = 'large'; // 大格口
      }
      return {
        status: index < 16 ? 'occupied' : 'available',
        temperature: index < 16 ? (index % 3 === 0 ? 'constant' : index % 3 === 1 ? 'low' : 'warm') : null,
        size: size
      };
    }),
    
    // 最近订单
    recentOrders: [
      {
        orderId: 'ORD123456',
        merchantName: '麦当劳',
        pickupCode: '123456',
        status: 'delivered',
        statusText: '已送达',
        time: '2026-02-11 12:30'
      },
      {
        orderId: 'ORD789012',
        merchantName: '肯德基',
        pickupCode: '654321',
        status: 'delivered',
        statusText: '已送达',
        time: '2026-02-11 12:15'
      },
      {
        orderId: 'ORD345678',
        merchantName: '星巴克',
        pickupCode: '789012',
        status: 'delivered',
        statusText: '已送达',
        time: '2026-02-11 12:00'
      }
    ]
  },

  onLoad(options) {
    // 页面加载时执行
    console.log('商家管理端加载');
    this.calculateSystemStatus();
  },

  // 计算系统状态
  calculateSystemStatus() {
    const { lockerStatus } = this.data;
    const total = lockerStatus.length;
    const available = lockerStatus.filter(item => item.status === 'available').length;
    const occupied = total - available;
    const usageRate = Math.round((occupied / total) * 100);
    
    this.setData({
      totalLockers: total,
      availableLockers: available,
      occupiedLockers: occupied,
      usageRate: usageRate
    });
  },

  // 点击柜子
  onLockerTap(e) {
    const index = e.currentTarget.dataset.index;
    const lockerStatus = [...this.data.lockerStatus];
    
    // 切换柜子状态
    if (lockerStatus[index].status === 'available') {
      // 从可用变为占用，随机分配一个温度
      const temperatures = ['constant', 'low', 'warm'];
      const randomTemperature = temperatures[Math.floor(Math.random() * temperatures.length)];
      lockerStatus[index].status = 'occupied';
      lockerStatus[index].temperature = randomTemperature;
      // 保留原有的size信息
    } else {
      // 从占用变为可用，清除温度信息
      lockerStatus[index].status = 'available';
      lockerStatus[index].temperature = null;
      // 保留原有的size信息
    }
    
    this.setData({ lockerStatus });
    this.calculateSystemStatus();
    
    // 显示操作结果
    const sizeText = lockerStatus[index].size === 'small' ? '小' : lockerStatus[index].size === 'medium' ? '中' : '大';
    wx.showToast({
      title: `${sizeText}格口 ${index + 1} 已更新`,
      icon: 'success',
      duration: 1500
    });
  },

  // 刷新状态
  refreshStatus() {
    // 模拟刷新操作
    wx.showLoading({ title: '刷新中...' });
    
    setTimeout(() => {
      // 随机更新一些柜子状态
      const lockerStatus = [...this.data.lockerStatus].map(item => {
        const newStatus = Math.random() > 0.2 ? item.status : (item.status === 'available' ? 'occupied' : 'available');
        
        if (newStatus === 'occupied' && item.status === 'available') {
          // 从可用变为占用，随机分配一个温度
          const temperatures = ['constant', 'low', 'warm'];
          const randomTemperature = temperatures[Math.floor(Math.random() * temperatures.length)];
          return {
            status: newStatus,
            temperature: randomTemperature,
            size: item.size // 保留格口大小
          };
        } else if (newStatus === 'available' && item.status === 'occupied') {
          // 从占用变为可用，清除温度信息
          return {
            status: newStatus,
            temperature: null,
            size: item.size // 保留格口大小
          };
        } else {
          // 状态不变，保持原有信息
          return item;
        }
      });
      
      this.setData({ lockerStatus });
      this.calculateSystemStatus();
      
      wx.hideLoading();
      wx.showToast({
        title: '状态已刷新',
        icon: 'success',
        duration: 1500
      });
    }, 1000);
  },

  // 导出数据
  exportData() {
    // 模拟导出操作
    wx.showLoading({ title: '导出中...' });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '数据导出成功',
        icon: 'success',
        duration: 1500
      });
    }, 1500);
  }
})