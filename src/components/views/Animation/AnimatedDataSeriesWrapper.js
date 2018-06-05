import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import labelFn from './labelFn'

const AnimatedDataSeriesWrapper = () => ComposedComponent => class extends Component {
    static propTypes = {
        xScale: PropTypes.func.isRequired,
        yScale: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        const { yScale, xScale } = this.props;
        const [domainXMin, domainXMax] = xScale.domain();
        const [domainYMin, domainYMax] = yScale.domain();
        this.state = {
            domainYMin,
            domainYMax,
            domainXMin,
            domainXMax
        };
    }

    componentWillReceiveProps(nextProps) {
        const [nextDomainXMin, nextDomainXMax] = nextProps.xScale.domain();
        const [domainXMin, domainXMax] = this.props.xScale.domain();
        const [nextDomainYMin, nextDomainYMax] = nextProps.yScale.domain();
        const [domainYMin, domainYMax] = this.props.yScale.domain();
        const domainYUnchanged = nextDomainYMin === domainYMin && nextDomainYMax === domainYMax;
        const domainXUnchanged = nextDomainXMin === domainXMin && nextDomainXMax === domainXMax;
        if (domainYUnchanged && domainXUnchanged) {
            return;
        }
        d3.select(this).transition().tween('attr.domain'); // refactor, is this necessary to cancel previous transition?
        d3.select(this).transition().duration(300).ease(d3.easeLinear).tween('attr.domain', () => {
            const minYInterpolator = d3.interpolateNumber(this.state.domainYMin, nextDomainYMin);
            const maxYInterpolator = d3.interpolateNumber(this.state.domainYMax, nextDomainYMax);
            const minXInterpolator = d3.interpolateNumber(this.state.domainXMin, nextDomainXMin);
            const maxXInterpolator = d3.interpolateNumber(this.state.domainXMax, nextDomainXMax);
            return (t) => {
                this.setState({
                    domainYMin: minYInterpolator(t),
                    domainYMax: maxYInterpolator(t),
                    domainXMin: minXInterpolator(t),
                    domainXMax: maxXInterpolator(t)
                });
            };
        }).on('end', streamDataStep); // refactor, this is a hacky way to get smoothy rendering
    }

    render() {
        const { props } = this;
        const { xScale, yScale } = props;
        const { domainYMin, domainYMax, domainXMin, domainXMax } = this.state;
        const newYScale = yScale.copy();
        const newXScale = xScale.copy();
        newYScale.domain([domainYMin, domainYMax]);
        newXScale.domain([domainXMin, domainXMax]);
        const newProps = Object.assign({}, props, { xScale: newXScale, yScale: newYScale });
        return (
            <ComposedComponent {...newProps} />
        );
    }
}

export default AnimatedDataSeriesWrapper