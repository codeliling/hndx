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
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0]
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
    data: []
  },
  yAxis: {},
  series: [{
    name: '访问量',
    type: 'line',
    data: []
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
    data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
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
    data: []
  },
  yAxis: {},
  series: [{
    name: '访问量',
    type: 'line',
    data: []
  }]
};

function days(year,month){
  var dayCount;
  var now = new Date(year,month, 0);
  var dayCount = now.getDate();
  return dayCount;
}

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
        window.location.href = '/public/manageUndergraduate';
      } else if (name == '1-2') {
        window.location.href = '/public/managePostgraduate';
      } else if (name == 2) {
        window.location.href = '/public/importInfo';
      } else if (name == '3-1') {
        window.location.href = '/public/statistics';
      } else if (name == '3-2') {
        window.location.href = '/public/searchStatistics';
      } else if (name == 4) {
        window.location.href = '/public/manageLogout';
      }
    },
    time1(e){
      this.value1 = e;
    },
    time2(e){
      this.value2 = e;
    },
    time3(e){
      this.value3 = e;
    },
    time4(e){
      this.value4 = e;
    },
    clearData1(e){
      option1_1.series[0].data = [];
      this.chart1.setOption(option1_1);
    },
    clearData2(e){
      option1_2.series[0].data = [];
      this.chart1.setOption(option1_2);
    },
    clearData3(e){
      option2_1.series[0].data = [];
      this.chart2.setOption(option2_1);
    },
    clearData4(e){
      option2_2.series[0].data = [];
      this.chart2.setOption(option2_2);
    },
    searchCountByYear(){
      let that = this;
      axios.get('/public/manage/statistics/queryGroupByMonth',{
          params: {
            type : 1,
            year : that.value1,
          }
      }).then(function(res) {
        if (res.data.status == 200){
          let resultData = res.data.data;
          if (resultData.length == 0){
            that.chart1.setOption(option1_1);
          }
          else{
            let chartData = [];
            for (let i = 0; i < 12; i++){
              let hasData = false;
              for (let j = 0; j < resultData.length; j++){
                let timeStr = '';
                if(i < 9){
                  let month = i + 1;
                  timeStr = that.value1 + '-0' + month;
                }
                else{
                  let month = i + 1;
                  timeStr = that.value1 + '-' + month;
                }
                if(resultData[j].time == timeStr){
                  chartData[i] = resultData[j].count;
                  hasData = true;
                }
              }
              if (!hasData){
                chartData[i] = 0;
              }
            }
            console.log(chartData);
            option1_1.series[0].data = chartData;
            that.chart1.setOption(option1_1);
          }
        }
        else{
          that.$Message.warning('获取学生总数数据失败!');
        }

      }).catch(function(res) {
        that.$Message.warning('获取学生总数数据失败!' + res);
      });

    },
    searchCountByMonth(){
      let that = this;
      let dateStr = that.value2.split('-');
      let dayCount = days(dateStr[0], dateStr[1]);
      let xAxisData = [];
      let seriesData = [];
      for (let i = 1; i <= dayCount; i++){
        xAxisData.push(i+'号');
        seriesData.push(0);
      }
      option1_2.xAxis.data = xAxisData;
      option1_2.series[0].data = seriesData;

      axios.get('/public/manage/statistics/queryGroupByDay',{
          params: {
            type : 1,
            startDate : that.value2,
          }
      }).then(function(res) {
        if (res.data.status == 200){
          let resultData = res.data.data;
          if (resultData.length == 0){
            that.chart1.setOption(option1_2);
          }
          else{
            let chartData = [];
            for (let i = 0; i < dayCount; i++){
              let hasData = false;
              for (let j = 0; j < resultData.length; j++){
                let timeStr = '';
                if(i < 9){
                  let month = i + 1;
                  timeStr = that.value2 + '-0' + month;
                }
                else{
                  let month = i + 1;
                  timeStr = that.value2 + '-' + month;
                }
                if(resultData[j].time == timeStr){
                  chartData[i] = resultData[j].count;
                  hasData = true;
                }
              }
              if (!hasData){
                chartData[i] = 0;
              }
            }
            option1_2.series[0].data = chartData;
            that.chart1.setOption(option1_2);
          }
        }
        else{
          that.chart1.setOption(option1_2);
          that.$Message.warning('获取学生总数数据失败!');
        }

      }).catch(function(res) {
        that.$Message.warning('获取学生总数数据失败!' + res);
      });
    },
    downLoadCountByYear(){
      let that = this;
      axios.get('/public/manage/statistics/queryGroupByMonth',{
          params: {
            type : 2,
            year : that.value3,
          }
      }).then(function(res) {
        if (res.data.status == 200){
          let resultData = res.data.data;
          if (resultData.length == 0){
            that.chart1.setOption(option1_1);
          }
          else{
            let chartData = [];
            for (let i = 0; i < 12; i++){
              let hasData = false;
              for (let j = 0; j < resultData.length; j++){
                let timeStr = '';
                if(i < 9){
                  let month = i + 1;
                  timeStr = that.value3 + '-0' + month;
                }
                else{
                  let month = i + 1;
                  timeStr = that.value3 + '-' + month;
                }
                if(resultData[j].time == timeStr){
                  chartData[i] = resultData[j].count;
                  hasData = true;
                }
              }
              if (!hasData){
                chartData[i] = 0;
              }
            }
            option2_1.series[0].data = chartData;
            that.chart2.setOption(option2_1);
          }
        }
        else{
          that.$Message.warning('获取学生总数数据失败!');
        }

      }).catch(function(res) {
        that.$Message.warning('获取学生总数数据失败!' + res);
      });
      that.chart2.setOption(option2_1);
    },
    downLoadCountByMonth(){
      let that = this;
      let dateStr = that.value4.split('-');
      let dayCount = days(dateStr[0], dateStr[1]);
      let xAxisData = [];
      let seriesData = [];
      for (let i = 1; i <= dayCount; i++){
        xAxisData.push(i+'号');
        seriesData.push(0);
      }
      option2_2.xAxis.data = xAxisData;
      option2_2.series[0].data = seriesData;
      axios.get('/public/manage/statistics/queryGroupByDay',{
          params: {
            type : 2,
            startDate : that.value4,
          }
      }).then(function(res) {
        if (res.data.status == 200){
          res.data.data;
          let resultData = res.data.data;
          if (resultData.length == 0){
            that.chart2.setOption(option2_2);
          }
          else{
            let chartData = [];
            for (let i = 0; i < dayCount; i++){
              let hasData = false;
              for (let j = 0; j < resultData.length; j++){
                let timeStr = '';
                if(i < 9){
                  let month = i + 1;
                  timeStr = that.value4 + '-0' + month;
                }
                else{
                  let month = i + 1;
                  timeStr = that.value4 + '-' + month;
                }
                console.log(timeStr);
                if(resultData[j].time == timeStr){
                  chartData[i] = resultData[j].count;
                  hasData = true;
                }
              }
              if (!hasData){
                chartData[i] = 0;
              }
            }
            console.log(chartData);
            option2_2.series[0].data = chartData;
            that.chart2.setOption(option2_2);
          }
        }
        else{
          that.chart2.setOption(option2_2);
          that.$Message.warning('获取学生总数数据失败!');
        }

      }).catch(function(res) {
        that.$Message.warning('获取学生总数数据失败!' + res);
      });

    },
    loadingCountStatisticsData(){
      let that = this;
      axios.get('/public/manage/statistics/getCountStatisticsData').then(function(res) {
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
      axios.get('/public/manage/statistics/countGraduateData').then(function(res) {
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
