# NTColor
[![ESDoc coverage badge](https://natade-jp.github.io/js-ntcolor/badge.svg)](https://natade-jp.github.io/js-ntcolor/)
![MIT License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat)

- JavaScriptで色情報を扱う

# Install

```sh
npm install --save-dev ntcolor
```

# Use

```javascript
import NTColor from "ntcolor";
```

# Docs

https://natade-jp.github.io/js-ntcolor/

# Example

```javascript
> console.log(NTColor.newColorRGB(0x20, 0x40, 0x80).toAARRGGBB());
0xff204080

> console.log(NTColor.newColorRGB([0x20, 0x40, 0x80]).toAARRGGBB());
0xff204080

> console.log(NTColor.newColorRGB({ r: 0x20, g: 0x40, b: 0x80 }).toRRGGBB());
0x204080

> console.log(NTColor.newColorRGB({ r: 0x20, g: 0x40, b: 0x80, a: 0x00 }).toAARRGGBB());
0x00204080

> console.log(NTColor.newColorNormalizedRGB(0.0, 0.5, 1.0).toAARRGGBB());
0xff0080ff

> console.log(NTColor.newColorNormalizedRGB(0.0, 0.5, 1.0, 0.0).toAARRGGBB());
0x000080ff

> console.log(NTColor.newColorRGB(0x204080).toCSS255());
rgb(32,64,128)

> console.log(NTColor.newColorRGB(0x80204080).toCSS255());
rgba(32,64,128,0.502)

> console.log(NTColor.newColorRGB(0x204080).toCSSHex());
#204080

> console.log(NTColor.newColorRGB(0x12345678).toCSSHex());
#12345678

> console.log(NTColor.newColorRGB(0x204080).toCSSPercent());
rgb(13%,25%,50%)

> console.log(NTColor.newColorRGB(0x12345678).toCSSPercent());
rgba(20%,34%,47%,7%)
```
