<template>
  <div>
    <el-form :inline="true" @keyup.enter.native="getDataList('reset')">
      <el-form-item label="账号: ">
        <el-input v-model="dataForm.orderNo" placeholder></el-input>
      </el-form-item>
      <el-form-item label="公司名称: ">
        <el-input v-model="dataForm.companyNameA" placeholder></el-input>
      </el-form-item>
      <el-form-item label="姓名: ">
        <el-input v-model="dataForm.companyNameB" placeholder></el-input>
      </el-form-item>
      <el-form-item label="电话: ">
        <el-input v-model="dataForm.orderStatus" placeholder></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="success" @click="getDataList('reset')">查询</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table
      :data="dataList"
      border
      v-loading="dataListLoading"
      height="50vh"
      style="width: 100%;"
    >
      <el-table-column type="index" header-align="center" align="center" width="50" label="序号"></el-table-column>
      <el-table-column prop="orderNo" header-align="center" align="center" label="ID"></el-table-column>
      <el-table-column prop="companyNameA" header-align="center" align="center" label="账号"></el-table-column>
      <el-table-column prop="contractNo" header-align="center" align="center" label="密码"></el-table-column>
      <el-table-column prop="companyNameB" header-align="center" align="center" label="注册会员"></el-table-column>
      <el-table-column prop="subjects" header-align="center" align="center" label="公司名称"></el-table-column>
      <el-table-column prop="subjects" header-align="center" align="center" label="姓名"></el-table-column>
      <el-table-column prop="subjects" header-align="center" align="center" label="电话"></el-table-column>
      <el-table-column prop="subjects" header-align="center" align="center" label="邮箱"></el-table-column>
      <el-table-column prop="subjects" header-align="center" align="center" label="国家"></el-table-column>
      <el-table-column prop="subjects" header-align="center" align="center" label="地区"></el-table-column>
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
import { listPage } from '@/api/orderList'
export default {
  data () {
    return {
      dataForm: {
        orderNo: '',
        companyNameA: '',
        companyNameB: '',
        orderStatus: ''
      },
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
      let params = { ...this.dataForm, page: this.page, limit: this.limit }
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
    },
    // 重置
    resetForm () {
      this.dataForm = {
        orderNo: '',
        companyNameA: '',
        companyNameB: '',
        orderStatus: ''
      }
    }
  }
}
</script>
<style lang="scss" scoped>
</style>
