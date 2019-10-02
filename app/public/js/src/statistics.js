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
        console.log(name);
        window.location.href = '/statistics';
      }
    }
  }
})

var chart1 = echarts.init(document.getElementById('chart1'));

// 指定图表的配置项和数据
var option1 = {
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

// 使用刚指定的配置项和数据显示图表。
chart1.setOption(option1);

var chart2 = echarts.init(document.getElementById('chart2'));

// 指定图表的配置项和数据
var option2 = {
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

// 使用刚指定的配置项和数据显示图表。
chart2.setOption(option2);
