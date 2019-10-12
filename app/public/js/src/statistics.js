//Vue.config.devtools = true;

// 指定图表的配置项和数据
var option1_1 = {
  title: {
    text: '学历查询按月统计图'
  },
  tooltip: {},
  legend: {
    data: ['访问量']
  },
  xAxis: {
    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  },
  yAxis: {},
  series: [{
    name: '访问量',
    type: 'line',
    data: [5, 20, 36, 10, 10, 20, 51, 23, 36, 18, 11, 23, 19,33]
  }]
};

var option1_2 = {
  title: {
    text: '学历查询按日统计图'
  },
  tooltip: {},
  legend: {
    data: ['访问量']
  },
  xAxis: {
    data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
    "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",
     "24","25","26","27","28","29","30"]
  },
  yAxis: {},
  series: [{
    name: '访问量',
    type: 'line',
    data: [5, 20, 36, 10, 10, 20, 51, 23, 36, 18, 11, 23, 19, 33,5, 20, 36, 10, 10, 20, 51, 23, 36, 18, 11, 23, 19,33, 5, 20]
  }]
};

// 指定图表的配置项和数据
var option2_1 = {
  title: {
    text: '学历下载按月统计图'
  },
  tooltip: {},
  legend: {
    data: ['访问量']
  },
  xAxis: {
    data: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
  },
  yAxis: {},
  series: [{
    name: '访问量',
    type: 'line',
    data: [5, 20, 36, 10, 10, 20, 51, 23, 36, 18, 11, 23, 19,33]
  }]
};

var option2_2 = {
  title: {
    text: '学历下载按日统计图'
  },
  tooltip: {},
  legend: {
    data: ['访问量']
  },
  xAxis: {
    data: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12",
    "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23",
     "24","25","26","27","28","29","30"]
  },
  yAxis: {},
  series: [{
    name: '访问量',
    type: 'line',
    data: [5, 20, 36, 10, 10, 20, 51, 23, 36, 18, 11, 23, 19,33,5, 20, 36, 10, 10, 20, 51, 23, 36, 18, 11, 23, 19,33, 5, 20]
  }]
};

new Vue({
  el: '#app',
  delimiters: ['${', '}'],
  data: {
    visible: false,
    chart1: null,
    chart2: null,
    amount:0,
    postgraduateCount:0,
    undergraduateCount:0,
    downLoadCount:0,
    searchCount:0,
    value1:'',
    value2:'',
    value3:'',
    value4:'',
  },
  mounted: function () {
    this.chart1 = echarts.init(document.getElementById('chart1'));
    this.chart2 = echarts.init(document.getElementById('chart2'));

    this.chart1.setOption(option1_1);
    this.chart2.setOption(option2_1);

    this.loadingCountStatisticsData();
    this.loadingGraduateData();
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
    searchCountByYear(){
      let that = this;
      axios.get('/manage/statistics/queryGroupByMonth',{
        type : 1,
        year : that.value1,
      }).then(function(res) {
        if (res.data.status == 200){

        }
        else{
          this.$Message.warning('获取学生总数数据失败!');
        }
        this.chart1.setOption(option1_1);
      }).catch(function(res) {
        this.$Message.warning('获取学生总数数据失败!' + res);
      });

    },
    searchCountByMonth(){
      let that = this;
      axios.get('/manage/statistics/queryGroupByDay',{
        type : 1,
        startDate : that.value2,
      }).then(function(res) {
        if (res.data.status == 200){

        }
        else{
          this.$Message.warning('获取学生总数数据失败!');
        }

      }).catch(function(res) {
        this.$Message.warning('获取学生总数数据失败!' + res);
      });
      this.chart1.setOption(option1_2);
    },
    downLoadCountByYear(){
      let that = this;
      axios.get('/manage/statistics/queryGroupByMonth',{
        type : 2,
        year : that.value3,
      }).then(function(res) {
        if (res.data.status == 200){

        }
        else{
          this.$Message.warning('获取学生总数数据失败!');
        }

      }).catch(function(res) {
        this.$Message.warning('获取学生总数数据失败!' + res);
      });
      this.chart2.setOption(option2_1);
    },
    downLoadCountByMonth(){
      let that = this;
      axios.get('/manage/statistics/queryGroupByDay',{
        type : 2,
        year : that.value4,
      }).then(function(res) {
        if (res.data.status == 200){
          res.data.data;
        }
        else{
          this.$Message.warning('获取学生总数数据失败!');
        }

      }).catch(function(res) {
        this.$Message.warning('获取学生总数数据失败!' + res);
      });
      this.chart2.setOption(option2_2);
    },
    loadingCountStatisticsData(){
      let that = this;
      axios.get('/manage/statistics/getCountStatisticsData').then(function(res) {
        if (res.data.status == 200){
          that.searchCount = res.data.data.searchCount;
          that.downLoadCount = res.data.data.downLoadCount;
        }
        else{
          this.$Message.warning('获取使用总数数据失败!');
        }

      }).catch(function(res) {
        this.$Message.warning('获取使用总数数据失败!' + res);
      });
    },
    loadingGraduateData(){
      let that = this;
      axios.get('/manage/statistics/countGraduateData').then(function(res) {
        if (res.data.status == 200){
          that.undergraduateCount = res.data.data.undergraduateCount;
          that.postgraduateCount = res.data.data.postgraduateCount;
          that.amount = that.undergraduateCount + that.postgraduateCount;
        }
        else{
          this.$Message.warning('获取学生总数数据失败!');
        }

      }).catch(function(res) {
        this.$Message.warning('获取学生总数数据失败!' + res);
      });
    },
  }
})
