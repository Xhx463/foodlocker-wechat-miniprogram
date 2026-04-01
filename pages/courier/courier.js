// pages/courier/courier.js
Page({
  data: {
    // 取件相关
    showPickup: true,
    courierId: '',
    pickupResult: null,
    
    // 派件相关
    showDelivery: false,
    deliveryId: '',
    receiverName: '',
    receiverPhone: '',
    pickupCode: '',
    // 格口大小选项
    lockerSizeOptions: [
      { value: 'medium', label: '中格口', desc: '一般快递', icon: '📦' },
      { value: 'large', label: '大格口', desc: '大件快递', icon: '📦' }
    ],
    selectedLockerSize: 'medium',
    deliveryResult: null,
    
    // 柜子状态 - 快递小哥端主要使用中格口(1-8)和大格口(9-16)存快递
    lockerStatus: Array(16).fill().map((_, index) => {
      let size;
      if (index < 8) {
        size = 'medium'; // 中格口 - 一般快递
      } else {
        size = 'large'; // 大格口 - 大件快递
      }
      return {
        status: index % 4 === 0 ? 'occupied' : 'available',
        temperature: index % 4 === 0 ? (index % 3 === 0 ? 'constant' : index % 3 === 1 ? 'low' : 'warm') : null,
        size: size
      };
    })
  },

  onLoad(options) {
    // 页面加载时执行
    console.log('快递小哥端加载');
  },

  // 显示取件服务
  showPickupSection() {
    this.setData({
      showPickup: true,
      showDelivery: false
    });
  },

  // 显示派件服务
  showDeliverySection() {
    this.setData({
      showPickup: false,
      showDelivery: true
    });
  },

  // 快递单号输入
  onCourierIdInput(e) {
    this.setData({
      courierId: e.detail.value
    });
  },

  // 派件单号输入
  onDeliveryIdInput(e) {
    this.setData({
      deliveryId: e.detail.value
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

  // 取件码输入
  onPickupCodeInput(e) {
    this.setData({
      pickupCode: e.detail.value
    });
  },

  // 格口大小选择
  selectLockerSize(e) {
    const size = e.currentTarget.dataset.value;
    this.setData({
      selectedLockerSize: size
    });
  },

  // 确认取件
  pickupCourier() {
    const { courierId } = this.data;
    
    if (!courierId) {
      this.setData({
        pickupResult: {
          type: 'error',
          message: '请输入快递单号'
        }
      });
      return;
    }

    // 模拟取件验证
    setTimeout(() => {
      this.setData({
        pickupResult: {
          type: 'success',
          message: '取件成功！柜子已打开，请取出包裹'
        }
      });
    }, 1000);
  },

  // 确认派件
  deliverParcel() {
    const { deliveryId, receiverName, receiverPhone, pickupCode, selectedLockerSize, lockerSizeOptions } = this.data;
    
    if (!deliveryId || !receiverName || !receiverPhone || !pickupCode) {
      this.setData({
        deliveryResult: {
          type: 'error',
          message: '请填写完整的派件信息'
        }
      });
      return;
    }

    // 获取选中的格口大小标签
    const selectedSizeLabel = lockerSizeOptions.find(option => option.value === selectedLockerSize).label;

    // 模拟派件验证
    setTimeout(() => {
      this.setData({
        deliveryResult: {
          type: 'success',
          message: '派件成功！柜子已打开，请放入包裹',
          pickupCode: pickupCode,
          lockerSize: selectedSizeLabel
        }
      });
    }, 1000);
  }
})