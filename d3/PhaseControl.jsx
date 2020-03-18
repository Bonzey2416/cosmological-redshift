import React from 'react';
import PropTypes from 'prop-types';
import * as d3 from 'd3';
import 'd3-drag';

export default class PhaseControl extends React.Component {
    render() {
        const xPos =
            this.props.xScale(
                ((
                    ((this.props.phase * this.props.width) + this.props.offset) /
                    this.props.width)
               + 0.5) % 1);

        return <line x1={xPos} y1={this.props.padding}
                     x2={xPos} y2={this.props.height - this.props.padding}
                     className="phase-control"
                     stroke="#ff7070" strokeWidth={3} />;
    }
    componentDidMount() {
        const el = d3.select('.phase-control');
        el.call(d3.drag().on('drag', this.dragmove.bind(this)));
    }
    dragmove(e) {
        const w = this.props.width - this.props.paddingLeft;

        let newPhase = (
            (d3.event.x - this.props.paddingLeft)
        ) / w;

        const offset = this.props.offset / this.props.width;

        newPhase = (newPhase - offset + 0.5) % 1;

        this.props.onPhaseUpdate(newPhase);
    }

};

PhaseControl.propTypes = {
    xScale: PropTypes.func.isRequired,
    phase: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    offset: PropTypes.number.isRequired,
    padding: PropTypes.number.isRequired,
    paddingLeft: PropTypes.number.isRequired,
    onPhaseUpdate: PropTypes.func.isRequired
};

