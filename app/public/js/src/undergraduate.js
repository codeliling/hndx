Vue.config.devtools = true;
new Vue({
  el: '#app',
  data() {
    return {
      pageTotal: 0,
      pageSize: 10,
      currentPage:0,
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
                    window.location.href = '/manageAddUndergraduate?Id=' + params.row.Id
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
                    this.remove(params.row.Id)
                  }
                }
              }, '删除')
            ]);
          }
        }
      ],
      data6: []
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
        window.location.href = '/statistics';
      } else if (name == 4) {
        window.location.href = '/manageLogout';
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
        that.pageTotal = res.data.data.count;
        that.data6 = res.data.data.rows;
      }).catch(function(res) {
        console.log(res);
      });
    },

    handlePage(value) {
      this.getListData((value - 1) * this.pageSize);
    },

    remove(Id) {
      var that = this;
      this.$Modal.confirm({
        title: '请确认是否删除',
        content: `删除ID为：${Id} 的数据。`,
        onOk: () => {
          axios.delete('/manageundergraduate/'+Id).then(function(res) {
            this.$Message.info('删除成功');
            that.getListData((currentPage - 1) * that.pageSize);
          }).catch(function(res) {
            this.$Message.info('删除失败'+res);
          });
        },
        onCancel: () => {
          this.$Message.info('取消删除');
        }
      })
    },

    searchClick(){
      var that = this;
      var type = 0;
      if(that.searchData != ''){
        var re = new RegExp("^[\u4e00-\u9fa5]+$");
        if (re.test(v)){
        	type = 2;
        }
        else{
          type = 1;
        }

        axios.get('/manage/undergraduate/listUndergraduateByCondition', {
          params: {
            limit: that.pageSize,
            offset: (currentPage - 1) * that.pageSize,
            searchData:that.searchData,
            type:type,
          }
        }).then(function(res) {
          that.pageTotal = res.data.data.count;
          that.data6 = res.data.data.rows;
        }).catch(function(res) {
          console.log(res);
        });
      }
      else{
        this.getListData(0);
      }
    },

    addClick(){
      window.location.href = '/manageAddUndergraduate?Id=0';
    }
  },
  mounted() {
    this.getListData(0);
  },
})
