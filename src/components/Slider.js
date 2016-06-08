import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import draggable from './Draggable';
import classNames from 'classnames/bind';
import styles from './Styles.css';

const cx = classNames.bind(styles);

class Slider extends Component {
  constructor (props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.getCss = this.getCss.bind(this);
  }

  getCss() {
    const attr = this.props.vertical ? 'bottom' : 'left';

    return {
      [attr] : this.props.getPercentageValue(this.props.value)
    };
  }

  render () {
    const background = this.props.background;
    return (
      <div
        className={cx({
          'Slider': true,
          'vertical': this.props.vertical,
          'horizontal': !this.props.vertical
        })}
        onMouseDown={this.props.startUpdates}
        onTouchStart={this.props.startUpdates}>

        <div className={cx({ 'Track': true })} style={{ background }} />
        {this.props.rect && <div className={cx({ 'Pointer': true })}  style={this.getCss()} />}
      </div>
    );
  }
}

Slider.propTypes = {
  value: PropTypes.number.isRequired,
  single: PropTypes.string,
  background: PropTypes.string
};

Slider.defaultProps = {
  value: 0,
  single: "vertical",
  background: ""
};

export default draggable({ single: true })(Slider);
