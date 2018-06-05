import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'
import Svg, { G, Path, Line, Text } from 'react-native-svg'


import labelFn from './labelFn'

const BaseWrapper = (props) => ComposedComponent => class extends Component {
    static propTypes = {
        trbl: PropTypes.array.isRequired,
        view: PropTypes.array.isRequired
    };

    constructor(props) {
        super(props);
    }
    render() {
        const { props } = this;
        const { view, trbl, children } = props;
        const viewBox = `0 0 ${view[0]} ${view[1]}`;
        return (
            <Svg
                {...{ viewBox }}
                height={view[1]}
                width={view[0]}
            >
                <G transform={`translate(${trbl[0]}, ${trbl[3]})`}>
                    <ComposedComponent {...props} />
                </G>
            </Svg>
        );
    }
}

export default BaseWrapper