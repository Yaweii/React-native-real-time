import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {G, Path, Line, Rect, Defs, ClipPath } from 'react-native-svg'


import * as d3 from 'd3'


import labelFn from './labelFn'
// import generateData from './generateData'
// import streamDataStep from './streamDataStep'
import AnimatedAxisWrapper from './AnimatedAxisWrapper'
import AnimatedDataSeriesWrapper from './AnimatedDataSeriesWrapper'
// import BaseWrapper from './BaseWrapper'
import HorizontalAxis from './HorizontalAxis'
import VerticalAxis from './VerticalAxis'
import LineDataSeries from './LineDataSeries'


let addData;
// const transitionDuration = 300;


// setTimeout(() => {
// //     const view = [480, 320];
// //     const trbl = [0, 0, 0, 0]; // refactor, i don't understand the semantics of this.  Will i ever need trbl[1] or trbl[2] ?
// //     ReactDOM.render(
// //       <Container {...{view, trbl}} />
// //     , document.getElementById('js-app'));
// //   }, 0);
  

let count = 0;

function streamDataStep() {
    const value = Math.random() * 900 + 100;
    addData(value);
}

function generateData(size) {
    const data = [];
    for (let index = 0; index < size; index++) {
        const value = Math.random() * 900 + 100;
        data.push({ index, value });
    }
    return data;
}

export default class Container extends Component {
    static propTypes = {
        trbl: PropTypes.array.isRequired,
        view: PropTypes.array.isRequired
    };
    
    constructor(props) {
        super(props);
        this.state = {
            domainXMin: 100,
            domainXMax: 500,
            domainYMin: 0,
            domainYMax: 100,
            data: generateData(23)
        };
    }

    componentDidMount() {
        addData = (value) => {
            const data = this.state.data.slice(0);
            const index = data[data.length - 1].index + 1;
            data.push({ index, value });
            data.splice(index, 1)
            data.shift();
            this.setState({ data });
        };
        streamDataStep();
    }

    buildDataSeries(data, containerView, containerTrbl, horizontalAxisHeight, verticalAxisWidth, xScale, yScale) {
        console.log("XXX", data)
        const AnimatedLineDataSeries = AnimatedDataSeriesWrapper()(LineDataSeries);

        const trbl = [
            horizontalAxisHeight,
            verticalAxisWidth,
            horizontalAxisHeight,
            verticalAxisWidth
        ];
        const view = [
            containerView[0] - verticalAxisWidth * 2,
            containerView[1] - horizontalAxisHeight * 2
        ];
        return (
            <AnimatedLineDataSeries {...{ data, trbl, view, xScale, yScale }} />
        );
    }

    buildVerticalAxis(containerView, containerTrbl, horizontalAxisHeight, verticalAxisWidth, scale) {
        const AnimatedVerticalAxis = AnimatedAxisWrapper()(VerticalAxis);

        const view = [verticalAxisWidth, containerView[1] - horizontalAxisHeight * 2];
        const trbl = [horizontalAxisHeight, 0, 0, 0];
        const orientation = VerticalAxis.orientation.LEFT;
        const tickValues = scale.ticks();
        return (
            <AnimatedVerticalAxis {...{ scale, trbl, view, tickValues, orientation, labelFn }} />
        );
    }

    buildScale(domainMin, domainMax, range) {
        return d3.scaleLinear().domain([domainMin, domainMax]).range(range);
    }

    buildHorizontalAxis(containerView, containerTrbl, horizontalAxisHeight, verticalAxisWidth, scale) {
        const AnimatedHorizontalAxis = AnimatedAxisWrapper()(HorizontalAxis);

        const view = [containerView[0] - verticalAxisWidth * 2, horizontalAxisHeight];
        const trbl = [containerView[1] - horizontalAxisHeight, verticalAxisWidth, 0, verticalAxisWidth];
        const orientation = HorizontalAxis.orientation.BOTTOM;
        const tickValues = scale.ticks();
        return (
            <AnimatedHorizontalAxis {...{ scale, trbl, view, tickValues, orientation, labelFn }} />
        );
    }

    render() {
        // const view = [480, 320];
        // const trbl = [0, 0, 0, 0];

        const { view, trbl } = this.props;
        const { data } = this.state;
        const [domainYMin, domainYMax] = d3.extent(data, ({ value }) => value);
        const [domainXMin, domainXMax] = d3.extent(data, ({ index }) => index);
        const horizontalAxisHeight = 30;
        const verticalAxisWidth = 42;
        const marginSide = ((view[0] - verticalAxisWidth * 2) / data.length);
        const xScale = this.buildScale(domainXMin + 1, domainXMax - 2, [0 - marginSide, view[0] - verticalAxisWidth * 2 + marginSide]);
        const yScale = this.buildScale(domainYMin, domainYMax, [view[1] - horizontalAxisHeight * 2, 0]);
        return (
            <G>
                {this.buildHorizontalAxis(view, trbl, horizontalAxisHeight, verticalAxisWidth, xScale)}
                {this.buildVerticalAxis(view, trbl, horizontalAxisHeight, verticalAxisWidth, yScale)}
                {this.buildDataSeries(data, view, trbl, horizontalAxisHeight, verticalAxisWidth, xScale, yScale)}
            </G>
        );
    }
}

