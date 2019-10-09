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
    postgraduateForm: {
      Xm: '',
      Pic: '',
      Byzh: '',
      Sfzh: '',
      Xb: '',
      Rxrq: '',
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
      if (this.undergraduateForm.Xm == '' || this.undergraduateForm.Xm == null){
        this.$Message.warning('请填写姓名!');
        return;
      }

      if (this.undergraduateForm.Byzh == '' || this.undergraduateForm.Byzh == null){
        this.$Message.warning('请填写毕业证号!');
        return;
      }

      if (this.undergraduateForm.Sfzh == '' || this.undergraduateForm.Sfzh == null){
        this.$Message.warning('请填写身份证号!');
        return;
      }

      if (this.undergraduateForm.Xb == '' || this.undergraduateForm.Xb == null){
        this.$Message.warning('请选择性别!');
        return;
      }

      if (this.undergraduateForm.Rxrq == '' || this.undergraduateForm.Rxrq == null){
        this.$Message.warning('请填写入学日期!');
        return;
      }

      if (this.undergraduateForm.Bysj == '' || this.undergraduateForm.Bysj == null){
        this.$Message.warning('请填写毕业时间!');
        return;
      }

      if (this.undergraduateForm.Xh == '' || this.undergraduateForm.Xh == null){
        this.$Message.warning('请填写学号!');
        return;
      }

      if (this.undergraduateForm.Zymc == '' || this.undergraduateForm.Zymc == null){
        this.$Message.warning('请填写专业名称!');
        return;
      }

      if(this.urlId > 0){ //更新
        var that = this;
        axios.put('/manage/postgraduate/'+this.urlId, that.undergraduateForm)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      else{ //添加
        var that = this;
        axios.post('/manage/postgraduate', that.undergraduateForm)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    },
    created(){
      this.urlId = getQueryStringByName("Id");
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
            that.postgraduateForm.Rxrq = postgraduateObject.Rxrq;
            that.postgraduateForm.Bysj = postgraduateObject.Bysj;
            that.postgraduateForm.Xh = postgraduateObject.Xh;
            that.postgraduateForm.Dh = postgraduateObject.Dh;
            that.postgraduateForm.Zymc = postgraduateObject.Zymc;
          }
          else{

          }
          console.log(that.xm);
        }).catch(function(res) {
          console.log(res);
        });
      }

    }

  }
})
