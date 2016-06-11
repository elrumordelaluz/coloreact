# ColoReact

A tiny **Color Picker** for **React**


### Install

```
$ npm i --save coloreact
```

### How to use

```js

  import { ColorPicker } from 'coloreact';

  // ...
  return (
    <ColorPicker
      opacity={true}
      color={this.state.currentColor}
      onChange={this.showColorNow}
      onComplete={this.showLastColor} />
    );
  // ...

```

### Custom Parts

It is possible to create your own _ColorPicker_ using `Map` and `Slider`s.


```js
  import { Map, Slider } from 'coloreact';

  // ...
  return (
    <div className="myColorPicker">
      <Map
        x={this.state.saturation}
        y={this.state.value}
        max={100}
        backgroundColor={this.getHue()}
        onChange={this.handleSaturationAndValue}
      />
      <Slider
        vertical={true}
        value={this.state.hue}
        // type="hue"
        max={360}
        onChange={this.handleHue}
      />
    </div>  
  // ...


```
