import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {G, Path, Line, Rect, Defs, ClipPath, Text } from 'react-native-svg'

import labelFn from './labelFn'

export default class VerticalAxis extends Component {
    static propTypes = {
        labelFn: PropTypes.func.isRequired,
        orientation: PropTypes.string.isRequired,
        scale: PropTypes.func.isRequired,
        tickValues: PropTypes.array.isRequired,
        trbl: PropTypes.array.isRequired,
        view: PropTypes.array.isRequired
    };

    static orientation = {
        LEFT: 'horizontal-axis-left',
        RIGHT: 'horizontal-axis-right'
    };

    buildTicks(tickValues, scale, labelFn, trbl, view, orientation) {
        return tickValues.map((tickValue, index) => {
            const yPos = scale(tickValue);
            let x2 = view[0];
            let x1 = x2 - 5;
            let anchorPosition = 'end';
            let textXPos = x1 - 2;
            if (orientation === VerticalAxis.orientation.RIGHT) {
                x1 = 0;
                x2 = 5;
                anchorPosition = 'start';
                textXPos = x2 + 2;
            }
            return (
                <G
                    key={index}
                    transform={`translate(0, ${yPos})`}
                >
                    <Line
                        {...{ x1, x2 }}
                        stroke={'darkgray'}
                        y1={0}
                        y2={0}
                    />
                    {/* <Text
                        dy={3}
                        textAnchor={anchorPosition}
                        x={textXPos}
                        y={0}
                    >{labelFn(tickValue, index)}</Text> */}
                </G>
            );
        });
    }

    render() {
        const { scale, view, trbl, labelFn, tickValues, orientation } = this.props;
        let x1 = view[0];
        if (orientation === VerticalAxis.orientation.RIGHT) {
            x1 = 0;
        }
        const x2 = x1;
        return (
            <G transform={`translate(${trbl[3]}, ${trbl[0]})`}>
                <Line
                    {...{ x1, x2 }}
                    stroke="darkgray"
                    y1={0}
                    y2={view[1]}
                />
                {this.buildTicks(tickValues, scale, labelFn, trbl, view, orientation)}
            </G>
        );
    }
}