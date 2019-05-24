<template>
    <div class="index">
        <HeadNav></HeadNav>
        <div>
            <el-row>
                <el-col :span="3"></el-col>
                <el-col :span="9"><router-view></router-view></el-col>
            </el-row>
        </div>
    </div>
</template>

<script>
import HeadNav from '../components/HeadNav'

export default {
    name:"index",
    components:{
        HeadNav:HeadNav
    }
}
</script>

<style>
.index{
    width: 100%;
    height: 100%;
}
</style>
