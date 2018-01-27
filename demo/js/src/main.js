import { FromRGB8 } from "lib-colorifium";

window.addEventListener('load', () => {
  const orchid = { r: 153, g: 50, b: 204 };

  const hslOrchid = FromRGB8.toHSL(orchid);
  const hsvOrchid = FromRGB8.toHSV(orchid);
  const xyzOrchid = FromRGB8.toXYZ(orchid);
  const hexOrchid = FromRGB8.toHex(orchid);

  let result = `RGB: ${orchid.r}, ${orchid.g}, ${orchid.b}<br>`;
  result += `HSL: ${hslOrchid.h}, ${hslOrchid.s}, ${hslOrchid.l}<br>`;
  result += `HSV: ${hsvOrchid.h}, ${hsvOrchid.s}, ${hsvOrchid.v}<br>`;
  result += `XYZ: ${xyzOrchid.x}, ${xyzOrchid.y}, ${xyzOrchid.z}<br>`;
  result += `Hex: ${hexOrchid}`;

  document.getElementById('output').innerHTML = result;
});
