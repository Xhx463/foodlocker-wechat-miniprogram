// lattice-visual.js
Page({
  data: {
    cabinets: ['测试柜', '柜机1', '柜机2', '柜机3'],
    selectedCabinetIndex: 0,
    lattices: [],
    loading: false
  },
  
  onLoad() {
    // 页面加载时执行
    console.log('格口可视化页面加载');
    this.loadLattices();
  },
  
  onShow() {
    // 页面显示时执行
    this.loadLattices();
  },
  
  onCabinetChange(e) {
    // 柜机选择变化
    const index = e.detail.value;
    this.setData({
      selectedCabinetIndex: index
    });
    this.loadLattices();
  },
  
  loadLattices() {
    // 加载格口数据
    this.setData({ loading: true });
    
    const app = getApp();
    app.request('/lattices', {
      method: 'GET',
      data: {
        cabinetId: '53034431609'
      }
    }).then(res => {
      if (res.success && res.data) {
        this.setData({
          lattices: res.data
        });
      }
    }).catch(error => {
      console.error('加载格口数据失败:', error);
      // 使用模拟数据
      this.setData({
        lattices: [
          { id: 1, latticeNo: 'A01', status: '可用' },
          { id: 2, latticeNo: 'A02', status: '占用' },
          { id: 3, latticeNo: 'A03', status: '可用' },
          { id: 4, latticeNo: 'A04', status: '维护中' },
          { id: 5, latticeNo: 'B01', status: '可用' },
          { id: 6, latticeNo: 'B02', status: '占用' },
          { id: 7, latticeNo: 'B03', status: '可用' },
          { id: 8, latticeNo: 'B04', status: '可用' },
          { id: 9, latticeNo: 'C01', status: '占用' },
          { id: 10, latticeNo: 'C02', status: '可用' },
          { id: 11, latticeNo: 'C03', status: '可用' },
          { id: 12, latticeNo: 'C04', status: '占用' }
        ]
      });
    }).finally(() => {
      this.setData({ loading: false });
    });
  },
  
  onLatticeTap(e) {
    // 格口点击事件
    const latticeId = e.currentTarget.dataset.id;
    const lattice = this.data.lattices.find(item => item.id === latticeId);
    
    if (lattice) {
      wx.showModal({
        title: `格口 ${lattice.latticeNo}`,
        content: `状态: ${lattice.status}\n是否执行操作？`,
        confirmText: '执行操作',
        cancelText: '取消',
        success: (res) => {
          if (res.confirm) {
            this.showLatticeActions(lattice);
          }
        }
      });
    }
  },
  
  showLatticeActions(lattice) {
    // 显示格口操作菜单
    wx.showActionSheet({
      itemList: ['远程开门', '锁定格口', '清理状态', '取消'],
      success: (res) => {
        switch (res.tapIndex) {
          case 0:
            this.remoteOpenDoor(lattice.id);
            break;
          case 1:
            this.lockLattice(lattice.id);
            break;
          case 2:
            this.clearLatticeStatus(lattice.id);
            break;
        }
      }
    });
  },
  
  remoteOpenDoor(latticeId) {
    // 远程开门
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
        this.loadLattices();
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
  },
  
  lockLattice(latticeId) {
    // 锁定格口
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
        this.loadLattices();
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
  },
  
  clearLatticeStatus(latticeId) {
    // 清理格口状态
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
        this.loadLattices();
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
  },
  
  refreshLattices() {
    // 刷新格口状态
    this.loadLattices();
  },
  
  goBack() {
    // 返回上一页
    wx.navigateBack();
  }
});