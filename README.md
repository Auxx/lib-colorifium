# lib-colorifium

Colour model conversion library.

[![npm version](https://badge.fury.io/js/lib-colorifium.svg)](https://badge.fury.io/js/lib-colorifium)

Currently supported colour models:

* **8 bit RGB** - most used colour model, described by three bytes
  corresponding to red, green and blue values. Possible values for each colour component
  are from *0* to *255*. 8 bit RGB colour model is represented by `RGB8` interface and
  sRGB colour profile with D65 illuminant is assumed. Support for different colour profiles
  and illuminants will be implemented in the future.
* **Floating point RGB** - `RGBF` interface represents the same colour model as `RGB8` but
  uses floating point number ranging from *0.0* to *1.0*. All colour conversion formulas
  work with this RGB representation.
* **HSL** - this model describes colour with Hue, Saturation and Luminosity components.
  Hue component corresponds to colour wheel and its value is a float number ranging from
  *0.0* to *360.0*. Saturation and luminosity components are float numbers
  ranging from *0.0* to *1.0*.
* **HSV** is a sister colour model to **HSL** with Hue, Saturation and Value components.
  HSV values are represented in the same way as HSL values.
* **XYZ** - this is a complex mathematical colour model in which *X*, *Y*, and *Z*
  components do not directly represent any familiar physical properties of colour.
  I'll be honest here - I have no idea how it works. All three components are described
  by three float numbers starting at *0.0*. They don't have any defined upper limit.

It is also possible to convert `RGB8` to hexadecimal representation.

## Installation

You can use your favourite nodejs package manager, the name of the library is `lib-colorifium`.

npm example:

`$ npm i --save lib-colorifium`

Yarn example:

`$ yarn add lib-colorifium`

## Usage

lib-colorifium is written in TypeScript so it is possible to use it in any web or nodejs
project. Type definitions are supplied as part of the library as well.

JavaScript example:

```javascript
const orchid = { r: 153, g: 50, b: 204 };
const hslOrchid = FromRGB8.toHSL(orchid);
console.log(`RGB(${orchid.r}, ${orchid.g}, ${orchid.b}) in HSL(${hslOrchid.h}, ${hslOrchid.s}, ${hslOrchid.l})`);
```

The same code will work perfectly in TypeScript project as well. Working JS and TS examples
can be found in [demo folder](https://github.com/Auxx/lib-colorifium/tree/master/demo).

## API

### `FromRGBF`

`FromRGBF` class contains static methods to convert `RGBF` colours into all other
colour models. This is a base class which knows how to convert RGB colours into everything else.
If you want to convert `HSL` to `XYZ` for example, you have to convert `HSL` to `RGBF` first
and then convert this value to `XYZ`. Some most used direct conversion paths will be
implemented in the future.

```javascript
export declare class FromRGBF {
    static toRGB8(rgb: RGBF): RGB8;
    static toRGB8(r: number, g: number, b: number): RGB8;
 
    static toHSL(rgb: RGBF): HSL;
    static toHSL(r: number, g: number, b: number): HSL;
 
    static toHSV(rgb: RGBF): HSV;
    static toHSV(r: number, g: number, b: number): HSV;
 
    static toXYZ(rgb: RGBF): XYZ;
    static toXYZ(r: number, g: number, b: number): XYZ;
}
```

### `FromRGB8`

This class contains static methods to convert `RGB8` (8 bit RGB) colours into all other
colour models. `FromRGBF` is used behind the scenes in most cases. `toHex()` method
converts RGB colour to its hexadecimal representation.

```javascript
export declare class FromRGB8 {
    static toRGBF(rgb: RGB8): RGBF;
    static toRGBF(r: number, g: number, b: number): RGBF;

    static toHSL(rgb: RGB8): HSL;
    static toHSL(r: number, g: number, b: number): HSL;

    static toHSV(rgb: RGB8): HSV;
    static toHSV(r: number, g: number, b: number): HSV;

    static toXYZ(rgb: RGB8): XYZ;
    static toXYZ(r: number, g: number, b: number): XYZ;

    static toHex(rgb: RGB8): string;
    static toHex(r: number, g: number, b: number): string;
}
```

### `FromHSL`

This class contains static methods to convert `HSL` colours into `RGB8` and `RGBF`.

```javascript
export declare class FromHSL {
    static toRGBF(hsl: HSL): RGBF;
    static toRGBF(h: number, s: number, l: number): RGBF;

    static toRGB8(hsl: HSL): RGB8;
    static toRGB8(h: number, s: number, l: number): RGB8;
}
```

### `FromHSV`

This class contains static methods to convert `HSV` colours into `RGB8` and `RGBF`.

```javascript
export declare class FromHSV {
    static toRGBF(hsv: HSV): RGBF;
    static toRGBF(h: number, s: number, v: number): RGBF;

    static toRGB8(hsv: HSV): RGB8;
    static toRGB8(h: number, s: number, v: number): RGB8;
}
```

### `FromXYZ`

This class contains static methods to convert `XYZ` colours into `RGB8` and `RGBF`.

```javascript
export declare class FromXYZ {
    static toRGBF(xyz: XYZ): RGBF;
    static toRGBF(x: number, y: number, z: number): RGBF;

    static toRGB8(xyz: XYZ): RGB8;
    static toRGB8(x: number, y: number, z: number): RGB8;
}
```

### Declared interfaces

These interfaces describe structures used to represent different colour models.

```javascript
export interface RGB8 {
    r: number;
    g: number;
    b: number;
}

export interface RGBF {
    r: number;
    g: number;
    b: number;
}

export interface HSL {
    h: number;
    s: number;
    l: number;
}

export interface HSV {
    h: number;
    s: number;
    v: number;
}

export interface XYZ {
    x: number;
    y: number;
    z: number;
}
```
