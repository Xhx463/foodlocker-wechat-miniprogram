// customer-fetch.js
Page({
  data: {
    codeArray: ['', '', '', ''],
    focusIndex: 0,
    errorMessage: '',
    loading: false
  },
  
  onLoad() {
    // 页面加载时执行
    console.log('顾客取件页面加载');
  },
  
  onCodeInput(e) {
    // 取餐码输入处理
    const index = parseInt(e.currentTarget.dataset.index);
    const value = e.detail.value;
    
    if (value) {
      // 输入值后自动跳转到下一个输入框
      const codeArray = this.data.codeArray;
      codeArray[index] = value;
      
      this.setData({
        codeArray: codeArray,
        errorMessage: ''
      });
      
      // 自动跳转到下一个输入框
      if (index < 3) {
        this.setData({
          focusIndex: index + 1
        });
      } else {
        // 全部输入完成，自动执行取件
        this.onFetchFood();
      }
    }
  },
  
  onFetchFood() {
    // 取件按钮点击事件
    const { codeArray } = this.data;
    const accessCode = codeArray.join('');
    
    // 验证取餐码
    if (accessCode.length !== 4) {
      this.setData({
        errorMessage: '请输入完整的4位取餐码'
      });
      return;
    }
    
    this.setData({
      loading: true,
      errorMessage: ''
    });
    
    // 调用取餐API
    const app = getApp();
    app.request('/fetch-food', {
      method: 'POST',
      data: {
        accessCode: accessCode
      }
    }).then(res => {
      console.log('取餐成功:', res);
      this.setData({ loading: false });
      
      if (res.success) {
        wx.showModal({
          title: '取餐成功',
          content: '请取走您的餐品',
          showCancel: false,
          success: function(res) {
            if (res.confirm) {
              // 清空输入
              this.setData({
                codeArray: ['', '', '', ''],
                focusIndex: 0
              });
            }
          }.bind(this)
        });
      } else {
        wx.showModal({
          title: '取餐失败',
          content: res.message || '取餐码错误，请重试',
          showCancel: false
        });
      }
    }).catch(error => {
      console.error('取餐失败:', error);
      this.setData({ loading: false });
      wx.showModal({
        title: '网络错误',
        content: '网络连接失败，请稍后重试',
        showCancel: false
      });
    });
  },
  
  contactRider() {
    // 联系骑手
    wx.showModal({
      title: '联系骑手',
      content: '联系骑手功能开发中...',
      showCancel: false
    });
  },
  
  contactService() {
    // 联系客服
    wx.showModal({
      title: '联系客服',
      content: '客服电话：2222222222',
      showCancel: false
    });
  }
});