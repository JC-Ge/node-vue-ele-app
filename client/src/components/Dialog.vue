<template>
    <div class="dialog">
        <el-dialog
            :title="dialog.title"
            :visible.sync="dialog.show"
            :close-on-click-modal="false"
            :close-on-click-escape="false"
            :modal-append-to-body="false"
            top="50px"
        >
        <el-form 
            ref="form"
            :model="formData"  
            size='mini' 
            label-position="right" 
            label-width="80px"
            :rules="form_rules">
            <el-form-item label="收支类型">
                <el-select v-model="formData.type">
                    <el-option label="提现" value="提现"></el-option>
                    <el-option label="提现手续费" value="提现手续费"></el-option>
                    <el-option label="充值" value="充值"></el-option>
                    <el-option label="优惠券" value="优惠券"></el-option>
                    <el-option label="充值礼券" value="充值礼券"></el-option>
                    <el-option label="转账" value="转账"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="收支描述" prop="describe">
                <el-col :span="12">
                    <el-input v-model="formData.describe" autocomplete="off"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="收入" prop="income">
                <el-col :span="12">
                    <el-input v-model="formData.income" autocomplete="off"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="支出" prop="expend">
                <el-col :span="12">
                    <el-input v-model="formData.expend" autocomplete="off"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="账户现金" prop="cash">
                <el-col :span="12">
                    <el-input v-model="formData.cash" autocomplete="off"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item label="备注">
                <el-col :span="12">
                    <el-input type="textarea" v-model="formData.remark" autocomplete="off"></el-input>
                </el-col>
            </el-form-item>
            <el-form-item>
                <el-button @click="dialog.show=false">取消</el-button>
                <el-button  type="primary" @click="onSubmit('form')">提交</el-button>
            </el-form-item>
        </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:"dialog1",
    data(){
        return {
            format_type_list:[
                "提现",
                "提现手续费",
                "充值",
                "优惠券",
                "充值礼券",
                "转账"
            ],
            form_rules:{
                describe:[{required: true, message: '收支描述不能为空!', trigger: 'blur'}],
                income:[{required: true, message: '收入不能为空！', trigger: 'blur'}],
                expend:[{required: true, message: '支出不能为空！', trigger: 'blur'}],
                cash:[{required: true, message: '账户现金不能为空！', trigger: 'blur'}]
            }
        }
    },
    props:{
        dialog:Object,
        formData:{
            type:Object,
            default: ()=>{
                return {
                            type:"",
                            describe:"",
                            income:"",
                            expend:"",
                            cash:"",
                            remark:"",
                            id:""
                        }
            }
        }
    },
    methods:{
        onSubmit(form){
            this.$refs[form].validate((valid) => {
                const url = (this.dialog.option == 'add')?'add':`edit/${this.formData.id}`
                if(valid){
                   this.$axios.post(`/api/profiles/${url}`,this.formData).then(res => {
                        this.$message({
                            type:'success',
                            message:'添加成功！'
                        });
                        this.dialog.show = false;
                        this.$emit('updateProfile');
                    }).catch(err => {
                        this.$message('添加失败！')
                    });
                }
            })
        }
    }
}
</script>

<style scoped>

</style>
