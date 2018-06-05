import React, {Component} from 'react'
import PropTypes from 'prop-types'
import * as d3 from 'd3'

import labelFn from './labelFn'

const AnimatedAxisWrapper = () => ComposedComponent => class extends Component {
    static propTypes = {
        scale: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);
        const { scale } = this.props;
        const [domainMin, domainMax] = scale.domain();
        this.state = {
            domainMax,
            domainMin
        };
    }

    componentWillReceiveProps(nextProps) {
        const [nextDomainMin, nextDomainMax] = nextProps.scale.domain();
        const [domainMin, domainMax] = this.props.scale.domain();
        if (nextDomainMin === domainMin && nextDomainMax === domainMax) {
            return;
        }
        d3.select(this).transition().tween('attr.domain'); // refactor, is this necessary to cancel previous transition?
        d3.select(this).transition().duration(transitionDuration).ease(d3.easeLinear).tween('attr.domain', () => {
            const minInterpolator = d3.interpolateNumber(this.state.domainMin, nextDomainMin);
            const maxInterpolator = d3.interpolateNumber(this.state.domainMax, nextDomainMax);
            return (t) => {
                this.setState({
                    domainMin: minInterpolator(t),
                    domainMax: maxInterpolator(t)
                });
            };
        });
    }

    render() {
        const { props } = this;
        const { scale } = props;
        const { domainMin, domainMax } = this.state;
        const newScale = scale.copy();
        newScale.domain([domainMin, domainMax]);
        const newProps = Object.assign({}, props, { scale: newScale });
        return (
            <ComposedComponent {...newProps} />
        );
    }
}

export default AnimatedAxisWrapper