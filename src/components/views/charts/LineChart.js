import React, { Component } from 'react';
import ChartView from 'react-native-highcharts';

export default class LineChart extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        const vehicleData = this.props.speed
        var Highcharts = 'Highcharts';
        var conf = {
            chart: {
                type: 'spline',
                animation: Highcharts.svg, // don't animate in old IE
                marginRight: 10,
                events: {
                    load: function () {

                        // set up the updating of the chart each second
                        var series = this.series[0];

                        let closure = (() => {
                            let _x = -1;
                            return () => {
                                _x = (_x + 1) % data.length;
                                return {
                                    x: Date.now(),
                                    y: data[_x]
                                };
                            };
                        })();

                        setInterval(() => {
                            // pass the new values from the default values of ECG
                            series.addPoint(
                                [closure().x, closure().y],
                                true, true, false
                            );
                        }, 300);
                        // setInterval(function () {
                        //     var x = (new Date()).getTime(), // current time
                        //         y = vehicleData;
                        //     series.addPoint([x, y], true, true, false);
                        // }, 300);
                    }
                }
            },
            title: {
                text: 'Live random data'
            },
            xAxis: {
                type: 'datetime',
                tickPixelInterval: 150
            },
            yAxis: {
                title: {
                    text: 'Value'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 2);
                }
            },
            legend: {
                enabled: false
            },
            exporting: {
                enabled: false
            },
            series: [{
                name: 'Random data',
                data: (function () {
                    // generate an array of random data
                    var data = [],
                        time = (new Date()).getTime(),
                        i;

                    for (i = -19; i <= 0; i += 1) {
                        data.push({
                            x: time,
                            y: vehicleData
                        });
                    }
                    return data;
                }()),
                pointStart: Date.now() - 300 * 100,
                // pointInterval: 300,
            }]
        };


        // render() {
        //     const vehicleData = this.props.speed
        //     var Highcharts = 'Highcharts';
        //     var conf = {
        //         chart: {
        //             type: 'spline',
        //             animation: Highcharts.svg, // don't animate in old IE
        //             marginRight: 10,
        //             events: {
        //                 load: function () {

        //                     // set up the updating of the chart each second
        //                     const series = this.series[0];

        //                     const data = series.options.data.slice();

        //                     // update our x and y based on the current time
        //                     let closure = (() => {
        //                         let _x = -1;
        //                         return () => {
        //                             _x = (_x + 1) % data.length;
        //                             return {
        //                                 x: Date.now(),
        //                                 y: data[_x]
        //                             };
        //                         };
        //                     })();


        //                     setInterval(() => {
        //                         // pass the new values from the default values 
        //                         series.addPoint(
        //                             [closure().x, closure().y],
        //                             true, true, false
        //                         );
        //                     }, 30);
        //                 }
        //             }
        //         },
        //         title: {
        //             text: 'Live random data'
        //         },
        //         xAxis: {
        //             visible: false
        //         },
        //         yAxis: {
        //             title: {
        //                 text: 'Value'
        //             },
        //             plotLines: [{
        //                 series: { color: 'blue)', lineWidth: 1.5 }
        //             }]
        //         },
        //         tooltip: {
        //             formatter: function () {
        //                 return '<b>' + this.series.name + '</b><br/>' +
        //                     Highcharts.dateFormat('%Y-%m-%d %H:%M:%S', this.x) + '<br/>' +
        //                     Highcharts.numberFormat(this.y, 2);
        //             }
        //         },
        //         legend: {
        //             enabled: false
        //         },
        //         credits: {
        //             enabled: false
        //         },
        //         exporting: {
        //             enabled: false
        //         },
        //         series: [{
        //             name: 'Random data',
        //             data: (function () {
        //                 // generate an array of random data
        //                 var data = [],
        //                     time = (new Date()).getTime(),
        //                     i;

        //                 for (i = -19; i <= 0; i += 1) {
        //                     data.push({
        //                         x: time + i * 1000,
        //                         y: vehicleData
        //                     });
        //                 }

        //                 return data;
        //             }()),
        //             pointStart: Date.now() - 10 * 100,
        //             pointInterval: 30,
        //         }]
        //     };

        const options = {
            global: {
                useUTC: false
            },
            lang: {
                decimalPoint: ',',
                thousandsSep: '.'
            }
        };

        return (
            <ChartView style={{ height: 300 }} config={conf} options={options}></ChartView>
        );
    }
}

