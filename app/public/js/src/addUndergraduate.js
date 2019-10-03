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
    undergraduateForm:{
      xm:'',
      byzh:'',
      bysj:'',
      xxmc:'',
      zymc:'',
      bj:'',
      bylb:'',
      xxxs:''
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
        console.log(name);
        window.location.href = '/statistics';
      }
    },
    handleSubmit(){
      if(this.urlId > 0){ //更新
        var that = this;
        axios.put('/manage/undergraduate/'+this.urlId, that.undergraduateForm)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
      else{ //添加
        var that = this;
        axios.post('/manage/undergraduate', that.undergraduateForm)
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
      }
    }
  },
  created(){
    this.urlId = getQueryStringByName("Id");
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

        }
        that.$Message.info('This is a info tip');
        console.log(that.xm);
      }).catch(function(res) {
        console.log(res);
      });
    }

  }
})
