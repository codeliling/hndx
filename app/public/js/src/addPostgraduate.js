Vue.config.devtools = true;

function getQueryStringByName(name){
     var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
     if(result == null || result.length < 1){
         return "";
     }
     return result[1];
}

new Vue({
  el: '#app',
  data: {
    visible: false,
    urlId:0,
    currentPage:0,
    defaultHeadiconPath: '/public/images/user.png',
    postgraduateForm: {
      Xm: '',
      Pic: '',
      Byzh: '',
      Sfzh: '',
      Xb: '',
      Rxsj: '',
      Bysj: '',
      Xh: '',
      Dh: '',
      Zymc: ''
    }
  },
  methods: {
    menuClick(name) {
      if (name == '1-1') {
        window.location.href = '/manageUndergraduate';
      } else if (name == '1-2') {
        window.location.href = '/managePostgraduate';
      } else if (name == 2) {
        window.location.href = '/importInfo';
      } else if (name == 3) {
        window.location.href = '/statistics';
      }else if (name == 4) {
        window.location.href = '/manageLogout';
      }
    },
    handleSubmit(){
      if (this.postgraduateForm.Xm == '' || this.postgraduateForm.Xm == null){
        this.$Message.warning('请填写姓名!');
        return;
      }

      if (this.postgraduateForm.Byzh == '' || this.postgraduateForm.Byzh == null){
        this.$Message.warning('请填写毕业证号!');
        return;
      }

      if (this.postgraduateForm.Sfzh == '' || this.postgraduateForm.Sfzh == null){
        this.$Message.warning('请填写身份证号!');
        return;
      }

      if (this.postgraduateForm.Xb == '' || this.postgraduateForm.Xb == null){
        this.$Message.warning('请选择性别!');
        return;
      }

      if (this.postgraduateForm.Rxrq == '' || this.postgraduateForm.Rxrq == null){
        this.$Message.warning('请填写入学日期!');
        return;
      }

      if (this.postgraduateForm.Bysj == '' || this.postgraduateForm.Bysj == null){
        this.$Message.warning('请填写毕业时间!');
        return;
      }

      if (this.postgraduateForm.Xh == '' || this.postgraduateForm.Xh == null){
        this.$Message.warning('请填写学号!');
        return;
      }

      if (this.postgraduateForm.Zymc == '' || this.postgraduateForm.Zymc == null){
        this.$Message.warning('请填写专业名称!');
        return;
      }

      if(this.urlId > 0){ //更新
        var that = this;
        axios.put('/manage/postgraduate/'+this.urlId, that.postgraduateForm)
        .then(function (response) {
          if(response.data.status == 200){
            that.$Message.info('操作成功!');
            setTimeout( function(){
              window.location.href = "/managePostgraduate?currentPage="+that.currentPage;
            }, 1000 );

          }
          else{
            that.$Message.warning('操作失败!');
          }
        })
        .catch(function (error) {
          that.$Message.error('操作失败!' + response.data.data);
        });
      }
      else{ //添加
        var that = this;
        axios.post('/manage/postgraduate', that.postgraduateForm)
        .then(function (response) {
          if(response.data.status == 200){
            that.$Message.info('操作成功!');
            window.location.href = "/managePostgraduate";
          }
          else{
            that.$Message.warning('操作失败!' + response.data.data);
          }
        })
        .catch(function (error) {
          that.$Message.error('操作失败!' + error);
        });
      }
    },
    uploadHeadIconSuccess(response, file, fileList){
      if (response.status == 200){
        this.defaultHeadiconPath = response.imagePath;
        this.postgraduateForm.Pic = response.imagePath;
      }
      else{
        this.$Message.error(response.message);
      }
    }
  },
  created(){
    this.urlId = getQueryStringByName("Id");
    this.currentPage = getQueryStringByName("currentPage");
    if (this.urlId > 0){
      var that = this;
      axios.get('/manage/postgraduate/'+this.urlId).then(function(res) {
        var dataObj = res.data;
        if (dataObj.success == true){
          var postgraduateObject = dataObj.data;
          that.postgraduateForm.Xm = postgraduateObject.Xm;
          that.postgraduateForm.Pic = postgraduateObject.Pic;
          that.postgraduateForm.Byzh = postgraduateObject.Byzh;
          that.postgraduateForm.Sfzh = postgraduateObject.Sfzh;
          that.postgraduateForm.Xb = postgraduateObject.Xb;
          that.postgraduateForm.Rxsj = postgraduateObject.Rxsj;
          that.postgraduateForm.Bysj = postgraduateObject.Bysj;
          that.postgraduateForm.Xh = postgraduateObject.Xh;
          that.postgraduateForm.Dh = postgraduateObject.Dh;
          that.postgraduateForm.Zymc = postgraduateObject.Zymc;
        }
        else{
          that.$Message.error('读取数据失败!');
        }
      }).catch(function(res) {
        that.$Message.error('读取数据失败!'+res);
      });
    }

  }
})
