Vue.config.devtools = true;
new Vue({
  el: '#app',
  data: {
    visible: false,
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
    }
  }
})
