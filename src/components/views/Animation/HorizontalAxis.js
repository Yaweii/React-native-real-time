import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {G, Path, Line, Rect, Defs, ClipPath, Text } from 'react-native-svg'

import labelFn from './labelFn'


export default class HorizontalAxis extends Component {
    static propTypes = {
        labelFn: PropTypes.func.isRequired,
        orientation: PropTypes.string.isRequired,
        scale: PropTypes.func.isRequired,
        tickValues: PropTypes.array.isRequired,
        trbl: PropTypes.array.isRequired,
        view: PropTypes.array.isRequired
    };

    static orientation = {
        BOTTOM: 'horizontal-axis-bottom',
        TOP: 'horizontal-axis-top'
    };

    buildTicks(tickValues, scale, labelFn, trbl, view, orientation) {
        return tickValues.map((tickValue, index) => {
            const xPos = scale(tickValue);
            let y2 = view[1];
            let y1 = y2 - 5;
            if (orientation === HorizontalAxis.orientation.BOTTOM) {
                y1 = 0;
                y2 = 5;
            }
            return (
                <G
                    key={index}
                    transform={`translate(${xPos}, 0)`}
                >
                    <Line
                        {...{ y1, y2 }}
                        stroke={'darkgray'}
                        x1={0}
                        x2={0}
                    />
                    <Text
                        dy={'1.4em'}
                        textAnchor={'middle'}
                        x={0}
                        y={0}
                    >{labelFn(tickValue, index)}</Text>
                </G>
            );
        });
    }

    render() {
        const { scale, view, trbl, labelFn, tickValues, orientation } = this.props;
        const [width, height] = view;
        const id = 'clip-path--' + Math.floor(+(new Date) + Math.random() * 0xffffff).toString(36);
        let y1 = 0;
        if (orientation === HorizontalAxis.orientation.TOP) {
            y1 = view[1];
        }
        const y2 = y1;
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
                    <Line
                        stroke="darkgray"
                        x1={0}
                        y1={0}
                        x2={view[0]}
                        y2={0}
                    />
                    {this.buildTicks(tickValues, scale, labelFn, trbl, view, orientation)}
                </G>
            </G>
        );
    }
}