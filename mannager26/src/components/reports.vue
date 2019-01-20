<template>
  <div>
    <!-- 顶部的面包屑导航 -->
    <el-row>
      <el-col :span="24">
        <div class="grid-content bg-purple-dark">
          <myBreadcrumb :leavl2="leavl2" :leavl3="leavl3"></myBreadcrumb>
        </div>
      </el-col>
    </el-row>
   <!-- 图标的盒子 -->
      <div  ref='echarts' style="width: 800px;height:500px;"></div>

  </div>
</template>
<script>
import echarts from 'echarts'
export default {
  data() {
    return {
      leavl2: "数据统计",
      leavl3: "数据报表",
      //图标的数据
      option:
         {
    title: {
        text: '数据统计'
    },
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                backgroundColor: '#6a7985'
            }
        }
    },
    legend: {
        data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis : [
        {
            type : 'category',
            boundaryGap : false,
            data : ['周一','周二','周三','周四','周五','周六','周日']
        }
    ],
    yAxis : [
        {
            type : 'value'
        }
    ],
    series : [
        {
            name:'邮件营销',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[120, 132, 101, 134, 90, 230, 210]
        },
        {
            name:'联盟广告',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[220, 182, 191, 234, 290, 330, 310]
        },
        {
            name:'视频广告',
            type:'line',
            stack: '总量',
            areaStyle: {},
            data:[150, 232, 201, 154, 190, 330, 410]
        },
        {
            name:'直接访问',
            type:'line',
            stack: '总量',
            areaStyle: {normal: {}},
            data:[320, 332, 301, 334, 390, 330, 320]
        },
        {
            name:'搜索引擎',
            type:'line',
            stack: '总量',
            label: {
                normal: {
                    show: true,
                    position: 'top'
                }
            },
            areaStyle: {normal: {}},
            data:[820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
}
      
  
    };
  },
  //mounted之后才能获取到dom元素
 async mounted() {
    
    let myChart = echarts.init(this.$refs.echarts);
    //调用接口
    let res = await this.$axios.get('reports/type/1');
    console.log(res);
    //循环遍历替换数据
    for (const key in res.data.data) {
      this.option[key] = res.data.data[key]
    }
    //设置不留白
    this.option.xAxis[0].boundaryGap = false;
      myChart.setOption(this.option);
  },

};
</script>
<style scope>
.bg-purple-dark {
  background: #99a9bf;
}
/* 顶部面包屑的样式 */
.el-breadcrumb {
  height: 45px;
  line-height: 45px;
}
/*  */
</style>