/**
 * 8 bit RGB (0-255 values).
 */
export interface RGB8 {
  r: number;
  g: number;
  b: number;
}

/**
 * RGB representation in float numbers (0.0-1.0 values).
 */
export interface RGBF {
  r: number;
  g: number;
  b: number;
}

/**
 * HSL colour model representation.
 * H component is represented by degrees (0-360).
 * S and L components are represented by a float number (0.0-1.0).
 */
export interface HSL {
  h: number;
  s: number;
  l: number;
}

/**
 * HSV colour model representation.
 * H component is represented by degrees (0-360).
 * S and V components are represented by a float number (0.0-1.0).
 */
export interface HSV {
  h: number;
  s: number;
  v: number;
}

/**
 * XYZ colour model representation.
 * All values are float numbers.
 * I have no idea what are their boundaries.
 */
export interface XYZ {
  x: number;
  y: number;
  z: number;
}

/**
 * L*ab colour model representation.
 */
export interface Lab {
  l: number;
  a: number;
  b: number;
}

/**
 * L*uv colour model representation.
 */
export interface Luv {
  l: number;
  u: number;
  v: number;
}

/**
 * CMY colour model representation.
 */
export interface CMY {
  c: number;
  m: number;
  y: number;
}

/**
 * CMYK colour model representation.
 */
export interface CMYK {
  c: number;
  m: number;
  y: number;
  k: number;
}
