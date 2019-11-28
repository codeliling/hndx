//Vue.config.devtools = true;

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
    pageTotal: 0,
    pageSize: 10,
    currentPage:1,
    columns: [  {
        title: 'ID',
        key: 'Id'
      },{
        title: '查询姓名',
        key: 'xm',
        render: (h, params) => {
          return h('div', [
            h('Icon', {
              props: {
                type: 'person'
              }
            }),
            h('strong', params.row.xm)
          ]);
        }
      },
      {
        title: '查询毕业证号',
        key: 'byzh'
      },
      {
        title: '数据类型',
        key: 'sjlx'
      },
      {
        title: '查询时间',
        key: 'cxsj'
      },
    ],
    searchData: []
  },
  mounted: function () {

    this.loadingData(0);
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
    handlePage(value) {
      this.currentPage = value;
      this.loadingData((value - 1) * this.pageSize);
    },

    loadingData(offsetSize){
      let that = this;
      axios.get('/public/manage/statistics/queryByPage',{
          params: {
            limit : that.pageSize,
            offset : offsetSize,
          }
      }).then(function(res) {
        if (res.data.status == 200){
          let resultData = res.data.data;
          that.pageTotal = res.data.data.count;
          let rows = res.data.data.rows;
          if(rows.length > 0){
            that.searchData = [];
            for(let i = 0; i < rows.length; i++){
              let statisticsObj = {};
              let obj = rows[i];
              statisticsObj.Id = obj.Id;
              if(obj.type == 1){
                statisticsObj.sjlx = '查询学历';
              }
              else{
                statisticsObj.sjlx = '下载电子学历';
              }
              let conditionArr = obj.condition.split('|');
              statisticsObj.byzh = conditionArr[0];
              statisticsObj.xm = conditionArr[1];
              statisticsObj.cxsj = obj.createAt;
              that.searchData.push(statisticsObj);
            }

          }
          else{
            that.searchData = [];
          }
        }
        else{
          that.$Message.warning('获取数据失败!');
        }

      }).catch(function(res) {
        that.$Message.warning('获取数据失败!' + res);
      });
    },

  }
})
