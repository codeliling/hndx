Vue.config.devtools = true;

new Vue({
  el: '#app',
  data: {
    visible: false
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

    }
  }
})

var chart1 = echarts.init(document.getElementById('chart1'));

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
    data: [5, 20, 36, 10, 10, 20, 51, 23, 36, 18, 11, 23, 19,33,5, 20, 36, 10, 10, 20, 51, 23, 36, 18, 11, 23, 19,33, 5, 20]
  }]
};

// 使用刚指定的配置项和数据显示图表。
chart1.setOption(option1_2);

var chart2 = echarts.init(document.getElementById('chart2'));

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
    data: [5, 20, 36, 10, 10, 20, 51, 23, 36, 18, 11, 23, 19,33,5, 20, 36, 10, 10, 20, 51, 23, 36, 18, 11, 23, 19,33, 5, 20]
  }]
};
// 使用刚指定的配置项和数据显示图表。
chart2.setOption(option2_2);
