<template>
  <v-chart :id="pieDataConfig.id" :option="option" :styleObject="pieDataConfig.styleObject" v-on:setChart="setChartFn"></v-chart>
</template>

<script>
  export default {
    data() {
      let _this = this;

      return {
        option: {
          chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotBackgroundImage: null,
            plotShadow: false,
            type: 'pie',
            backgroundColor: 'transparent',
          },
          credits: {
            enabled: false //去掉地址
          },
          title: {
            text: ''
          },
          tooltip: {
            headerFormat: '{series.name}<br>',
            pointFormat: '{point.name}: <b>{point.percentage:.1f}%</b>'
          },
          plotOptions: {
            series: {
              allowPointSelect: true,
              borderColor: 'none'
            },
            pie: {
              allowPointSelect: true,
              cursor: 'pointer',
              dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                style: {
                  'color': '#fff',
                  'fontWeight': 'normal',
                  'textOutline': "none",
                  "fontSize": "12px"
                }
              },
              showInLegend: true
            }
          },
          // legend: {
          //     layout: 'vertical',
          //     floating: true,
          //     align: 'right',
          //     verticalAlign: 'top',
          //     squareSymbol: false,
          //     symbolWidth: 24,
          //     symbolHeight: 12,
          //     symbolRadius: 4,
          //     x: 0,
          //     y: 0,
          //     symbolPadding: 3,
          //     itemStyle: {
          //         color: '#0f263c',
          //         fontWeight: 'normal',
          //         fontSize: '14'
          //     }
          // },
          series: [{
            name: '',
            colorByPoint: true,
            data: []
          }]
        },
        curChartGlobal: {}
      };
    },
    props: ['pieDataArr', 'pieDataConfig'],
    watch: {
      pieDataArr() {
        this.setChartFn();
      }
    },
    created() {

    },
    methods: {
      setChartFn(chartGlobal) {
        var _this = this;

        if(chartGlobal != undefined) {
          this.curChartGlobal = chartGlobal;
        }

        this.curChartGlobal.series[0].update({
          data: _this.pieDataArr,
          name: this.pieDataConfig.title
        });
      }
    }
  };
</script>

<style lang="less" scoped>
  .title {
    text-align: center;
    color: #fff;
    font-size: 0.18rem;
  }
  .txt-center {
    cursor: pointer;
  }
</style>
