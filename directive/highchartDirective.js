    angular.module('unitary')
    .directive('hcPieChart', function () {
                    return {
                        restrict: 'E',
                        template: '<div></div>',
                        scope: {
                            title: '@',
                            data: '=',
                            axis : '='
                        },
                        link: function (scope, element) {
                            scope.$watch('data', function(newValue, oldValue) {
                            if (newValue)
                                Highcharts.chart(element[0], {
                                    chart: {
                                        type: 'scatter'
                                    },
                                    title: {
                                        text: "Machine Data"
                                    },
                                    xAxis: {
                                    title: {
                                        enabled: true,
                                        text: scope.axis[1]
                                    },
                                    startOnTick: true,
                                    endOnTick: true,
                                    showLastLabel: true
                                },
                                yAxis: {
                                    title: {
                                        text: scope.axis[0],
                                         enabled: true,
                                    }
                                },
                                    plotOptions: {
                                        scatter: {
                                marker: {
                                    radius: 2,
                                    states: {
                                        hover: {
                                            enabled: true,
                                            lineColor: 'rgb(100,100,100)'
                                        }
                                    }
                                },
                                states: {
                                    hover: {
                                        marker: {
                                            enabled: false
                                        }
                                    }
                                },
                                tooltip: {
                                    headerFormat: '<b>'+scope.axis[0]+' , '+scope.axis[1]+'</b><br>',
                                    pointFormat: '{point.x} , {point.y}'
                                }
                            }
                                    },
                                    series: [{
                                        showInLegend: false,
                                        data: scope.data,
                                        turboThreshold : 0
                                    }]
                                });
                                 }, true);
                              
                        }
                    };
                })
                