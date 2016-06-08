import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import hoistStatics from 'hoist-non-react-statics'

const noop = () => {};
const getDocument = element => element.ownerDocument;
const clamp = (val, min, max) => Math.min(Math.max(val, min), max);
const getDisplayName = (WrappedComponent) => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
};

export default function draggable (options = {}) {
  return function wrappedInDraggable (WrappedComponent) {
    class Draggable extends Component {
      constructor (props) {
        super(props);

        this.state = {
          active: false
        }

        this.getPercentageValue = this.getPercentageValue.bind(this);
        this.startUpdates = this.startUpdates.bind(this);
        this.handleUpdate = this.handleUpdate.bind(this);
        this.stopUpdates = this.stopUpdates.bind(this);
        this.getPosition = this.getPosition.bind(this);
        this.getScaledValue = this.getScaledValue.bind(this);
        this.updateBoundingRect = this.updateBoundingRect.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
      }

      componentDidMount () {
        this.document = getDocument(ReactDOM.findDOMNode(this));
        const window  = this.window = this.document.defaultView;

        window.addEventListener("resize", this.updateBoundingRect);
        window.addEventListener("scroll", this.updateBoundingRect);

        this.updateBoundingRect();
      }

      componentWillUnmount () {
        const { window } = this;
        window.removeEventListener("resize", this.updateBoundingRect);
        window.removeEventListener("scroll", this.updateBoundingRect);
      }

      startUpdates (e) {
        const { document } = this;

        e.preventDefault();
        document.addEventListener("mousemove", this.handleUpdate);
        document.addEventListener("touchmove", this.handleUpdate);
        document.addEventListener("mouseup", this.stopUpdates);
        document.addEventListener("touchend", this.stopUpdates);

        const { x, y } = this.getPosition(e);
        this.setState({ active : true });
        this.updatePosition(x, y);
      }


      handleUpdate (e) {
        if (this.state.active) {
          e.preventDefault();
          const { x, y } = this.getPosition(e);
          this.updatePosition(x, y);
        }
      }

      stopUpdates () {
        if (this.state.active) {
          const { document } = this;

          document.removeEventListener("mousemove", this.handleUpdate);
          document.removeEventListener("touchmove", this.handleUpdate);
          document.removeEventListener("mouseup", this.stopUpdates);
          document.removeEventListener("touchend", this.stopUpdates);

          this.setState({ active : false });
        }
      }

      updatePosition (clientX, clientY) {
        const { rect } = this.state;

        if (options.single) {
          const value = this.props.vertical ?
                        (rect.bottom - clientY) / rect.height :
                        (clientX - rect.left) / rect.width;
          return this.props.onChange(this.getScaledValue(value));
        }

        const x = (clientX - rect.left) / rect.width;
        const y = (rect.bottom - clientY) / rect.height;
        return this.props.onChange(
          this.getScaledValue(x),
          this.getScaledValue(y)
        );
      }

      getPosition (e) {
        if (e.touches) {
          e = e.touches[0];
        }

        return {
          x: e.clientX,
          y: e.clientY
        };
      }

      getPercentageValue (value) {
        return (value / this.props.max) * 100 + "%";
      }

      getScaledValue (value) {
        return clamp(value, 0, 1) * this.props.max;
      }

      updateBoundingRect () {
        const rect = ReactDOM.findDOMNode(this).getBoundingClientRect();
        this.setState({ rect });
      }

      render () {
        return <WrappedComponent {...this.props} {...this.state}
                  startUpdates={this.startUpdates}
                  getPercentageValue={this.getPercentageValue} />;
      }
    }

    Draggable.displayName = `draggable(${getDisplayName(WrappedComponent)})`;
    Draggable.WrappedComponent = WrappedComponent;
    Draggable.propTypes = {
      onChange : PropTypes.func.isRequired,
      max : PropTypes.number
    };

    Draggable.defaultProps = {
      onChange: noop,
      max : 1
    }

    return hoistStatics(Draggable, WrappedComponent);
  }
}
