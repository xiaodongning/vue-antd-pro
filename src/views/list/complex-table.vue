<template>
  <div class="wrapper">
    <div class="filter-container">
      <a-input v-model="query.title" style="width:200px;margin-right:8px;" placeholder="标题" />
      <a-select
        v-model="query.importance"
        :allow-clear="true"
        placeholder="重要性"
        style="width: 120px;"
      >
        <a-select-option value="1">1</a-select-option>
        <a-select-option value="2">2</a-select-option>
        <a-select-option value="3">3</a-select-option>
      </a-select>
      <a-select
        v-model="query.type"
        :allow-clear="true"
        placeholder="类型"
        style="width: 120px;margin-right:8px"
      >
        <a-select-option v-for="item in area" :key="item.key" :value="item.key">{{ item.value }}</a-select-option>
      </a-select>
      <a-button type="primary" icon="search" @click="searchFilter">搜索</a-button>
      <a-button type="primary" icon="edit" @click="handleCreate">添加</a-button>
      <a-checkbox @change="toggleColumn">审核人</a-checkbox>
    </div>
    <a-table
      row-key="id"
      :loading="loading"
      :data-source="data"
      :pagination="pagination"
      bordered
      @change="filterTable"
    >
      <a-table-column key="id" title="ID" data-index="id" :sorter="true" align="center" />
      <a-table-column key="timestamp" title="时间" data-index="timestamp" align="center">
        <template slot-scope="text">{{ text | parseTime('{y}-{m}-{d} {h}:{i}') }}</template>
      </a-table-column>
      <a-table-column key="title" title="标题" data-index="title" />
      <a-table-column key="author" title="作者" data-index="author" align="center" />
      <a-table-column v-if="showColumn" key="reviewer" title="审核人" data-index="reviewer" align="center" />
      <a-table-column key="importance" title="重要性" data-index="importance">
        <template slot-scope="text">
          <icon-font v-for="i in text" :key="i" class="list-star" type="icon-star-fill" />
        </template>
      </a-table-column>
      <a-table-column key="status" title="状态" data-index="status" align="center">
        <template slot-scope="text">
          <a-tag :color="text|statusFilter">{{ text }}</a-tag>
        </template>
      </a-table-column>
      <a-table-column key="operation" title="操作" data-index="operation" align="center">
        <template slot-scope="text,record">
          <a @click="handleModify(record)">编辑</a>
          <a-divider type="vertical" />
          <a-dropdown>
            <a class="ant-dropdown-link" href="#">
              更多
              <a-icon type="down" />
            </a>
            <a-menu slot="overlay">
              <a-menu-item
                v-if="record.status!='published'"
                key="0"
                @click="handleModifyStatus(record,'published')"
              >
                <a>发布</a>
              </a-menu-item>
              <a-menu-item
                v-if="record.status!='draft'"
                key="1"
                @click="handleModifyStatus(record,'draft')"
              >
                <a>草稿</a>
              </a-menu-item>
              <a-menu-item
                v-if="record.status!='deleted'"
                key="2"
                @click="handleModifyStatus(record,'deleted')"
              >
                <a>删除</a>
              </a-menu-item>
            </a-menu>
          </a-dropdown>
        </template>
      </a-table-column>
      <!-- <template slot="timestamp" slot-scope="text">
        {{ text | parseTime('{y}-{m}-{d} {h}:{i}') }}
      </template>

      <template slot="importance" slot-scope="text">
        <icon-font v-for="i in text" :key="i" class="list-star" type="icon-star-fill" />
      </template>
      <template slot="status" slot-scope="text">
        <a-tag :color="text|statusFilter">{{ text }}</a-tag>
      </template>
      <template slot="operation">
        <a>编辑</a>
        <a-divider type="vertical" />
        <a-dropdown :trigger="['click']">
          <a class="ant-dropdown-link" href="#">
            更多 <a-icon type="down" />
          </a>
          <a-menu slot="overlay">
            <a-menu-item key="0">
              <a>发布</a>
            </a-menu-item>
            <a-menu-item key="1">
              <a>删除</a>
            </a-menu-item>
            <a-menu-divider />
            <a-menu-item key="3">3rd menu item</a-menu-item>
          </a-menu>
        </a-dropdown>
      </template>-->
    </a-table>
    <a-modal
      :title="modaTitle"
      width="50%"
      :visible="formModalVisible"
      @cancel="formModalVisible=false"
      @ok="createData"
    >
      <a-form :form="form">
        <a-form-item v-bind="formItemLayout" label="类型" has-feedback>
          <a-select
            v-decorator="[
              'type',
              {rules: [{ required: true, message: '请选择类型'}],initialValue:area[0].value}
            ]"
            placeholder="请选择"
          >
            <a-select-option v-for="item in area" :key="item.key" :value="item.key">{{ item.value }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="时间">
          <a-date-picker
            v-decorator="['timestamp', config]"
            placeholder="请选择日期"
            :locale="{today:'今天'}"
          />
        </a-form-item>
        <a-form-item label="标题" v-bind="formItemLayout" has-feedback>
          <a-input
            v-decorator="[
              'title',
              {rules: [{ required: true, message: '请输入标题!' }]}
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="状态" has-feedback>
          <a-select
            v-decorator="[
              'status'
            ]"
            placeholder="请选择"
          >
            <a-select-option v-for="item in status" :key="item" :value="item">{{ item }}</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="重要性">
          <a-rate v-decorator="['importance', {initialValue: 0}]" :count="3" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="点评" has-feedback>
          <a-textarea placeholder="请输入" :rows="4" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    width: '5%',
    scopedSlots: { customRender: 'id' }
  },
  {
    title: '时间',
    dataIndex: 'timestamp',
    width: '10%',
    scopedSlots: { customRender: 'timestamp' }
  },
  {
    title: '标题',
    dataIndex: 'title',
    width: '40%',
    scopedSlots: { customRender: 'title1' }
  },
  {
    title: '作者',
    dataIndex: 'author',
    scopedSlots: { customRender: 'author' }
  },
  {
    title: '审核人',
    dataIndex: 'reviewer',
    scopedSlots: { customRender: 'reviewer' }
  },
  {
    title: '重要性',
    dataIndex: 'importance',
    width: '10%',
    scopedSlots: { customRender: 'importance' }
  },
  {
    title: '阅读数',
    dataIndex: 'pageviews',
    scopedSlots: { customRender: 'pageviews' }
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status' }
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' }
  }
]
const area = [
  { key: 'CN', value: 'China(CN)' },
  { key: 'US', value: 'USA(US)' },
  { key: 'JP', value: 'Japan(JP)' },
  { key: 'EU', value: 'Eurozone(EU)' }
]
const status = ['published', 'draft', 'deleted']
const formItemLayout = {
  labelCol: {
    xs: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 12 }
  }
}
import { fetchList } from '@/api/article'
import moment from 'moment'
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'green',
        draft: '',
        deleted: 'red'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      data: [],
      area,
      status,
      pagination: {
        pageSize: 10
      },
      showColumn: false,
      query: {
        page: 1,
        limit: 10,
        title: undefined,
        importance: undefined,
        type: undefined
      },
      loading: true,
      formModalVisible: false,
      modaTitle: '创建',
      columns,
      form: this.$form.createForm(this, {}),
      formItemLayout,
      // dataFields: {
      //   title: '',
      //   timestamp: undefined,
      //   status: '',
      //   type: '',
      //   importance: 1
      // },
      config: {
        rules: [
          { type: 'object', required: true, message: '请选择时间' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      this.loading = true
      const { data } = await fetchList(this.query)
      this.data = data.items
      const pagination = { ...this.pagination }
      pagination.total = data.total
      this.pagination = pagination
      this.loading = false
    },
    filterTable(pagination, filters, sorter) {
      const query = { ...this.query }
      const obj = Object.keys(sorter)
      if (obj.length > 0) {
        // 判断对象是否为空
        // const sortField = sorter.field
        if (sorter.order === 'ascend') {
          query.sort = '-id'
        } else {
          query.sort = '+id'
        }
      }

      query.page = pagination.current
      this.query = query
      this.getList()
    },
    searchFilter() {
      this.getList()
    },
    toggleColumn() {
      this.showColumn = !this.showColumn
    },
    handleModifyStatus(record, status) {
      this.$message.success('操作成功')
      record.status = status
    },
    handleCreate() {
      this.modaTitle = '创建'
      this.formModalVisible = true
      this.form = this.$form.createForm(this, {})
    },
    handleModify(record) {
      // this.form.updateFields(this, { mapPropsToFields: (props) => {
      //   return this.$form.createFormField(record)
      // } })

      this.modaTitle = '编辑'
      this.formModalVisible = true
      const editData = { ...record, timestamp: moment(record.timestamp) }
      const { title, timestamp, status, type, importance } = editData
      const dataFields = { title, timestamp, status, type, importance }
      this.$nextTick(() => {
        // this.form.setFieldsValue(editData) // https://github.com/ant-design/ant-design/issues/8880
        this.form.setFieldsValue(dataFields)
      })
    },
    createData(e) {
      this.form.validateFields((err, values) => {
        if (!err) {
          const newData = values
          newData.timestamp = moment(values.timestamp).valueOf()
          newData.id = this.data[this.pagination.pageSize - 1]['id'] + 1
          this.data.unshift(newData)
          this.formModalVisible = false
        }
      })
    }
  }
}
</script>
<style lang='less' scoped>
</style>
