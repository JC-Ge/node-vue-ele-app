<template>
    <div class="dialog">
        <el-dialog
            title="添加资金信息"
            :visible.sync="dialog.show"
            :close-on-click-modal="false"
            :close-on-click-escape="false"
            :modal-append-to-body="false"
        >
        <el-form :model="form">
            <el-form-item label="收支类型" >
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option label="提现" value="shanghai"></el-option>
                    <el-option label="提现手续费" value="beijing"></el-option>
                    <el-option label="充值" value="beijing"></el-option>
                    <el-option label="优惠券" value="beijing"></el-option>
                    <el-option label="充值礼券" value="beijing"></el-option>
                    <el-option label="转账" value="beijing"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="收支描述" >
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="收入" >
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="支出" >
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="账户现金" >
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="备注" >
                <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        </el-dialog>
    </div>
</template>

<script>
export default {
    name:"dialog",
    data(){
        return {
            formData:{
                type:"",
                describe:" ",
                income:" ",
                expend:" ",
                cash:" ",
                remark:" ",
                id:""
            },
            format_type_list:[
                "提现",
                "提现手续费",
                "充值",
                "优惠券",
                "充值礼券",
                "转账"
            ]
        }
    },
    props:{
        dialog:Object 
    }
}
</script>

<style scoped>

</style>
