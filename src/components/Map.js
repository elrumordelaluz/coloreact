import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import draggable from './Draggable';
import classNames from 'classnames/bind';
import styles from './Styles.css';

const cx = classNames.bind(styles);

class Map extends Component {
  constructor (props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render () {
    const backgroundColor = this.props.backgroundColor;
    return (
      <div
        className={cx({
          'Map': true,
          [this.props.className]: true,
          'active': this.props.active
        })}
        onMouseDown={this.props.startUpdates}
        onTouchStart={this.props.startUpdates}
        >

        <div
          className={cx({ 'Background': true})}
          style={{ backgroundColor }} />

        {
          this.props.rect && (
          <div
            className={cx({
              'Pointer': true,
            })}
            style={{
              left: this.props.getPercentageValue(this.props.x),
              bottom: this.props.getPercentageValue(this.props.y)
            }} />
          )
        }
      </div>
    );
  }
}

Map.propTypes = {
  x: React.PropTypes.number.isRequired,
  y: React.PropTypes.number.isRequired,
  backgroundColor: React.PropTypes.string,
  className: React.PropTypes.string
};

Map.defaultProps = {
  x: 0,
  y: 0,
  backgroundColor: "transparent",
  className: ""
};

export default draggable()(Map);
