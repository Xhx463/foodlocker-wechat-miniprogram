// pages/rider/rider.js
Page({
  data: {
    // 存餐相关
    showStore: false,
    merchantName: '',
    pickupCode: '',
    storeResult: null,
    
    // 温度选择
    temperatureOptions: [
      { value: 'constant', label: '恒温', icon: '🌡️' },
      { value: 'low', label: '低温', icon: '❄️' },
      { value: 'warm', label: '保温', icon: '🔥' }
    ],
    selectedTemperature: 'constant',
    
    // 取件相关
    showCourier: false,
    courierId: '',
    courierResult: null,
    
    // 柜子状态 - 骑手端主要使用小格口(1-8)存外卖
    lockerStatus: Array(16).fill().map((_, index) => {
      let size;
      if (index < 8) {
        size = 'small'; // 小格口 - 外卖专用
      } else if (index < 12) {
        size = 'medium'; // 中格口
      } else {
        size = 'large'; // 大格口
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
    console.log('骑手端加载');
  },

  // 显示存餐服务
  showStoreSection() {
    this.setData({
      showStore: true,
      showCourier: false
    });
  },

  // 显示取件服务
  showCourierSection() {
    this.setData({
      showStore: false,
      showCourier: true
    });
  },

  // 商家名称输入
  onMerchantNameInput(e) {
    this.setData({
      merchantName: e.detail.value
    });
  },

  // 取餐码输入
  onPickupCodeInput(e) {
    this.setData({
      pickupCode: e.detail.value
    });
  },

  // 选择温度
  selectTemperature(e) {
    const temperature = e.currentTarget.dataset.value;
    this.setData({
      selectedTemperature: temperature
    });
  },

  // 快递单号输入
  onCourierIdInput(e) {
    this.setData({
      courierId: e.detail.value
    });
  },

  // 生成随机取餐码
  generatePickupCode() {
    return Math.floor(100000 + Math.random() * 900000).toString();
  },

  // 确认存餐
  storeFood() {
    const { merchantName, pickupCode, selectedTemperature, temperatureOptions } = this.data;
    
    if (!merchantName || !pickupCode) {
      this.setData({
        storeResult: {
          type: 'error',
          message: '请填写完整的存餐信息'
        }
      });
      return;
    }

    // 获取选中的温度标签
    const selectedTemperatureLabel = temperatureOptions.find(option => option.value === selectedTemperature).label;

    // 模拟存餐验证
    setTimeout(() => {
      const pickupCode = this.generatePickupCode();
      this.setData({
        storeResult: {
          type: 'success',
          message: '存餐成功！柜子已打开，请放入餐品',
          pickupCode: pickupCode,
          temperature: selectedTemperatureLabel
        }
      });
    }, 1000);
  },

  // 确认取件
  pickupCourier() {
    const { courierId } = this.data;
    
    if (!courierId) {
      this.setData({
        courierResult: {
          type: 'error',
          message: '请输入快递单号'
        }
      });
      return;
    }

    // 模拟取件验证
    setTimeout(() => {
      this.setData({
        courierResult: {
          type: 'success',
          message: '取件成功！柜子已打开，请取出包裹'
        }
      });
    }, 1000);
  }
})