import React from 'react'
import Svg, {
    G,
    Line,
    Path,
    Rect,
    Text
} from 'react-native-svg'
import * as shape from "d3-shape"
import * as path from "d3-path"
import * as scale from "d3-scale"
import {
    axisBottom as d3AxisBottom,
    axisLeft as d3AxisLeft,
} from 'd3-axis';

const d3 = {
    shape,
    path,
    scale,
}


const LineGraph = ({ }) => {
    const limit = 60 * 1,
        duration = 750,
        now = new Date(Date.now() - duration);

    const width = 500,
        height = 200;
    
    const groups = {
        current: {
            value: 0,
            color: 'orange',
            data: d3.range(limit).map(function(){
                return 0
            })
        },
        target: {
            value: 0,
            color: 'green',
            data: d3.range(limit).map(function() {
                return 0 
            })
        }
    };

    const xScale = d3.scale.scaleTime().domain([now - (limit - 2), now - duration]).range([0, width]);
    const yScale = d3.scale.scaleLinear().domain([0, 100]).range([height, 0]);

    const xAxis = d3AxisBottom()
        .scale(xScale);

    const yAxis = d3AxisLeft()
        .scale(yScale);

    const line = d3.shape
        .line()
        .x(function (d, i) { return x(now - (limit - 1 - i) * duration) })
        .y(function (d) { return y(d) })
        .curve(d3.shape.curveMonotoneX);

    const linePath = line(data);

    function tick() {
        now = new Date()

            // Add new values
            for (var name in groups) {
                var group = groups[name]
                //group.data.push(group.value) // Real values arrive at irregular intervals
                group.data.push(20 + Math.random() * 100)
                group.path.attr('d', line)
            }

            // Shift domain
            xScale.domain([now - (limit - 2) * duration, now - duration])

            // Slide x-axis left
            xAxis.transition()
                .duration(duration)
                .ease('linear')

            // Slide paths left
            paths.attr('transform', null)
                .transition()
                .duration(duration)
                .ease('linear')
                .attr('transform', 'translate(' + x(now - (limit - 1) * duration) + ')')
                .each('end', tick)

            // Remove oldest data point from each group
            for (var name in groups) {
                var group = groups[name]
                group.data.shift()
            }
        }


    // return (
    //     <svg
    //         className = "container"
    //         height = {height}
    //         width = {width}
    //     >
    //         <g
    //             className = "xAxis"
    //             ref = {node => d3Select(node).call(xAxis)}
    //             style={{
    //                 transform: `translateY(${height}px)`,
    //             }}
    //         />
    //         <g className="yAxis" ref={node => d3Select(node).call(yAxis)} />
    //         <g className="line">
    //             <path d={linePath} />
    //         </g>
    //     </svg>
    // )

}