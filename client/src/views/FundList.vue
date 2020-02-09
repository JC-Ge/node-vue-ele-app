<template>
<div class="fillContainer">
  <div>
    <el-form :inline="true" ref="add_data" :model="search_data">
      <el-form-item label="按照时间筛选：">
        <el-date-picker           
          v-model="search_data.dateStart"
          type="datetime"
          placeholder="请选择开始时间">
        </el-date-picker>
        --
        <el-date-picker           
          v-model="search_data.dateEnd"
          type="datetime"
          placeholder="请选择结束时间">
        </el-date-picker>
      </el-form-item>
      <el-button type="primary" size="small" icon="search" @click="handleSearch">筛选</el-button>
      <el-form-item class="btnRight">
        <el-button type="primary" size="small" icom="view" v-if="user.identity==='manager'" @click="handleAdd()">添加</el-button>
      </el-form-item>
    </el-form>
  </div>
  <div class="table_container">
    <el-table 
      v-if="tableData.length > 0" 
      :data="tableData" 
      max-height="400px"
      border>
        <el-table-column align="center" type="index"  label="序号" width="60"></el-table-column>
        <el-table-column align="center" prop="date" label="创建时间" width="230">
            <template slot-scope="scope">
            <i class="el-icon-time"></i>
            <span style="margin-left: 10px">{{ scope.row.date }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="type" label="收支类型" width="120"></el-table-column>
        <el-table-column align="center" prop="describe" label="收支描述" width="150"></el-table-column>
        <el-table-column align="center" prop="income" label="收入" width="60">
          <template slot-scope="scope">
            <span style="color:#00d053">{{ scope.row.income }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="expend" label="支出" width="60">
          <template slot-scope="scope">
            <span style="color:#f56767">{{ scope.row.expend }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="cash" label="账户现金" width="80">
          <template slot-scope="scope">
            <span style="color:#4db3ff">{{ scope.row.cash }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="remark" label="备注" width="120"></el-table-column>
        <el-table-column label="操作" prop="operation" align="center" fixed="right" width="180" v-if="user.identity==='manager'">  
          <template slot-scope="scope">
            <el-button
              type="warning"
              icon="edit"
              size="small"
              @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
            <el-button
              size="small"
              type="danger"
              icon="delete"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
    </el-table>
    <el-row>
      <el-col :span="24">
        <div class="pagination">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page.sync="paginations.page_index"
            :page-sizes="paginations.page_sizes"
            :page-size.sync="paginations.page_size"
            layout="total, prev, pager, next,sizes,jumper"
            :total="paginations.total">
        </el-pagination>
        </div>
      </el-col>
    </el-row>
  </div>
  <Dialog @updateProfile="updateProfile" :dialog="dialog" :formData="formData"></Dialog>
</div>
</template>

<script>
import Dialog from '../components/Dialog'
export default {
    name:'fundList',
    data(){
        return {
            tableData:[],
            allTableData:[],
            filterTableData:[],
            dialog:{
              show:false,
              title:'',
              option:'edit'
            },
            formData:{
                type:"",
                describe:"",
                income:"",
                expend:"",
                cash:"",
                remark:"",
                id:""
            },
            paginations:{
              page_index:1,
              total:0,
              page_size:5,
              page_sizes:[5,10,15,20]
            },
            search_data:{
              dateStart:'',
              dateEnd:''
            }
        }
    },
    components:{
      Dialog
    },
    created(){
        this.getProfile();
    },
    computed:{
      user(){
        return this.$store.getters.user;
      }
    },
    methods:{
        getProfile(){
            this.$axios.get('/api/profiles').then(res => {
                this.allTableData = res.data;
                this.filterTableData = res.data;
                this.setPaginations();
            }).catch(err => {
                console.log(err)
            })
        },
        setPaginations(){
            this.paginations.total = this.allTableData.length;
            this.tableData = this.allTableData.filter((item,index) => {
              return index < this.paginations.page_size;
            })
        },
        updateProfile(){
          this.getProfile();
        },
        handleEdit(index,row){
          this.dialog = {
            show:true,
            title:'编辑资金信息',
            option:'edit'
          }
          this.formData = {
            type:row.type,
            describe:row.describe,
            income:row.income,
            expend:row.expend,
            cash:row.cash,
            remark:row.remark,
            id:row._id
          }
        },
        handleDelete(index,row){
          this.$axios.delete(`/api/profiles/delete/${row._id}`).then(res => {
            this.$message({
              type:'success',
              message:'删除成功！'
            })
            this.getProfile();
          }).catch(err => {
            this.$message({
              type:"fail",
              message:'删除失败！'
            })
          })
        },
        handleAdd(){
           this.dialog = {
              show:true,
              title:'添加资金信息',
              option:'add'
            }
            this.formData = {
                  type:"",
                  describe:"",
                  income:"",
                  expend:"",
                  cash:"",
                  remark:"",
                  id:""
              }
        },
        handleSizeChange(page_size){
          this.paginations.page_index = 1;
          this.tableData = this.allTableData.filter((item,index) => {
            return index < this.paginations.page_size;
          })
        },
        handleCurrentChange(page){
          // 当前页第一个元素的下标
          let index = this.paginations.page_size*(page-1);
          let nums = this.paginations.page_size*page;
          let tables = [];
          for(let i = index;i < nums;i++){
            if(this.allTableData[i]){
              tables.push(this.allTableData[i]);
            }
          }
          this.tableData = tables;
        },
        handleSearch(){
          if(!this.search_data.dateStart || !this.search_data.dateEnd){
            this.$message({
              type:'warning',
              message:'请选择时间区间！'
            })
            this.getProfile();
          }else{
            let startTime = this.search_data.dateStart.getTime();
            let endTime = this.search_data.dateEnd.getTime();

            this.allTableData = this.filterTableData.filter((item,index) => {
              let temp = new Date(item.date).getTime();
              return temp>=startTime && temp<=endTime;
            })
            this.setPaginations();
          }
        }
    }
}
</script>

<style scoped>
.fillContainer{
    width:100%;
    height:100%;
    padding:16px;
    box-sizing:border-box;
}
.btnRight{
  float:right;
}
.pagination{
  text-align: right;
  margin-top: 10px;
}
</style>
