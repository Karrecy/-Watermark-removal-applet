// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({ env: cloud.DYNAMIC_CURRENT_ENV }) // 使用当前云环境
var rp = require('request-promise');
var express = require('express')
const app = express()
//app.use(graphqlUploadExpress())


// 云函数入口函数
exports.main = async (event, context,callback) => {
  
  var response = {
    "title":"",
    "pics":[],
    "video":"",
    "music":{
      "title":"",
      "author":"",
      "src":""
    }
  }
  let send = event['a']
  let app = send.APP
  let url = send.url
  if(app == "douyin"){
    await rp({
      url:url,
      method:"POST",
      json:false
    }).then(function(res){
      res
    }).catch(function(err){
      //拿到重定向后的url
      next_url=err.response.headers.location
    })
    //视频抖音
    if(next_url.includes("video")){
      var ree = /video\/(.*)\/\?region/
      var ress = next_url.match(ree)[0]
      var ss = 'https://www.douyin.com/video/'+RegExp.$1
    
      await rp({
        url:ss,
        method:"GET",
        json:false,
        headers:{
          'cookie':'douyin.com; ttwid=1|ow6GRZp-zJFZZ2nWtEqP1oEpRA81RSriW_YHJEgnbJI|1677039662|6a27cd46ce7670c09d7a371b6dee176cba0071efd7c6b382a7489e53b3de82e2;passport_csrf_token=be613d19f8d3cfaf0ceb65541f3af5d9;passport_csrf_token_default=be613d19f8d3cfaf0ceb65541f3af5d9;s_v_web_id=verify_lef647ld_SNpilHsu_jFRk_42FG_9EFA_STnECp461vbD;passport_assist_user=CjwqHci4ZPaJqvEdoqYvcPNLmjNJvbTbYsXh-95MRpwWfIFW09s5g68GB9s6Z9hCZ5hPIMmtDWPy5J1wfEcaSAo8oZxBPmtJZyBC2pCWWmj0p-udFTpxdwsLSEfpHoZGhoo8TmIj1FzlwQhHwE2u4NkjeNz5xKMGW0xmLd1QEMr7qQ0Yia_WVCIBAzWKwKk=; n_mh=l_HKCp6azeitWxo-5PvvVD8jSY6QauDOTPH9CuIli7o;sso_uid_tt=3f6dcf5840fff99cb14fd9e6f1e81c1c;sso_uid_tt_ss=3f6dcf5840fff99cb14fd9e6f1e81c1c;toutiao_sso_user=2a7483ab917354982995ebff01f9964c;toutiao_sso_user_ss=2a7483ab917354982995ebff01f9964c;odin_tt=57c05431d75b26993b14fc46f3d06e4efa79e0eaad6eb77637d38624e669d6276d44aae127f1107b4054bfc8669675e6; uid_tt=5f78a6af33735a6c2ecaf66807c998c7;uid_tt_ss=5f78a6af33735a6c2ecaf66807c998c7;sid_tt=d35a3e9518bacfa21860351df6d7522e; sessionid=d35a3e9518bacfa21860351df6d7522e;sessionid_ss=d35a3e9518bacfa21860351df6d7522e; LOGIN_STATUS=1; store-region=cn-fj; store-region-src=uid; d_ticket=35b3832120184afae5d24cf724f61c29a5247; sid_ucp_sso_v1=1.0.0-KDBlNjA0MzU4NzhhMmEwZjkzM2Y5ZjUyMjdkNTQ1ZDFmYTAyOTQ0MjYKHQjsjff2vwEQ_dPPoAYY7zEgDDDVwPm_BTgGQPQHGgJsZiIgMmE3NDgzYWI5MTczNTQ5ODI5OTVlYmZmMDFmOTk2NGM; ssid_ucp_sso_v1=1.0.0-KDBlNjA0MzU4NzhhMmEwZjkzM2Y5ZjUyMjdkNTQ1ZDFmYTAyOTQ0MjYKHQjsjff2vwEQ_dPPoAYY7zEgDDDVwPm_BTgGQPQHGgJsZiIgMmE3NDgzYWI5MTczNTQ5ODI5OTVlYmZmMDFmOTk2NGM; sid_guard=d35a3e9518bacfa21860351df6d7522e|1679026685|5184000|Tue,+16-May-2023+04:18:05+GMT; sid_ucp_v1=1.0.0-KDVhMTJiMDBiZGVmYzBlN2NhYjUxMjE1ZGRiYTY0N2I0Y2M4NjM1ZjIKGQjsjff2vwEQ_dPPoAYY7zEgDDgGQPQHSAQaAmxxIiBkMzVhM2U5NTE4YmFjZmEyMTg2MDM1MWRmNmQ3NTIyZQ; ssid_ucp_v1=1.0.0-KDVhMTJiMDBiZGVmYzBlN2NhYjUxMjE1ZGRiYTY0N2I0Y2M4NjM1ZjIKGQjsjff2vwEQ_dPPoAYY7zEgDDgGQPQHSAQaAmxxIiBkMzVhM2U5NTE4YmFjZmEyMTg2MDM1MWRmNmQ3NTIyZQ; download_guide="3/20230331"; douyin.com; strategyABtestKey="1680323384.328"; csrf_session_id=9e5149a4c39e8eba1602365f6a9d776f; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtY2xpZW50LWNlcnQiOiItLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS1cbk1JSUNGRENDQWJxZ0F3SUJBZ0lVRjZybjZaY2lYYStlcm9DMkYwWUt0SUFjMkxrd0NnWUlLb1pJemowRUF3SXdcbk1URUxNQWtHQTFVRUJoTUNRMDR4SWpBZ0JnTlZCQU1NR1hScFkydGxkRjluZFdGeVpGOWpZVjlsWTJSellWOHlcbk5UWXdIaGNOTWpNd01qSXlNRFF5TVRJeFdoY05Nek13TWpJeU1USXlNVEl4V2pBbk1Rc3dDUVlEVlFRR0V3SkRcblRqRVlNQllHQTFVRUF3d1BZbVJmZEdsamEyVjBYMmQxWVhKa01Ga3dFd1lIS29aSXpqMENBUVlJS29aSXpqMERcbkFRY0RRZ0FFdzdjak9XdWZFd3dPNUhlelg2c1Fsa0VMRzR3YzdtL0ZwS3JVWnNZV0crZjBqQmxGbkZSV1ZVTGJcblZaMjB5TVdZejN3c0ZSMzhtUkpuTEdmdUp3YlU4Nk9CdVRDQnRqQU9CZ05WSFE4QkFmOEVCQU1DQmFBd01RWURcblZSMGxCQ293S0FZSUt3WUJCUVVIQXdFR0NDc0dBUVVGQndNQ0JnZ3JCZ0VGQlFjREF3WUlLd1lCQlFVSEF3UXdcbktRWURWUjBPQkNJRUlBVVA0ZlVmNHZCTVZqMDVrTG1HQTd5L1hIb3pFSkVCTjBPbEdvbUZNc0JvTUNzR0ExVWRcbkl3UWtNQ0tBSURLbForcU9aRWdTamN4T1RVQjdjeFNiUjIxVGVxVFJnTmQ1bEpkN0lrZURNQmtHQTFVZEVRUVNcbk1CQ0NEbmQzZHk1a2IzVjVhVzR1WTI5dE1Bb0dDQ3FHU000OUJBTUNBMGdBTUVVQ0lBZE5BUEZFc3B6OW9RRG5cbmc0dFFyOTdBYkVWT2kwc0ZreUVTOEVhN2lKaVZBaUVBbjBMMVhCMndCWlRqWkp4c0ZTc3hMUWsyejRnaTUwQVVcbjZvMldyVjAxdHF3PVxuLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLVxuIn0=; VIDEO_FILTER_MEMO_SELECT={"expireTime":1680940312274,"type":1}; FOLLOW_NUMBER_YELLOW_POINT_INFO="MS4wLjABAAAAbfjVESJLCAbS9dsulGuqVHiHpw7soB5U9aPYJPqJSjQ/1680364800000/0/0/1680337230060"; publish_badge_show_info="1,0,0,1680336050486"; tt_scid=5kcUQ5RIyOikn6.GsrRd9YSeThEMKhEsvyZeMx2gSjBQgL09tTZ3Y80oDlQ5TQM439d0; home_can_add_dy_2_desktop="0"; __ac_nonce=06427f363009300d3a452; __ac_signature=_02B4Z6wo00f01DzFKKQAAIDAN0mW4tM67eA85SwAAGsdGNcX.YluSbX.GfRV.D.tXk0nQldhPp.fV8jFniiWTfoFuwYbxoYg0L7XCN2CQLeCwS-iZjvC2eWlsY40agDxzhAo1Teulnkf6IK8d1; FOLLOW_LIVE_POINT_INFO="MS4wLjABAAAAbfjVESJLCAbS9dsulGuqVHiHpw7soB5U9aPYJPqJSjQ/1680364800000/0/0/1680340414874"; msToken=mCe8vx5ez5UmbMHnTqpHdyp8vJnlo5C61SuWXQats7oGk4WiD3wEKAiWjXFmbTj5Wt__u5aTSeq2cazWp6bqPGsZPANObeDF77OXFZCzKe3hoIrv2VoN3Vj1evpX_wmxFQ==; passport_fe_beating_status=true; msToken=dS8HgKTDojCWQd6wPmscvDa5i7r_3SkmO3tZxFXIH5y9txvNqGudoHD0yY8y7wsQLpLURTUm2CFkPeD7oA_EyQvH4OU29Co8aoE9EKuXbXglL64fenEuK_Vw4M-pbyF_HQ==',
           'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54'
          }
      }).then(function(res){
        //拿到响应html内容
        fina_url = res
      }).catch(function(err){
        fina_url = err
      })
  
      var reg1 = /application\/json(.*)export_obj/
      var res1 = fina_url.match(reg1)[0]
      res1 = res1.slice(18,-289)
      var ss = decodeURIComponent(res1)
      var j = JSON.parse(ss)
      //console.log(j['45'].aweme.detail.video.playAddr[0].src);
      //console.log(j['45'].aweme.detail.video.playApiH265);
      var music_url = 'https'+j['46'].aweme.detail.video.playApiH265
      var video_url = 'https:'+j['46'].aweme.detail.video.playAddr[0].src
      var title = j['46'].aweme.detail.desc
      response.video = video_url
      response.title = title
      
  
    }
    //图文抖音
    if(next_url.includes("note")){
      var ree = /note\/(.*)\/\?region/
      var ress = next_url.match(ree)[0]
      var ss = 'https://www.douyin.com/note/'+RegExp.$1
      
    //发送请求
      await rp({
        url:ss,
        method:"GET",
        json:false,
        headers:{
          'cookie':'douyin.com; ttwid=1|ow6GRZp-zJFZZ2nWtEqP1oEpRA81RSriW_YHJEgnbJI|1677039662|6a27cd46ce7670c09d7a371b6dee176cba0071efd7c6b382a7489e53b3de82e2;passport_csrf_token=be613d19f8d3cfaf0ceb65541f3af5d9;passport_csrf_token_default=be613d19f8d3cfaf0ceb65541f3af5d9;s_v_web_id=verify_lef647ld_SNpilHsu_jFRk_42FG_9EFA_STnECp461vbD;passport_assist_user=CjwqHci4ZPaJqvEdoqYvcPNLmjNJvbTbYsXh-95MRpwWfIFW09s5g68GB9s6Z9hCZ5hPIMmtDWPy5J1wfEcaSAo8oZxBPmtJZyBC2pCWWmj0p-udFTpxdwsLSEfpHoZGhoo8TmIj1FzlwQhHwE2u4NkjeNz5xKMGW0xmLd1QEMr7qQ0Yia_WVCIBAzWKwKk=; n_mh=l_HKCp6azeitWxo-5PvvVD8jSY6QauDOTPH9CuIli7o;sso_uid_tt=3f6dcf5840fff99cb14fd9e6f1e81c1c;sso_uid_tt_ss=3f6dcf5840fff99cb14fd9e6f1e81c1c;toutiao_sso_user=2a7483ab917354982995ebff01f9964c;toutiao_sso_user_ss=2a7483ab917354982995ebff01f9964c;odin_tt=57c05431d75b26993b14fc46f3d06e4efa79e0eaad6eb77637d38624e669d6276d44aae127f1107b4054bfc8669675e6; uid_tt=5f78a6af33735a6c2ecaf66807c998c7;uid_tt_ss=5f78a6af33735a6c2ecaf66807c998c7;sid_tt=d35a3e9518bacfa21860351df6d7522e; sessionid=d35a3e9518bacfa21860351df6d7522e;sessionid_ss=d35a3e9518bacfa21860351df6d7522e; LOGIN_STATUS=1; store-region=cn-fj; store-region-src=uid; d_ticket=35b3832120184afae5d24cf724f61c29a5247; sid_ucp_sso_v1=1.0.0-KDBlNjA0MzU4NzhhMmEwZjkzM2Y5ZjUyMjdkNTQ1ZDFmYTAyOTQ0MjYKHQjsjff2vwEQ_dPPoAYY7zEgDDDVwPm_BTgGQPQHGgJsZiIgMmE3NDgzYWI5MTczNTQ5ODI5OTVlYmZmMDFmOTk2NGM; ssid_ucp_sso_v1=1.0.0-KDBlNjA0MzU4NzhhMmEwZjkzM2Y5ZjUyMjdkNTQ1ZDFmYTAyOTQ0MjYKHQjsjff2vwEQ_dPPoAYY7zEgDDDVwPm_BTgGQPQHGgJsZiIgMmE3NDgzYWI5MTczNTQ5ODI5OTVlYmZmMDFmOTk2NGM; sid_guard=d35a3e9518bacfa21860351df6d7522e|1679026685|5184000|Tue,+16-May-2023+04:18:05+GMT; sid_ucp_v1=1.0.0-KDVhMTJiMDBiZGVmYzBlN2NhYjUxMjE1ZGRiYTY0N2I0Y2M4NjM1ZjIKGQjsjff2vwEQ_dPPoAYY7zEgDDgGQPQHSAQaAmxxIiBkMzVhM2U5NTE4YmFjZmEyMTg2MDM1MWRmNmQ3NTIyZQ; ssid_ucp_v1=1.0.0-KDVhMTJiMDBiZGVmYzBlN2NhYjUxMjE1ZGRiYTY0N2I0Y2M4NjM1ZjIKGQjsjff2vwEQ_dPPoAYY7zEgDDgGQPQHSAQaAmxxIiBkMzVhM2U5NTE4YmFjZmEyMTg2MDM1MWRmNmQ3NTIyZQ; download_guide="3/20230331"; douyin.com; strategyABtestKey="1680323384.328"; csrf_session_id=9e5149a4c39e8eba1602365f6a9d776f; bd_ticket_guard_client_data=eyJiZC10aWNrZXQtZ3VhcmQtdmVyc2lvbiI6MiwiYmQtdGlja2V0LWd1YXJkLWl0ZXJhdGlvbi12ZXJzaW9uIjoxLCJiZC10aWNrZXQtZ3VhcmQtY2xpZW50LWNlcnQiOiItLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS1cbk1JSUNGRENDQWJxZ0F3SUJBZ0lVRjZybjZaY2lYYStlcm9DMkYwWUt0SUFjMkxrd0NnWUlLb1pJemowRUF3SXdcbk1URUxNQWtHQTFVRUJoTUNRMDR4SWpBZ0JnTlZCQU1NR1hScFkydGxkRjluZFdGeVpGOWpZVjlsWTJSellWOHlcbk5UWXdIaGNOTWpNd01qSXlNRFF5TVRJeFdoY05Nek13TWpJeU1USXlNVEl4V2pBbk1Rc3dDUVlEVlFRR0V3SkRcblRqRVlNQllHQTFVRUF3d1BZbVJmZEdsamEyVjBYMmQxWVhKa01Ga3dFd1lIS29aSXpqMENBUVlJS29aSXpqMERcbkFRY0RRZ0FFdzdjak9XdWZFd3dPNUhlelg2c1Fsa0VMRzR3YzdtL0ZwS3JVWnNZV0crZjBqQmxGbkZSV1ZVTGJcblZaMjB5TVdZejN3c0ZSMzhtUkpuTEdmdUp3YlU4Nk9CdVRDQnRqQU9CZ05WSFE4QkFmOEVCQU1DQmFBd01RWURcblZSMGxCQ293S0FZSUt3WUJCUVVIQXdFR0NDc0dBUVVGQndNQ0JnZ3JCZ0VGQlFjREF3WUlLd1lCQlFVSEF3UXdcbktRWURWUjBPQkNJRUlBVVA0ZlVmNHZCTVZqMDVrTG1HQTd5L1hIb3pFSkVCTjBPbEdvbUZNc0JvTUNzR0ExVWRcbkl3UWtNQ0tBSURLbForcU9aRWdTamN4T1RVQjdjeFNiUjIxVGVxVFJnTmQ1bEpkN0lrZURNQmtHQTFVZEVRUVNcbk1CQ0NEbmQzZHk1a2IzVjVhVzR1WTI5dE1Bb0dDQ3FHU000OUJBTUNBMGdBTUVVQ0lBZE5BUEZFc3B6OW9RRG5cbmc0dFFyOTdBYkVWT2kwc0ZreUVTOEVhN2lKaVZBaUVBbjBMMVhCMndCWlRqWkp4c0ZTc3hMUWsyejRnaTUwQVVcbjZvMldyVjAxdHF3PVxuLS0tLS1FTkQgQ0VSVElGSUNBVEUtLS0tLVxuIn0=; VIDEO_FILTER_MEMO_SELECT={"expireTime":1680940312274,"type":1}; FOLLOW_NUMBER_YELLOW_POINT_INFO="MS4wLjABAAAAbfjVESJLCAbS9dsulGuqVHiHpw7soB5U9aPYJPqJSjQ/1680364800000/0/0/1680337230060"; publish_badge_show_info="1,0,0,1680336050486"; tt_scid=5kcUQ5RIyOikn6.GsrRd9YSeThEMKhEsvyZeMx2gSjBQgL09tTZ3Y80oDlQ5TQM439d0; home_can_add_dy_2_desktop="0"; __ac_nonce=06427f363009300d3a452; __ac_signature=_02B4Z6wo00f01DzFKKQAAIDAN0mW4tM67eA85SwAAGsdGNcX.YluSbX.GfRV.D.tXk0nQldhPp.fV8jFniiWTfoFuwYbxoYg0L7XCN2CQLeCwS-iZjvC2eWlsY40agDxzhAo1Teulnkf6IK8d1; FOLLOW_LIVE_POINT_INFO="MS4wLjABAAAAbfjVESJLCAbS9dsulGuqVHiHpw7soB5U9aPYJPqJSjQ/1680364800000/0/0/1680340414874"; msToken=mCe8vx5ez5UmbMHnTqpHdyp8vJnlo5C61SuWXQats7oGk4WiD3wEKAiWjXFmbTj5Wt__u5aTSeq2cazWp6bqPGsZPANObeDF77OXFZCzKe3hoIrv2VoN3Vj1evpX_wmxFQ==; passport_fe_beating_status=true; msToken=dS8HgKTDojCWQd6wPmscvDa5i7r_3SkmO3tZxFXIH5y9txvNqGudoHD0yY8y7wsQLpLURTUm2CFkPeD7oA_EyQvH4OU29Co8aoE9EKuXbXglL64fenEuK_Vw4M-pbyF_HQ==',
           'user-agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36 Edg/111.0.1661.54'
          }
      }).then(function(res){
        fina_url = res
      }).catch(function(err){
        fina_url = err
      })
      var reg1 = /application\/json(.*)export_obj/
      var res1 = fina_url.match(reg1)[0]
      res1 = res1.slice(18,-289)
      //console.log(res1.slice(18,-289));
      
      var ss = decodeURIComponent(res1)
      var j = JSON.parse(ss)
      var picList = []
      for(i=0;i<j['29'].aweme.detail.images.length;i++){
          //console.log(j['29'].aweme.detail.images[i].urlList[0]);
          var dic = {
            "src":j['29'].aweme.detail.images[i].urlList[0],
            "isSelected":false
          }
          picList.push(dic)
      }  
      var title = j['29'].aweme.detail.desc
      response.pics = picList
      response.title = title

       
  
      
     // return fina_url
    }
    return response    
  }
  else if(app == "xhs"){
    await rp({
      url:url,
      method:"POST",
      json:false
    }).then(function(res){
      res
    }).catch(function(err){
      //拿到重定向后的url
      next_url=err.response.headers.location
    })
    

    var re = /item\/.*\?/
    var res = next_url.match(re)[0] //抖音原始链接
    res = res.slice(5,-1)
    res = 'https://www.xiaohongshu.com/explore/' + res
    var ss = res
    
    await rp({
      url:ss,
      method:"GET",
      json:false,
      headers:{
        "cookie":"xhsTrackerId=11c84b61-4cbb-4ff5-8d1d-3c31d5b6dbfe; xhsTrackerId.sig=-UgHzfqQU13RK6kv_Fch179wDxqrlhzdJJ8Ugc1O2lc; a1=186e9d3c1b727bj5b1tla8vvn35atykdub7nepdsl50000421412; webId=ca805bc62b17aba5d6b6fa34c0756f33; gid=yYKdjfqSJj7YyYKdjfqSyDUfDWJWDV2Dy910WM1YhhIq2I2809vTfd8884Jy4yJ800WyJ8K4; gid.sign=zq5oXYSG7+y90UjsUQajAr8dLBg=; customerClientId=987335978331584; x-user-id-creator.xiaohongshu.com=64293b0700000000120117d9; access-token-creator.xiaohongshu.com=customer.ares.AT-9901f23d5ca0431a96ad8c5b1d8f850e-4dd8017ce8574f82bba82095002118dd; timestamp2=168250914151603231aabc24c86374c6f67484b29f77e62693527ecc12158b7; timestamp2.sig=jbMToBeCtib7rIFuEjqpDcL9Sx2SDX0dBVHkBJjojFU; xsecappid=xhs-pc-web; xhsTracker=url=explore&xhsshare=CopyLink; xhsTracker.sig=wmLdXV__wbETiz1qUgqoiY8swj2zGxC5B-xOV9HIhWg; web_session=030037a321b2225cdd59929d10234a9e174067; webBuild=2.7.10; websectiga=29098a4cf41f76ee3f8db19051aaa60c0fc7c5e305572fec762da32d457d76ae; sec_poison_id=306f4ed2-2f90-4b24-9495-fa6a48745113",
        "user-agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35"
        
        
      }

    }).then(function(res){
      //拿到响应html内容
      fina_url = res
    })
    
    var rg1 = /window\.__INITIAL_SSR_STATE__=.*<\/script><script>function vue3Check/g
    var rrr = fina_url.match(rg1)[0]
    rrr = rrr.slice(73,-35)
    
    
    rrr= rrr.replace(/undefined/g,'{}')
    
    var json_fina = JSON.parse(rrr)
    
    var json_note = json_fina["note"]["note"]
    
    //提取文案
    var title = json_note["title"]+json_note["desc"]
    response.title = title
    //视频小红书
    if(json_note["type"] == "video"){
      //url拼接
      var video_xhs_url = "https://sns-video-al.xhscdn.com/" + json_note["video"]["consumer"]["originVideoKey"]
      response.video = video_xhs_url
    }
    //图片小红书
    else if(json_note["type"] == "normal"){
      var imageList_xhs = json_note["imageList"]
      for(var i = 0;i < imageList_xhs.length;i++){
        var imageUrl_xhs ="https://sns-img-bd.xhscdn.com/" + imageList_xhs[i]["traceId"]
        var dic_xhs = {
          "src":imageUrl_xhs,
          "isSelected":false
        }
        response.pics.push(dic_xhs)
      }
    }
    return response
    

  }
  else if(app == "ks"){
    await rp({
      url:url,
      method:"POST",
      json:false
    }).then(function(res){
      res
    }).catch(function(err){
      //拿到重定向后的url
      next_url=err.response.headers.location
    })
    //return next_url
    // if(next_url.includes("photo")){
    //   var url_ks = "https://v.m.chenzhongtech.com/rest/wd/photo/info?kpn=KUAISHOU&captchaToken="
    //   var fid_r = /fid=.*?&/g
    //   var fid = next_url.match(fid_r)[0].slice(4,-1)
    //   var photoId_r = /photoId=.*?&/g
    //   var photoId = next_url.match(photoId_r)[0].slice(8,-1)
    //   var shareId_r = /shareId=.*?&/g
    //   var shareId = next_url.match(shareId_r)[0].slice(8,-1)
    //   var shareObjectId_r = /shareObjectId=.*?&/g
    //   var shareObjectId = next_url.match(shareObjectId_r)[0].slice(14,-1)
    //   var shareToken_r = /shareToken=.*?&/g
    //   var shareToken = next_url.match(shareToken_r)[0].slice(11,-1)
            
    //   await rp({
    //     url:url_ks,
    //     method:"POST",
    //     headers:{
    //       "content-type": "application/json",
    //       "Cookie": "did=web_700acd9ac2ff44edb1e40933fb35b372; didv=1683964799000",
    //       "Host": "v.m.chenzhongtech.com",
    //       "Origin": "https://v.m.chenzhongtech.com",
    //       "Referer": next_url,
    //       "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35"        
    //     },
    //     body:{
    //       "env":"SHARE_VIEWER_ENV_TX_TRICK",
    //       "fid":fid,
    //       "h5Domain":"v.m.chenzhongtech.com",
    //       "isLongVideo":false,
    //       "kpn":"KUAISHOU",
    //       "photoId":photoId,
    //       "shareChannel":"share_copylink",
    //       "shareId":shareId,
    //       "shareMethod":"TOKEN",
    //       "shareObjectId":shareObjectId,
    //       "shareResourceType":"PHOTO_OTHER",
    //       "shareToken":shareToken,
    //       "subBiz":"BROWSE_SLIDE_PHOTO",

    //     }
  
    //   }).then(function(res){
    //     //拿到响应html内容
    //     fina_url = res
    //   }).catch(function(err){
    //     fina_url = err
    //   }).error(function(er){
    //     fina_url = er

    //   })
    //   return fina_url
    // }
    if(next_url.includes("long-video")){
      var url_ks = "https://www.kuaishou.com/graphql"
      var photoId_r = /photoId=.*?&/g
      var photoId = next_url.match(photoId_r)[0].slice(8,-1)
      var userId_r = /userId=.*?&/g
      var userId = next_url.match(userId_r)[0].slice(7,-1)
      var referer = "https://www.kuaishou.com/short-video/"+photoId+"?authorId="+userId+"&streamSource=profile&area=profilexxnull"
      await rp({
        url:"https://www.kuaishou.com/graphql",
        method:"POST",
        headers:{
          "content-type": "application/json",
          "Cookie": "did=web_ad85e17b99fa4fe1b8a28f2f9804115c; didv=1683964798000; kpf=PC_WEB; clientid=3; userId=3493905841; kuaishou.server.web_st=ChZrdWFpc2hvdS5zZXJ2ZXIud2ViLnN0EqABzNZLxLaL96pF_kjXWaCJUDZSLu7v73jybwUt8OkOLwYN-dAQREtGNgftIk4VOjopKu6JtsInu5jsf2UN2dCN2gpVzuqDxq4SaMLr8Jj1wRE2WQ1lT2TpWS1T9yQhWFkzGNBC47bNGXnkzLkvtB0KPa4vr4ripws57Va2mqUxk94dgun2eKK4vsmFzq9sFOeN0sAlTBeCZ9m7pPMp1I1bSRoSBmjJ_SI5Snf4O3WXJiYJKm0lIiDOlj750ckrE25eRO0dlFh9zlpYE3G2r1X_i8LR2lNZmygFMAE; kuaishou.server.web_ph=337b3d3eb06aaab1b1985a99077dd083f48a; kpn=KUAISHOU_VISION",
          "Host": "www.kuaishou.com",
          "Origin": "https://www.kuaishou.com",
          "Referer": "https://www.kuaishou.com/short-video/3xqqkk2bdrtccie?authorId=3xan2rnpayf7req&streamSource=profile&area=profilexxnull",
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/113.0.0.0 Safari/537.36 Edg/113.0.1774.35"        
        },
        "body":{
          "operationName":"visionProfilePhotoList",
          "query":"fragment photoContent on PhotoEntity {\n  id\n  duration\n  caption\n  originCaption\n  likeCount\n  viewCount\n  commentCount\n  realLikeCount\n  coverUrl\n  photoUrl\n  photoH265Url\n  manifest\n  manifestH265\n  videoResource\n  coverUrls {\n    url\n    __typename\n  }\n  timestamp\n  expTag\n  animatedCoverUrl\n  distance\n  videoRatio\n  liked\n  stereoType\n  profileUserTopPhoto\n  musicBlocked\n  __typename\n}\n\nfragment feedContent on Feed {\n  type\n  author {\n    id\n    name\n    headerUrl\n    following\n    headerUrls {\n      url\n      __typename\n    }\n    __typename\n  }\n  photo {\n    ...photoContent\n    __typename\n  }\n  canAddComment\n  llsid\n  status\n  currentPcursor\n  tags {\n    type\n    name\n    __typename\n  }\n  __typename\n}\n\nquery visionProfilePhotoList($pcursor: String, $userId: String, $page: String, $webPageArea: String) {\n  visionProfilePhotoList(pcursor: $pcursor, userId: $userId, page: $page, webPageArea: $webPageArea) {\n    result\n    llsid\n    webPageArea\n    feeds {\n      ...feedContent\n      __typename\n    }\n    hostName\n    pcursor\n    __typename\n  }\n}\n",
          "variables":{
            "userId": "3xan2rnpayf7req",
            "pcursor": "",
            "page": "detail",
            "webPageArea": "profilexxnull"
          }

        }
  
      }).then(function(res){
        拿到响应html内容
        fina_url = res
      }).catch(function(err){
        fina_url = err
      }).error(function(er){
        fina_url = er

      })
      return fina_url      
    }
    

  }



}