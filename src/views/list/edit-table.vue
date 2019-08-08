<template>
  <div class="wrapper">
    <!--表格行 key 的取值，可以是字符串或一个函数 默认值为key-->
    <a-table
      row-key="id"
      :loading="loading"
      :columns="columns"
      :data-source="data"
      :pagination="pagination"
      size="default"
      bordered
      @change="tableChange"
    >
      <template slot="title1" slot-scope="text, record">
        <div :key="record.id">
          <a-input
            v-if="record.editable"
            style="margin: -5px 0"
            :value="text"
            @change="e => handleChange(e.target.value, record.id,'title')"
          />
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="timestamp" slot-scope="text">
        {{ text | parseTime('{y}-{m}-{d} {h}:{i}') }}
      </template>
      <template slot="operation" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record.id)">Save</a>
            <a-popconfirm title="Sure to cancel?" @confirm="() => cancel(record.id)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a @click="() => edit(record.id)">Edit</a>
          </span>
        </div>
      </template>
    </a-table>
  </div>
</template>

<script>
const columns = [{
  title: 'ID',
  dataIndex: 'id',
  width: '5%',
  scopedSlots: { customRender: 'id' }
}, {
  title: '日期',
  dataIndex: 'timestamp',
  width: '15%',
  scopedSlots: { customRender: 'timestamp' }
}, {
  title: '作者',
  dataIndex: 'author',
  width: '15%',
  scopedSlots: { customRender: 'author' }
},
{
  title: '标题',
  dataIndex: 'title',
  width: '40%',
  scopedSlots: { customRender: 'title1' }
},
{
  title: '操作',
  dataIndex: 'operation',
  scopedSlots: { customRender: 'operation' }
}]

// const data = []
// for (let i = 0; i < 100; i++) {
//   data.push({
//     key: i.toString(),
//     name: `Edrward ${i}`,
//     age: 32,
//     title: `London Park no. ${i}`
//   })
// }
import { fetchList, updateArticle } from '@/api/article'
export default {
  data() {
    return {
      data: [],
      pagination: {
        pageSize: 10
      },
      query: {
        page: 1,
        limit: 10
      },
      columns,
      loading: true
    }
  },
  created() {
    this.getList(this.query)
  },
  methods: {
    getList(query = {}) {
      this.loading = true
      fetchList(query).then(res => {
        const data = res.data.items
        this.data = data
        this.cacheData = data.map(item => ({ ...item }))
        const pagination = { ...this.pagination }
        pagination.total = res.data.total
        this.pagination = pagination
        this.loading = false
      })
    },
    handleChange(value, key, column) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.id)[0]
      if (target) {
        target[column] = value
        this.data = newData
      }
    },
    tableChange(pagination) {
      const pager = { ...this.query }
      pager.page = pagination.current
      this.getList(pager)
    },
    edit(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.id)[0]
      if (target) {
        target.editable = true
        this.data = newData
      }
    },
    async save(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.id)[0]
      if (target) {
        delete target.editable
        this.data = newData
        this.cacheData = newData.map(item => ({ ...item }))
        const res = await updateArticle(target)
        if (res.code === 20000) this.$message.success('操作成功')
      }
    },
    cancel(key) {
      const newData = [...this.data]
      const target = newData.filter(item => key === item.id)[0]
      if (target) {
        Object.assign(target, this.cacheData.filter(item => key === item.id)[0])
        delete target.editable
        this.data = newData
      }
    }
  }
}
</script>
<style lang='less' scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
