// operation.js
Page({
  data: {
    stats: {
      totalCabinets: 0,
      occupiedLattices: 0,
      todayOrders: 0,
      totalOrders: 0
    },
    recentOrders: [],
    loading: false
  },
  
  onLoad() {
    // 页面加载时执行
    console.log('运营管理页面加载');
    this.loadStats();
    this.loadRecentOrders();
  },
  
  onShow() {
    // 页面显示时执行
    this.loadStats();
    this.loadRecentOrders();
  },
  
  loadStats() {
    // 加载统计数据
    this.setData({ loading: true });
    
    // 模拟数据，实际应该从API获取
    setTimeout(() => {
      this.setData({
        stats: {
          totalCabinets: 10,
          occupiedLattices: 25,
          todayOrders: 128,
          totalOrders: 3456
        },
        loading: false
      });
    }, 500);
  },
  
  loadRecentOrders() {
    // 加载最近订单
    const app = getApp();
    app.request('/orders', {
      method: 'GET'
    }).then(res => {
      if (res.success && res.data) {
        this.setData({
          recentOrders: res.data.slice(0, 5)
        });
      }
    }).catch(error => {
      console.error('加载订单失败:', error);
      // 使用模拟数据
      this.setData({
        recentOrders: [
          {
            id: 'test-order-123',
            status: '已完成',
            accessCode: '1234',
            userPhone: '138****1234',
            createTime: new Date().toLocaleString()
          },
          {
            id: 'test-order-124',
            status: '未取件',
            accessCode: '5678',
            userPhone: '139****5678',
            createTime: new Date().toLocaleString()
          }
        ]
      });
    });
  },
  
  goToLatticeVisual() {
    // 跳转到格口可视化页面
    wx.navigateTo({
      url: '/pages/lattice-visual/lattice-visual'
    });
  },
  
  remoteOpenDoor() {
    // 远程开门
    wx.showModal({
      title: '远程开门',
      content: '请输入格口ID',
      inputPlaceholder: '例如: 1',
      success: (res) => {
        if (res.confirm && res.content) {
          const latticeId = parseInt(res.content);
          this.setData({ loading: true });
          
          const app = getApp();
          app.request('/remote-open-door', {
            method: 'POST',
            data: { latticeId: latticeId }
          }).then(res => {
            this.setData({ loading: false });
            if (res.success) {
              wx.showToast({
                title: '开门成功',
                icon: 'success'
              });
            } else {
              wx.showToast({
                title: '开门失败',
                icon: 'error'
              });
            }
          }).catch(error => {
            this.setData({ loading: false });
            wx.showToast({
              title: '网络错误',
              icon: 'error'
            });
          });
        }
      }
    });
  },
  
  lockLattice() {
    // 锁定格口
    wx.showModal({
      title: '锁定格口',
      content: '请输入格口ID',
      inputPlaceholder: '例如: 1',
      success: (res) => {
        if (res.confirm && res.content) {
          const latticeId = parseInt(res.content);
          this.setData({ loading: true });
          
          const app = getApp();
          app.request('/lock-lattice', {
            method: 'POST',
            data: { latticeId: latticeId }
          }).then(res => {
            this.setData({ loading: false });
            if (res.success) {
              wx.showToast({
                title: '锁定成功',
                icon: 'success'
              });
            } else {
              wx.showToast({
                title: '锁定失败',
                icon: 'error'
              });
            }
          }).catch(error => {
            this.setData({ loading: false });
            wx.showToast({
              title: '网络错误',
              icon: 'error'
            });
          });
        }
      }
    });
  },
  
  clearLatticeStatus() {
    // 清理格口状态
    wx.showModal({
      title: '清理格口状态',
      content: '请输入格口ID',
      inputPlaceholder: '例如: 1',
      success: (res) => {
        if (res.confirm && res.content) {
          const latticeId = parseInt(res.content);
          this.setData({ loading: true });
          
          const app = getApp();
          app.request('/clear-lattice-status', {
            method: 'POST',
            data: { latticeId: latticeId }
          }).then(res => {
            this.setData({ loading: false });
            if (res.success) {
              wx.showToast({
                title: '清理成功',
                icon: 'success'
              });
            } else {
              wx.showToast({
                title: '清理失败',
                icon: 'error'
              });
            }
          }).catch(error => {
            this.setData({ loading: false });
            wx.showToast({
              title: '网络错误',
              icon: 'error'
            });
          });
        }
      }
    });
  }
});