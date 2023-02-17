<template>
  <div>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      height="50vh"
      style="width: 100%;"
    >
      <el-table-column prop="orderNo" header-align="center" align="center" label="账号"></el-table-column>
      <el-table-column prop="orderNo" header-align="center" align="center" label="公司名称"></el-table-column>
      <el-table-column prop="companyNameA" header-align="center" align="center" label="姓名"></el-table-column>
      <el-table-column prop="companyNameA" header-align="center" align="center" label="电话"></el-table-column>
      <el-table-column prop="contractNo" header-align="center" align="center" label="获取时间"></el-table-column>
      <el-table-column prop="companyNameB" header-align="center" align="center" label="获取授权编码"></el-table-column>
    </el-table>
    <el-pagination
      @size-change="sizeChangeHandle"
      @current-change="currentChangeHandle"
      :current-page="page"
      :page-sizes="[10, 20, 50, 100]"
      :page-size="limit"
      :total="totalPage"
      layout="total, sizes, prev, pager, next, jumper"
    ></el-pagination>
  </div>
</template>

<script>
import { listPage } from '@/api/authorizeList'
export default {
  data () {
    return {
      dataList: [],
      page: 1,
      limit: 10,
      totalPage: 0,
      dataListLoading: false
    }
  },
  mounted () {
    this.getDataList('reset')
  },
  methods: {
    // 获取数据列表
    getDataList (_type) {
      if (_type === 'reset') {
        this.page = 1
        this.limit = 10
      }
      this.dataListLoading = true
      let params = { page: this.page, limit: this.limit }
      listPage(params).then(({ data }) => {
        if (data && data.success === true) {
          this.dataList = data.data.rows
          this.totalPage = data.data.total
        } else {
          this.$message.error(data.message)
          this.dataList = []
          this.totalPage = 0
        }
        this.dataListLoading = false
      })
    },
    // 每页数
    sizeChangeHandle (val) {
      this.limit = val
      this.page = 1
      this.getDataList()
    },
    // 当前页
    currentChangeHandle (val) {
      this.page = val
      this.getDataList()
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
