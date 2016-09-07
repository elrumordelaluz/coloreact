# ColoReact

A tiny **Color Picker** for **React** [ [Demo](https://elrumordelaluz.github.io/coloreact/) ]


### Install

```
$ npm i --save coloreact
```

### How to use

```js

  import ColorPicker from 'coloreact';

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
        onChange={this.handleSaturationValue}
      />
      <Slider
        vertical={true}
        value={this.state.hue}
        max={360}
        onChange={this.handleHue}
      />
    </div>  
  // ...


```

### Examples

[Live examples](https://elrumordelaluz.github.io/coloreact/) | 
[Code](https://github.com/elrumordelaluz/coloreact/tree/master/examples)

```
$ npm start
# goto http://localhost:3040/
```

### License and Attribution

The project start as a derivate of the awesome [react-simple-colorpicker](https://github.com/WickyNilliams/react-simple-colorpicker) which is based on [react-colorpicker](https://github.com/stayradiated/react-colorpicker).  Licensed MIT.

### Docs 

coming soon
