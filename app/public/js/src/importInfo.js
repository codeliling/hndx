Vue.config.devtools = true;
new Vue({
  el: '#app',
  delimiters: ['${', '}'],
  data: {
    graduateTypeList: [{
        value: '本专科学历信息导入',
        label: 'undergraduate'
      },
      {
        value: '研究生学历信息导入',
        label: 'postgraduate'
      }
    ],
    graduateTypeModel: '',
    uploadActionUrl: '',
    recordCount: 0,
    selectType: '',
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
      } else if (name == 4) {
        window.location.href = '/manageLogout';
      }
    },
    changeSelect(value) {
      this.selectType = value;
      if (value == '本专科学历信息导入') {
        this.uploadActionUrl = '/manage/file/uploadExcelFile/2';
      } else if (value == '研究生学历信息导入') {
        this.uploadActionUrl = '/manage/file/uploadExcelFile/1';
      }
      console.log(this.selectType);
    },
    uploadSuccess(response, file, fileList) {
      if(response.status == 200){
        this.recordCount = response.countRecord;
        this.$Message.info('上传成功');
      }
      else{
        this.$Message.error('上传失败' + response.message);
      }
    },
    uploadError(error, file, fileList) {
      this.$Message.error('上传失败' + error);
    },
    beforeUpload(){
      if (this.selectType == ''){
        this.$Message.warning('请选择上传Excel类型!');
        return false;
      }
    }
  }
})
