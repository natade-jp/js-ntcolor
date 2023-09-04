import NTColor from "./NTColor.js";

test("NTColor.newColorRGB", () => {
	expect(NTColor.newColorRGB(0x20, 0x40, 0x80).toAARRGGBB()).toBe(0xff204080);
	expect(NTColor.newColorRGB([0x20, 0x40, 0x80]).toAARRGGBB()).toBe(0xff204080);
	expect(NTColor.newColorRGB({ r: 0x20, g: 0x40, b: 0x80 }).toRRGGBB()).toBe(0x204080);
	expect(NTColor.newColorRGB({ r: 0x20, g: 0x40, b: 0x80, a: 0x00 }).toAARRGGBB()).toBe(0x00204080);
});

test("NTColor.newColorRGB", () => {
	expect(NTColor.newColorNormalizedRGB(0.0, 0.5, 1.0).toAARRGGBB()).toBe(0xff0080ff);
	expect(NTColor.newColorNormalizedRGB(0.0, 0.5, 1.0, 0.0).toAARRGGBB()).toBe(0x000080ff);
});

test("NTColor.toCSS255", () => {
	expect(NTColor.newColorRGB(0x204080).toCSS255()).toBe("rgb(32,64,128)");
	expect(NTColor.newColorRGB(0x80204080).toCSS255()).toBe("rgba(32,64,128,0.502)");
});

test("NTColor.toCSSHex", () => {
	expect(NTColor.newColorRGB(0x204080).toCSSHex()).toBe("#204080");
	expect(NTColor.newColorRGB(0x12345678).toCSSHex()).toBe("#12345678");
});

test("NTColor.toCSSPercent", () => {
	expect(NTColor.newColorRGB(0x204080).toCSSPercent()).toBe("rgb(13%,25%,50%)");
	expect(NTColor.newColorRGB(0x12345678).toCSSPercent()).toBe("rgba(20%,34%,47%,7%)");
});
