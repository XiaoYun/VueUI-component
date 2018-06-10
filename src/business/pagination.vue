<template>
    <l-pagination :pageInfo="pageInfo" @change="changePage"></l-pagination>
</template>

<script>
    export default {
        data() {
            return {
                "pageInfo":{
                    pageSize:10,
                    pageIndex:40,
                    totalCount:4000,
                    totalPage:100
                }
            };
        },
        methods:{
            init(){

            },
            changePage(){
            }
        }
    };
</script>