Vue.config.devtools = true;
new Vue({
  el: '#app',
  data() {
    return {
      pageTotal:0,
      pageSize:10,
      searchData: '',
      columns: [{
          title: '姓名',
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
          title: '毕业证号',
          key: 'byzh'
        },
        {
          title: '毕业时间',
          key: 'bysj'
        },
        {
          title: '专业名称',
          key: 'zymc'
        },
        {
          title: '班级',
          key: 'bj'
        },
        {
          title: '毕业类别',
          key: 'bylb'
        },
        {
          title: '学习形式',
          key: 'xxxs'
        },
        {
          title: 'Action',
          key: 'action',
          width: 150,
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                  size: 'small'
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.show(params.Id)
                  }
                }
              }, '修改'),
              h('Button', {
                props: {
                  type: 'error',
                  size: 'small'
                },
                on: {
                  click: () => {
                    this.remove(params.Id)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      data6: [
      ]
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
        console.log(name);
        window.location.href = '/statistics';
      }
    },
    getListData(offset) {
      var that = this;
      axios.get('/manage/undergraduate', {
        params: {
          limit: that.pageSize,
          offset: offset,
        }
      }).then(function(res) {
        that.pageTotal =  res.data.data.count;
        that.data6 = res.data.data.rows;
      }).catch(function(res) {
        console.log(res);
      });
    },

    handlePage(value){
      this.getListData((value - 1) * this.pageSize);
    },

    remove(Id){

    }
  },
  mounted() {
    this.getListData(0);
  },
})
