// pages/user/user.js
Page({
  data: {
    // 取餐相关
    showPickup: true,
    pickupCode: '',
    pickupResult: null,
    
    // 寄件相关
    showSend: false,
    senderName: '',
    senderPhone: '',
    receiverName: '',
    receiverPhone: '',
    expressTypeIndex: 0,
    expressTypes: ['顺丰速运', '中通快递', '申通快递', '韵达快递', '圆通快递'],
    // 快递大小件选项
    packageSizeOptions: [
      { value: 'small', label: '小件', desc: '文件、小包裹', icon: '📄' },
      { value: 'medium', label: '中件', desc: '一般包裹', icon: '📦' },
      { value: 'large', label: '大件', desc: '大件物品', icon: '📦' }
    ],
    selectedPackageSize: 'medium',
    sendResult: null,
    
    // 柜子状态
    lockerStatus: Array(16).fill().map((_, index) => ({
      status: index % 4 === 0 ? 'occupied' : 'available'
    }))
  },

  onLoad(options) {
    // 页面加载时执行
    console.log('用户端加载');
  },

  // 显示取餐服务
  showPickupSection() {
    this.setData({
      showPickup: true,
      showSend: false
    });
  },

  // 显示寄件服务
  showSendSection() {
    this.setData({
      showPickup: false,
      showSend: true
    });
  },

  // 取餐码输入
  onPickupCodeInput(e) {
    this.setData({
      pickupCode: e.detail.value
    });
  },

  // 寄件人姓名输入
  onSenderNameInput(e) {
    this.setData({
      senderName: e.detail.value
    });
  },

  // 寄件人电话输入
  onSenderPhoneInput(e) {
    this.setData({
      senderPhone: e.detail.value
    });
  },

  // 收件人姓名输入
  onReceiverNameInput(e) {
    this.setData({
      receiverName: e.detail.value
    });
  },

  // 收件人电话输入
  onReceiverPhoneInput(e) {
    this.setData({
      receiverPhone: e.detail.value
    });
  },

  // 快递类型选择
  onExpressTypeChange(e) {
    this.setData({
      expressTypeIndex: e.detail.value
    });
  },

  // 快递大小件选择
  selectPackageSize(e) {
    const size = e.currentTarget.dataset.value;
    this.setData({
      selectedPackageSize: size
    });
  },

  // 确认取餐
  pickupFood() {
    const { pickupCode } = this.data;
    
    if (!pickupCode) {
      this.setData({
        pickupResult: {
          type: 'error',
          message: '请输入取餐码'
        }
      });
      return;
    }

    // 模拟取餐验证
    setTimeout(() => {
      if (pickupCode.length === 6) {
        this.setData({
          pickupResult: {
            type: 'success',
            message: '取餐成功！柜子已打开，请取出您的餐品'
          }
        });
      } else {
        this.setData({
          pickupResult: {
            type: 'error',
            message: '取餐码错误，请重新输入'
          }
        });
      }
    }, 1000);
  },

  // 确认寄件
  sendParcel() {
    const { senderName, senderPhone, receiverName, receiverPhone, selectedPackageSize, packageSizeOptions } = this.data;
    
    // 验证输入
    if (!senderName || !senderPhone || !receiverName || !receiverPhone) {
      this.setData({
        sendResult: {
          type: 'error',
          message: '请填写完整的寄件信息'
        }
      });
      return;
    }

    // 获取选中的快递大小标签
    const selectedSizeLabel = packageSizeOptions.find(option => option.value === selectedPackageSize).label;

    // 模拟寄件验证
    setTimeout(() => {
      this.setData({
        sendResult: {
          type: 'success',
          message: '寄件成功！柜子已打开，请放入您的包裹',
          packageSize: selectedSizeLabel
        }
      });
    }, 1000);
  }
})