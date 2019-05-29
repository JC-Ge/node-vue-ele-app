<template>
    <div class="dialog">
        <el-dialog
            title="添加资金信息"
            :visible="true"
            :close-on-click-modal="false"
            :close-on-click-escape="false"
            :modal-append-to-body="false"
        ></el-dialog>
    </div>
</template>

<script>
export default {
    name:"dialog",
    props:{
        dialog:Object 
    }
}
</script>

<style scoped>

</style>
