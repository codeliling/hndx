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
    undergraduateForm:{
      xm:'',
      byzh:'',
      bysj:'',
      xxmc:'',
      zymc:'',
      bj:'',
      bylb:'',
      xxxs:'',
      rxsj:'',
    }
  },
  methods: {
    menuClick(name){
      if(name == '1-1'){
        window.location.href = '/manageUndergraduate';
      }
      else if(name == '1-2'){
        window.location.href = '/managePostgraduate';
      }
      else if(name == 2){
        window.location.href = '/importInfo';
      }
      else if(name == 3){
        window.location.href = '/statistics';
      }else if (name == 4) {
        window.location.href = '/manageLogout';
      }
    },
    handleSubmit(){
      if (this.undergraduateForm.xm == '' || this.undergraduateForm.xm == null){
        this.$Message.warning('请填写姓名!');
        return;
      }

      if (this.undergraduateForm.byzh == '' || this.undergraduateForm.byzh == null){
        this.$Message.warning('请填写毕业证号!');
        return;
      }

      if (this.undergraduateForm.bysj == '' || this.undergraduateForm.bysj == null){
        this.$Message.warning('请填写毕业时间!');
        return;
      }

      if (this.undergraduateForm.rxsj == '' || this.undergraduateForm.rxsj == null){
        this.$Message.warning('请填写入学时间!');
        return;
      }

      if (this.undergraduateForm.xxmc == '' || this.undergraduateForm.xxmc == null){
        this.$Message.warning('请填写学校名称!');
        return;
      }

      if (this.undergraduateForm.zymc == '' || this.undergraduateForm.zymc == null){
        this.$Message.warning('请填写专业名称!');
        return;
      }

      if (this.undergraduateForm.bj == '' || this.undergraduateForm.bj == null){
        this.$Message.warning('请填写班级!');
        return;
      }

      if (this.undergraduateForm.bylb == '' || this.undergraduateForm.bylb == null){
        this.$Message.warning('请填写毕业类别!');
        return;
      }

      if (this.undergraduateForm.xxxs == '' || this.undergraduateForm.xxxs == null){
        this.$Message.warning('请填写学习形式!');
        return;
      }

      if(this.urlId > 0){ //更新
        var that = this;
        axios.put('/manage/undergraduate/'+this.urlId, that.undergraduateForm)
        .then(function (response) {
          if(response.data.status == 200){
            that.$Message.info('操作成功!');
            setTimeout( function(){
              window.location.href = "/manageUndergraduate?currentPage="+that.currentPage;
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
        axios.post('/manage/undergraduate', that.undergraduateForm)
        .then(function (response) {
          if(response.data.status == 200){
            that.$Message.info('操作成功!');
            window.location.href = "/manageUndergraduate";
          }
          else{
            that.$Message.warning('操作失败!' + response.data.data);
          }
        })
        .catch(function (error) {
          that.$Message.error('操作失败!' + error);
        });
      }
    }
  },
  created(){
    this.urlId = getQueryStringByName("Id");
    this.currentPage = getQueryStringByName("currentPage");
    if (this.urlId > 0){
      var that = this;
      axios.get('/manage/undergraduate/'+this.urlId).then(function(res) {
        var dataObj = res.data;
        if (dataObj.success == true){
          var undergraduateObject = dataObj.data;
          that.undergraduateForm.xm = undergraduateObject.xm;
          that.undergraduateForm.byzh = undergraduateObject.byzh;
          that.undergraduateForm.bysj = undergraduateObject.bysj;
          that.undergraduateForm.xxmc = undergraduateObject.xxmc;
          that.undergraduateForm.zymc = undergraduateObject.zymc;
          that.undergraduateForm.bj = undergraduateObject.bj;
          that.undergraduateForm.bylb = undergraduateObject.bylb;
          that.undergraduateForm.xxxs = undergraduateObject.xxxs;
        }
        else{
          that.$Message.error('读取数据失败!');
        }

      }).catch(function(res) {
        that.$Message.error('读取数据失败!' + res);
      });
    }

  }
})
