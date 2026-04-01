// rider-store.js
Page({
  data: {
    cabinetInfo: {
      name: '测试柜',
      address: '测试站点'
    },
    userPhone: '',
    errorMessage: '',
    loading: false
  },
  
  onLoad() {
    // 页面加载时执行
    console.log('骑手存件页面加载');
    
    // 可以从全局数据中获取柜机信息
    const app = getApp();
    if (app.globalData.currentCabinet) {
      this.setData({
        cabinetInfo: {
          name: app.globalData.currentCabinet.name,
          address: app.globalData.currentCabinet.address
        }
      });
    }
  },
  
  onPhoneInput(e) {
    // 手机号输入处理
    const phone = e.detail.value;
    this.setData({
      userPhone: phone,
      errorMessage: ''
    });
  },
  
  onStoreFood() {
    // 存件按钮点击事件
    const { userPhone } = this.data;
    
    // 验证手机号
    if (!userPhone || userPhone.length !== 4) {
      this.setData({
        errorMessage: '请输入正确的手机号后4位'
      });
      return;
    }
    
    this.setData({
      loading: true,
      errorMessage: ''
    });
    
    // 调用存件API
    const app = getApp();
    app.request('/store-food', {
      method: 'POST',
      data: {
        cabinetId: '53034431609',
        userPhone: `1380000${userPhone}`,
        deliveryPhone: '13800000000'
      }
    }).then(res => {
      console.log('存件成功:', res);
      this.setData({ loading: false });
      
      if (res.success) {
        wx.showModal({
          title: '存件成功',
          content: `取餐码: ${res.data.order.取餐码}`,
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              // 可以重置表单
              this.setData({ userPhone: '' });
            }
          }.bind(this)
        });
      } else {
        wx.showModal({
          title: '存件失败',
          content: res.message || '操作失败，请重试',
          showCancel: false
        });
      }
    }).catch(error => {
      console.error('存件失败:', error);
      this.setData({ loading: false });
      wx.showModal({
        title: '网络错误',
        content: '网络连接失败，请稍后重试',
        showCancel: false
      });
    });
  }
});