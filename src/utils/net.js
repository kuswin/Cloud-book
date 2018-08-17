let baseUrl = 'https://m.yaojunrong.com'

export const net = {
  get (url, data) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('token')
      let header = {
        'content-type': 'application/json'
      }
      if (token) {
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        data,
        method: 'GET',
        header: header,
        success: function (res) {
          if (res.header['Token']) {
            wx.setStorageSync('token', res.header['Token'])
          }
          resolve(res.data)
        },
        error (err) {
          reject(err)
        }
      })
    })
  },
  post (url, data) {
    return new Promise((resolve, reject) => {
      let token = wx.getStorageSync('token')
      let header = {
        'content-type': 'application/json'
      }
      if (token) {
        header.token = token
      }
      wx.request({
        url: baseUrl + url,
        data,
        method: 'POST',
        header: header,
        success: function (res) {
          if (res.header['Token']) {
            wx.setStorageSync('token', res.header['Token'])
          }
          resolve(res.data)
        },
        error (err) {
          reject(err)
        }
      })
    })
  }
}

export const login = () => {
  return new Promise(resolve => {
    wx.login({
      success (res) {
        net.post('/login', {code: res.code,
          appid:'wx0eb374285afcfad8',
          secret:'92032beccadf78f608144a7db3ee7780'})
          .then(user => {
          resolve(user)
            console.log(user);
            wx.reLaunch({
              url: '/pages/my/main'
            })
          })
      }
    })
  })
}
