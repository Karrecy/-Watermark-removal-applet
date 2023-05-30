// pages/index/index.js
var util=require('../../utils/util.js')
wx.cloud.init({
  env:'cloud1-9g75fmfg7c95505a'
})


Page({
  

  /**
   * 页面的初始数据
   */
  data: {

    lianjie:"",//文本框内容
    title:"",
    //选择模块颜色
    color1:"#a4e2c6",
    color2:"#a4e2c6",
    color3:"#a4e2c6",
    //各个模块显示与否
    choose_display:"none",
    temp_display:"none",
    video_display:"none",
    pic_display:"none",
    audio_display:"none",
    text_display:"none",
    //发送给云函数
    send:{
      "APP":"",
      "url":""
    },
    //数据
    response:{
      "title":"",
      "pics":[],
      "video":"",
      "music":{
        "title":"",
        "author":"",
        "src":""
    }
    },
  },
  
  //图片多选
  selectApply:function(e){
    //console.log(e);
    //console.log(this.data);
    var index = e.currentTarget.dataset.index;
    var item = this.data.response.pics[index];
    item.isSelected = !item.isSelected;
    var key = "response.pics[" + index + "].isSelected"
    this.setData({
      [key]:item.isSelected
    })
    
    // this.setData({
    //   selected_pics:this.data.selected_pics.concat(this.data.response.pics[index])
    // })
  },

//文本框
  getlianjie(e){
    var u1=e.detail.value
    console.log(u1);
    if(u1.includes("douyin")){
      var APP = "douyin"
      var re = /https.*\//
      var res=u1.match(re)[0] //抖音原始链接
      console.log(res);
      var re1 = /\/(.*?)http/   //抖音开头文案
      u1.match(re1)
      this.setData({
      title:RegExp.$1,
      lianjie:e.detail.value,
      send:{
        "APP":APP,
        "url":res
      },
    })
    }else if(u1.includes("xhslink")){
      var APP = 'xhs'
      var re = /http.*?，/
      var res = u1.match(re)[0] //抖音原始链接
      res = res.slice(0,-1)
      this.setData({
        title:"",
        lianjie:e.detail.value,
        send:{
          "APP":APP,
          "url":res
        },
      })
    }else if(u1.includes("b23")){
      var APP = 'blbl'
      var re = /http.*/
      var res = u1.match(re)[0] //blbl原始链接
      console.log(res);
      //res = res.slice(0,-1)
      this.setData({
        title:"",
        lianjie:e.detail.value,
        send:{
          "APP":APP,
          "url":res
        },
      })
    }
    else if(u1.includes("kuaishou")){
      var APP = 'ks'
      var res = u1.slice(0,30)
      console.log(res);
      this.setData({
        title:"",
        lianjie:e.detail.value,
        send:{
          "APP":APP,
          "url":res
        },
      })
    }
    else {
      this.setData({
        lianjie:e.detail.value,

        send:{
          "APP":"disable",
        },
      })
    }
    
  },
  //解析按钮
  jiexi(e){  
    if(this.data.lianjie.length == 0){
      wx.showToast({
        title: '文本为空',
      })
      setTimeout(function () {
        wx.hideToast()
      }, 500)
    }
    else if(this.data.send.APP == "douyin"){
      wx.showLoading({
        title: '解析中...',
      })
      var that = this
      wx.cloud.callFunction({
        // 云函数名称
        name: 'add1',
        // 传给云函数的参数
        data: {
          a: this.data.send
        },
        success: function(res) {
          var r = res.result
         // console.log(r.pics);
          that.setData({
            choose_display:"block",
            response:{
              "title":r.title,
              "pics":r.pics,
              "video":r.video,
              "music":{
                "title":r.music.title,
                "author":r.music.author,
                "src":r.music.src
              }
            }
          })
          if(that.data.response.video.length != 0){
            that.setData({
              video_display:"block",
              color1:"#48c0a3"
            })
          }else{
            that.setData({
              pic_display:"block",
              color2:"#48c0a3"
            })
          }
        // console.log(r);
          // wx.hideLoading(); 
          wx.showToast({
            title: '解析完毕',
          })
          setTimeout(function () {
            wx.hideToast()
          }, 500)
          // that.setData({
          //   display:'block'
          // })
          
        },
        fail: function(res){
          wx.showToast({
            title: '错误！请重试',
          })
          setTimeout(function () {
            wx.hideToast()
          }, 500)
        }
      })
    }
    else if(this.data.send.APP == "xhs"){
      wx.showLoading({
        title: '解析中...',
      })
      var that = this
      wx.cloud.callFunction({
        // 云函数名称
        name: 'add1',
        // 传给云函数的参数
        data: {
          a: this.data.send
        },
        success: function(res) {
          var r = res.result
          
         // console.log(r.pics);
          that.setData({
            choose_display:"block",
            response:{
              "title":r.title,
              "pics":r.pics,
              "video":r.video,
              "music":{
                "title":r.music.title,
                "author":r.music.author,
                "src":r.music.src
              }
            }
          })
          if(that.data.response.video.length != 0){
            that.setData({
              video_display:"block",
              color1:"#48c0a3"
            })
          }else{
            that.setData({
              pic_display:"block",
              color2:"#48c0a3"
            })
          }
        // console.log(r);
          // wx.hideLoading(); 
          wx.showToast({
            title: '解析完毕',
          })
          setTimeout(function () {
            wx.hideToast()
          }, 500)
          // that.setData({
          //   display:'block'
          // })
          
        },
        fail: function(res){
          wx.showToast({
            title: '错误！请重试',
          })
          setTimeout(function () {
            wx.hideToast()
          }, 500)
        }
      })      
    }
    else if(this.data.send.APP == "ks"){
      wx.showLoading({
        title: '解析中...',
      })
      var that = this
      wx.cloud.callFunction({
        // 云函数名称
        name: 'add1',
        // 传给云函数的参数
        data: {
          a: this.data.send
        },
        success: function(res) {
          var r = res.result
          console.log(r);
         // console.log(r.pics);
          
          
        // console.log(r);
          // wx.hideLoading(); 
          wx.showToast({
            title: '解析完毕',
          })
          setTimeout(function () {
            wx.hideToast()
          }, 500)
          // that.setData({
          //   display:'block'
          // })
          
        },
        fail: function(res){
          wx.showToast({
            title: '错误！请重试',
          })
          setTimeout(function () {
            wx.hideToast()
          }, 500)
        }
      })     
    }
    else if(this.data.send.APP == "disable"){
      wx.showToast({
        title: '暂不支持',
      })
      setTimeout(function () {
        wx.hideToast()
      }, 500)
    }
    
     
    
    
    },
//清空按钮
    qingkong(e) {
      this.setData({
        lianjie:"",//文本框内容
        title:"",
        color1:"#a4e2c6",
        color2:"#a4e2c6",
        color3:"#a4e2c6",
        choose_display:"none",
        video_display:"none",
        pic_display:"none",
        audio_display:"none",
        text_display:"none",
        send:{
          "APP":"",
          "url":""
        },
        response:{
          "title":"",
          "pics":[],
          "video":"",
          "music":{
            "title":"",
            "author":"",
            "src":""
        }
        },
      })

    },
    //保存到相册
    xiazai(e){
      wx.showLoading({
        title: '下载中...',
      })
      wx.downloadFile({
          //视频信息的Url
        url: this.data.response.video,
        success: function (res) {
          // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
          if (res.statusCode === 200) {
            console.log(res.tempFilePath);

            wx.saveVideoToPhotosAlbum({
              filePath: res.tempFilePath,
              success:function(res) {
                console.log(res.errMsg)
                // wx.hideLoading(); 
                wx.showToast({
                  title: '下载完成',
                })
                setTimeout(function () {
                  wx.hideToast()
                }, 500)
              }
            })
          }
        }
      })


    },
 //下载图片
     //下载全部
     download_all_pic(e) {
      wx.showLoading({
        title: '下载中...',
      })
      var that = this
      var piclist = this.data.response.pics
      for(var i = 0;i<piclist.length;i++){
        var src = piclist[i].src
        wx.downloadFile({
          url: src,//图片的地址
          //type: 'audio',
          success:function(res){
            const tempFilePath = res.tempFilePath  //如果请求成功，则通过res中的tempFilePath 得到需要下载的图片地址
            //console.log(tempFilePath); //方便查看，这里打印路径，并且提示请求成功
            console.log("请求到了");
            wx.saveImageToPhotosAlbum({
              filePath: tempFilePath,  //设置下载图片的地址
              success:function(){console.log("保存成功"); //保存成功后进行的提示
              }
          })
        }
      })
      }
      wx.showToast({
        title: '下载完成',
      })
      setTimeout(function () {
        wx.hideToast()
      }, 500)
    },
    //下载选中
    download_select_pic(e) {
      var that = this
      var piclist = this.data.response.pics
      var count = 0
      for(var j = 0;j<piclist.length;j++){
        var flag1 = piclist[j].isSelected
        if(flag1){
          count = count + 1
        }
      }
      console.log(count);
      if(count == 0){
        wx.showLoading({
          title: '未选择图片',
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 500)   
      }else {
        wx.showLoading({
          title: '下载中...',
        })
        for(var i = 0;i<piclist.length;i++){
          var src = piclist[i].src
          var flag = piclist[i].isSelected
          if(flag){
            wx.downloadFile({
              url: src,//图片的地址
              //type: 'audio',
              success:function(res){
                const tempFilePath = res.tempFilePath  //如果请求成功，则通过res中的tempFilePath 得到需要下载的图片地址
                //console.log(tempFilePath); //方便查看，这里打印路径，并且提示请求成功
                console.log("请求到了");
                wx.saveImageToPhotosAlbum({
                  filePath: tempFilePath,  //设置下载图片的地址
                  success:function(){console.log("保存成功"); //保存成功后进行的提示
                  }
              })
            }
          })
          }
        }
        wx.showToast({
          title: '下载完成',
        })
        setTimeout(function () {
          wx.hideToast()()
        }, 500)      
      }
      
    },
    

video_display(){
  if(this.data.response.video.length == 0){
    this.setData({
      video_display:"none",
      pic_display:"none",
      audio_display:"none",
      text_display:"none",
      temp_display:"block",
      color1:"#48c0a3",
      color2:"#a4e2c6",
      color3:"#a4e2c6",
    })
  }else{
    this.setData({
      video_display:"block",
      pic_display:"none",
      audio_display:"none",
      text_display:"none",
      temp_display:"none",
      color1:"#48c0a3",
      color2:"#a4e2c6",
      color3:"#a4e2c6",
    })
  }
  
},
pic_display(){
  if(this.data.response.pics.length == 0){
    this.setData({
      video_display:"none",
      pic_display:"none",
      audio_display:"none",
      text_display:"none",
      temp_display:"block",
      color1:"#a4e2c6",
      color2:"#48c0a3",
      color3:"#a4e2c6",
    })
  }else{
    this.setData({
      video_display:"none",
      pic_display:"block",
      audio_display:"none",
      text_display:"none",
      temp_display:"none",
      color1:"#a4e2c6",
      color2:"#48c0a3",
      color3:"#a4e2c6",
    })
  }
},
text_display(){
  
  this.setData({
    video_display:"none",
    pic_display:"none",
    audio_display:"none",
    text_display:"block",
    temp_display:"none",
    color1:"#a4e2c6",
    color2:"a4e2c6",
    color3:"#48c0a3",
  })
},

//复制到粘贴板
copy_text(){
  var that = this
  console.log(that.data.title);
  wx.setClipboardData({
    data:this.data.response.title,
    success:function(res){
      wx.showToast({
        title: '已复制到粘贴板',
      })
    }
  })

},


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    
    setTimeout(function () {
      wx.hideNavigationBarLoading();
      //停止下拉刷新
      wx.stopPullDownRefresh();
    }, 2000);
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage(res) {
    
  }
})