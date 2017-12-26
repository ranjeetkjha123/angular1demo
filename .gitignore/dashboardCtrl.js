
angular.module('dashboardCtrl', []).controller('dashboardCtrl', dashboardCtrl);
dashboardCtrl.$inject = ['$colorService','$scope','lineDataService']
function dashboardCtrl($colorService,$scope,lineDataService){


    var flotChartColors = {
        chartColor1: $colorService.getColor('chart1').toRgb(),
        chartColor2: $colorService.getColor('chart2').toRgb(),
        chartColor3: $colorService.getColor('chart3').toRgb(),
        chartColor4: $colorService.getColor('chart4').toRgb(),
        chartColor5: $colorService.getColor('chart5').toRgb(),
        chartHover1: $colorService.getColor('chart1').setAlpha(0.2).toRgba(),
        chartHover2: $colorService.getColor('chart2').setAlpha(0.3).toRgba(),
        chartHover3: $colorService.getColor('chart3').setAlpha(0.3).toRgba(),
        chartHover4: $colorService.getColor('chart4').setAlpha(0.3).toRgba(),
        chartHover5: $colorService.getColor('chart5').setAlpha(0.3).toRgba(),
        gridColor: $colorService.getColor('grey4').toHex(),
        labelColor: $colorService.getColor('grey2').toHex()
    };

   $scope.donutChart = {
        data: [{
            label: "Sales 1",
            data: 25,
            color: [flotChartColors.chartColor1],
            highlightColor: [flotChartColors.chartHover1]
        }, {
            label: "Sales 2",
            data: 15,
            color: [flotChartColors.chartColor2],
            highlightColor: [flotChartColors.chartHover2]
        }, {
            label: "Sales 3",
            data: 18,
            color: [flotChartColors.chartColor3],
            highlightColor: [flotChartColors.chartHover3]
        }, {
            label: "Sales 4",
            data: 20,
            color: [flotChartColors.chartColor4],
            highlightColor: [flotChartColors.chartHover4]
        }, {
            label: "Sales 5",
            data: 10,
            color: [flotChartColors.chartColor5],
            highlightColor: [flotChartColors.chartHover5]
        }],
        options: {
            series: {
                pie: {
                    show: true,
                    innerRadius: 0.7,
                    centerLabel: {
                        show: true,
                        color: flotChartColors.gridColor,
                        text: "65%",
                        font: "Source Sans Pro",
                        fontSize: 18,
                        paddingX: 4,
                        paddingY: 0,
                        textBaseline: 'bottom'
                    },
                    subLabel: {
                        show: true,
                        color: flotChartColors.chartColor1,
                        text: "Sales",
                        font: "Source Sans Pro",
                        fontSize: 22,
                        paddingX: 1,
                        paddingY: 10,
                        textBaseline: 'middle'
                    },
                    donutLabel: {
                        show: true,
                        color: flotChartColors.labelColor,
                        text: "Proprietary",
                        font: "Source Sans Pro",
                        fontSize: 20
                    },
                    stroke: {
                        width: 0
                    }
                }
            },
            grid: {
                hoverable: true
            },
            tooltip: {
                show: true,
                shifts: {
                    x: 0,
                    y: -30
                },
                content: "%p.0%, %s"
            },
            legend: {
                show: true,
                backgroundColor: "transparent",
                labelFormatter: function (label) {
                    return '<span class="legend-styling">' + label + '</span>';
                },
                labelBoxBorderColor: "transparent"
            }
        },
        onPlotClick: function () {
            //Code to be executed when plot is clicked.
        },
        onPlotHover: function () {
            //Code to be executed when plot area is hovered.
        },
        donutLabels: {
            centerLabel: 'SALES',
            subLabel: '5%',
            donutLabel: 'PROPRIETARY'
        }
    };
	

    var flotChartColorstc = {
        chartColor: $colorService.getColor('chart1').toRgb(),
        chartFill: $colorService.getColor('chart1').setAlpha(0.2).toRgba(),
        gridColor: $colorService.getColor('grey4').toHex(),
        tickColor: $colorService.getColor('grey6').toHex(),
        borderColor: $colorService.getColor('grey2').setAlpha(0.5).toRgba(),
        transparent: "rgba(0, 0, 0, 0)",
    };

    function randomTimelineData() {
        var min = 1167692400000; //represents 1 January 2007
        var max = 1220911200000; //represents 8 September 2008
        var step = 345600000; // represents 4 days

        var dataPoints = [];

        //for every 4 days between specified dates create a random number between 80 & 150
        for (var i = min; i <= max; i += step) {
            //Make March 2 2008 to april 2 2008 zero
            if (!(i > 1204457710000 && i < 1207142075000)) {
                dataPoints.push(i);
                dataPoints.push(Math.floor(Math.random() * (150 - 80) + 80));
            }

        }

        var offset = 259200000; // 3 days
        dataPoints = lineDataService.addZeroPoints(dataPoints, offset);
        return dataPoints;
    }

    //The preselected range on the timeline
    var rangeStart = 1205708400000;
    var rangeEnd = 1217628000000;

    //store so we can share between the two timeline charts
    var timelineData = randomTimelineData();

    //Timeline Chart
$scope.timelineChart = {
        data: [{
            data: timelineData,
            lines: {
                show: true,
                fill: true,
                lineWidth: 1,
                fillColor: {
                    colors: [{
                        opacity: 0.0
                    }, {
                        opacity: 0.3
                    }]
                }
            },
            shadowSize: 0
        }],
        options: {
            xaxes: [{
                mode: 'time'
            }],
            yaxes: [{
                min: 0,
                max: 200,
                show: false
            }],
            colors: [flotChartColorstc.chartColor],
            grid: {
                color: [flotChartColorstc.gridColor],
                tickColor: [flotChartColorstc.transparent]
            },
            tooltip: false,
            timeline: {
                color: flotChartColorstc.chartFill,
                start: rangeStart,
                end: rangeEnd,
                zoom: {
                    enabled: true,
                    minimumRange: 604800000
                },
                keyboardNavigation: true,
                dragHandles: {
                    width: 5,
                    color: flotChartColorstc.chartColor,
                    tooltips: {
                        enabled: true,
                        onHover: true,
                        onDrag: true,
                        onDragEnd: false
                    },
                    tooltipFormatter: function (value) {
                        var date = new Date(value);
                        var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
                        return date.getDate() + " " + monthNames[date.getMonth()] + " " + date.getFullYear();
                    }
                },
                enabled: true,
                callback: function (position) {
                    //set new values for the min and max of the detailed chart
                    tc.detailedChart.options.xaxes[0].min = position.start;
                    tc.detailedChart.options.xaxes[0].max = position.end;

                    //ensure the chart updates
                    $scope.$digest();
                }
            }
        }
    };

$scope.detailedChart = {
        data: [{
            data: timelineData,
            lines: {
                show: true,
                fill: true,
                lineWidth: 1,
                fillColor: {
                    colors: [{
                        opacity: 0.1
                    }, {
                        opacity: 0.1
                    }]
                }
            },
            shadowSize: 0
        }],
        options: {
            xaxes: [{
                mode: 'time',
                min: rangeStart,
                max: rangeEnd,
                tickColor: [flotChartColorstc.transparent]
            }],
            yaxes: [{
                min: 0,
                max: 201
            }],
            legend: {
                show: false
            },
            colors: [flotChartColorstc.chartColor],
            grid: {
                color: [flotChartColorstc.gridColor],
                tickColor: [flotChartColorstc.tickColor],
                borderWidth: {
                    "bottom": 1,
                    "left": 1,
                    "top": 0,
                    "right": 0
                },
                borderColor: {
                    "bottom": [flotChartColorstc.borderColor],
                    "left": [flotChartColorstc.borderColor]
                },
                hoverable: true
            },
            tooltip: {
                show: true,
                shifts: {
                    x: 0,
                    y: -48
                },
                content: "<strong>%x</strong><br/>%y,000 items added"
            }
        }
    };
    var flotChartColorslc  = {
        chartColor: $colorService.getColor('chart1').toRgb(),
        chartForecast: $colorService.getColor('chart1').setAlpha(0.06).toRgba(),
        gridColor: $colorService.getColor('grey4').toHex(),
        tickColor: $colorService.getColor('grey6').toHex(),
        borderColor: $colorService.getColor('grey2').setAlpha(0.5).toRgba()
    };

$scope.lineChart = {
        data: [{
            label: "line",
            data: [
                [1, 34],
                [2, 25],
                [3, 19],
                [4, 34],
                [5, 32],
                [6, 44]
            ],
            forecastData: [
                [7, 45],
                [8, 50],
                [9, 55]
            ]
        }],
        lineoptions: {
            series: {
                lines: {
                    show: true,
                    lineWidth: 1,
                    fill: true,
                    fillColor: {
                        colors: [{
                            opacity: 0.1
                        }, {
                            opacity: 0.1
                        }]
                    }
                },
                shadowSize: 0,
                highlightColor: [flotChartColorslc.chartColor],
                forecastFillColor: [flotChartColorslc.chartForecast],
                forecastColor: [flotChartColorslc.chartColor],
                forecastDashStyle: [5]
            },
            xaxis: {
                tickDecimals: 0
            },
            colors: [flotChartColorslc.chartColor],
            grid: {
                color: [flotChartColorslc.gridColor],
                hoverable: true,
                clickable: true,
                tickColor: [flotChartColorslc.tickColor],
                borderWidth: {
                    "left": 1,
                    "bottom": 1,
                    "right": 0,
                    "top": 0
                },
                borderColor: {
                    "left": [flotChartColorslc.borderColor],
                    "bottom": [flotChartColorslc.borderColor]
                }
            },
            legend: {
                show: false
            },
            tooltip: {
                show: true,
                shifts: {
                    x: 0,
                    y: -35
                },
                content: "x: %x, y: %y"
            }
        },
        onPlotClick: function () {
            //Code to be executed when plot is clicked.
        },
        onPlotHover: function () {
            //Code to be executed when plot area is hovered.
        }

    };
	
};

