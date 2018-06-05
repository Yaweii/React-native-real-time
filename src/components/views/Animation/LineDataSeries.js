import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import {G, Path, Line, Rect, Defs, ClipPath } from 'react-native-svg'

import labelFn from './labelFn'

export default class LineDataSeries extends Component {
    static propTypes = {
        data: PropTypes.array.isRequired,
        trbl: PropTypes.array.isRequired,
        view: PropTypes.array.isRequired,
        xScale: PropTypes.func.isRequired,
        yScale: PropTypes.func.isRequired
    };

    buildAreaPlot(data, view, trbl, xScale, yScale, stroke) {
        const area = d3.line();
        area.x(({ index }) => xScale(index));
        area.y(({ value }) => yScale(value));
        area.curve(d3.curveBasis);
        const d = area(data);
        return (
            <Path {...{ d, stroke, fill: 'none', strokeWidth: 3 }} />
        );
    }

    render() {
        const { trbl, view, data, xScale, yScale, year } = this.props;
        const stroke = 'steelblue';
        const [width, height] = view;
        const id = 'clip-path--' + Math.floor(+(new Date) + Math.random() * 0xffffff).toString(36);
        return (
            <G>
                <Defs>
                    <ClipPath {...{ id }}>
                        <Rect {...{ width, height }}></Rect>
                    </ClipPath>
                </Defs>
                <G
                    clipPath={`url(#${id})`}
                    transform={`translate(${trbl[3]}, ${trbl[0]})`}
                >
                    {this.buildAreaPlot(data, view, trbl, xScale, yScale, stroke)}
                </G>
            </G>
        );
    }
}