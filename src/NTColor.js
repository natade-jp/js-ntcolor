/**
 * The script is part of SenkoJS.
 *
 * AUTHOR:
 *  natade (http://twitter.com/natadea)
 *
 * LICENSE:
 *  The MIT license https://opensource.org/licenses/MIT
 */

/**
 * 1職の色情報を扱うクラス (immutable)
 */
export default class NTColor {
	/**
	 * コンストラクタ
	 */
	constructor() {
		// 中身は 0 ~ 1に正規化した値とする

		/**
		 * 赤色成分 0...1
		 * @types {number}
		 */
		this.r = 0.0;

		/**
		 * 緑色成分 0...1
		 * @types {number}
		 */
		this.g = 0.0;

		/**
		 * 青色成分 0...1
		 * @types {number}
		 */
		this.b = 0.0;

		/**
		 * 透明度成分 0...1
		 * @types {number}
		 */
		this.a = 1.0;
	}

	/**
	 * 色を表示できる範囲内に収める
	 * @returns {NTColor}
	 */
	limit() {
		const color = new NTColor();
		color.r = NTColor._limit(this.r);
		color.g = NTColor._limit(this.g);
		color.b = NTColor._limit(this.b);
		color.a = NTColor._limit(this.a);
		return color;
	}

	/**
	 * 色をアルファ値で焼きこむ
	 * @returns {NTColor}
	 */
	bake() {
		const color = new NTColor();
		color.r = this.r * this.a;
		color.g = this.g * this.a;
		color.b = this.b * this.a;
		color.a = 1.0;
		return color.limit();
	}

	/**
	 * 加法混色でミックスする
	 * @param {NTColor} x
	 * @returns {NTColor}
	 */
	addColorMixture(x) {
		// 加法混色
		if (!(x instanceof NTColor)) {
			throw "IllegalArgumentException";
		}
		return NTColor.newColorNormalizedRGB(this.r + x.r * x.a, this.g + x.g * x.a, this.b + x.b * x.a, this.a);
	}

	/**
	 * 減法混色でミックスする
	 * @param {NTColor} x
	 * @returns {NTColor}
	 */
	subColorMixture(x) {
		// 減法混色
		if (!(x instanceof NTColor)) {
			throw "IllegalArgumentException";
		}
		const r = Math.min(this.r, x.r);
		const g = Math.min(this.g, x.g);
		const b = Math.min(this.b, x.b);
		return NTColor.newColorNormalizedRGB(
			NTColor._mix(this.r, r, x.a),
			NTColor._mix(this.g, g, x.a),
			NTColor._mix(this.b, b, x.a),
			this.a
		);
	}

	/**
	 * 各色成分を掛け算する
	 * @param {NTColor|number} x
	 * @returns {NTColor}
	 */
	mul(x) {
		if (x instanceof NTColor) {
			return NTColor.newColorNormalizedRGB(this.r * x.r, this.g * x.g, this.b * x.b, this.a * x.a);
		} else if (typeof x === "number") {
			return NTColor.newColorNormalizedRGB(this.r * x, this.g * x, this.b * x, this.a);
		} else {
			throw "IllegalArgumentException";
		}
	}

	/**
	 * オブジェクトを複製する
	 * @returns {NTColor}
	 */
	clone() {
		const color = new NTColor();
		color.r = this.r;
		color.g = this.g;
		color.b = this.b;
		color.a = this.a;
		return color;
	}

	/**
	 * 文字列化する
	 * @returns {string}
	 */
	toString() {
		return "NTColor[" + this.getCSSHex() + ", " + this.getCSS255() + ", " + this.getCSSPercent() + "]";
	}

	/**
	 * 線形補間する
	 * @param {number} v0
	 * @param {number} v1
	 * @param {number} x
	 * @returns {number}
	 * @private
	 */
	static _mix(v0, v1, x) {
		return v0 + (v1 - v0) * x;
	}

	/**
	 * 指定した値を0...1の範囲にする
	 * @param {number} x
	 * @returns {number}
	 * @private
	 */
	static _limit(x) {
		return Math.max(Math.min(x, 1.0), 0.0);
	}

	/**
	 * 指定した値を負の値へ整数化する
	 * @param {number} x
	 * @returns {number}
	 * @private
	 */
	static _flact(x) {
		return x - Math.floor(x);
	}

	/**
	 * 16進数の文字列化する
	 * @param {number} x
	 * @returns {string}
	 * @private
	 */
	static _hex(x) {
		const str = Math.round(x * 255.0).toString(16);
		if (str.length === 1) {
			return "0" + str;
		} else {
			return str;
		}
	}

	/**
	 * 内部のデータをRGBAで書き換える
	 * @param {number} r
	 * @param {number} g
	 * @param {number} b
	 * @param {number} [a]
	 * @returns {NTColor}
	 * @private
	 */
	_setRGB(r, g, b, a) {
		this.r = r;
		this.g = g;
		this.b = b;
		if (a) this.a = a;
		return this;
	}

	/**
	 * 内部のデータをhsvaで書き換える
	 * @param {number} h
	 * @param {number} s
	 * @param {number} v
	 * @param {number} [a]
	 * @returns {NTColor}
	 * @private
	 */
	_setHSV(h, s, v, a) {
		let i, f;

		this.r = v;
		this.g = v;
		this.b = v;
		if (a) this.a = a;

		if (s > 0.0) {
			h *= 6.0;
			i = ~~Math.floor(h);
			f = h - i;
			if (i === 0) {
				this.g *= 1.0 - s * (1.0 - f);
				this.b *= 1.0 - s;
			} else if (i === 1) {
				this.r *= 1.0 - s * f;
				this.b *= 1.0 - s;
			} else if (i === 2) {
				this.r *= 1.0 - s;
				this.b *= 1.0 - s * (1.0 - f);
			} else if (i === 3) {
				this.r *= 1.0 - s;
				this.g *= 1.0 - s * f;
			} else if (i === 4) {
				this.r *= 1.0 - s * (1.0 - f);
				this.g *= 1.0 - s;
			} else if (i === 5) {
				this.g *= 1.0 - s;
				this.b *= 1.0 - s * f;
			}
		}
		return this;
	}

	/**
	 * 内部のデータをhslaで書き換える
	 * @param {number} h
	 * @param {number} s
	 * @param {number} l
	 * @param {number} [a]
	 * @returns {NTColor}
	 * @private
	 */
	_setHSL(h, s, l, a) {
		if (a) this.a = a;

		if (s === 0.0) {
			this.r = 0.0;
			this.g = 0.0;
			this.b = 0.0;
			return this;
		}

		let max;
		if (l < 0.5) {
			max = l * (1.0 + s);
		} else {
			max = l * (1.0 - s) + s;
		}
		const min = 2.0 * l - max;
		const delta = max - min;

		h *= 6.0;
		const i = ~~Math.floor(h);
		const f = h - i;

		if (i === 0) {
			this.r = max;
			this.g = max - delta * (1.0 - f);
			this.b = min;
		} else if (i === 1) {
			this.r = min + delta * (1.0 - f);
			this.g = max;
			this.b = min;
		} else if (i === 2) {
			this.r = min;
			this.g = max;
			this.b = max - delta * (1.0 - f);
		} else if (i === 3) {
			this.r = min;
			this.g = min + delta * (1.0 - f);
			this.b = max;
		} else if (i === 4) {
			this.r = max - delta * (1.0 - f);
			this.g = min;
			this.b = max;
		} else if (i === 5) {
			this.r = max;
			this.g = min;
			this.b = min + delta * (1.0 - f);
		}

		return this;
	}

	/**
	 * 内部のデータをrgbaの値で取得する
	 * @returns {{r: number, g: number, b: number, a: number}}
	 * @private
	 */
	_getRGB() {
		return {
			r: this.r,
			g: this.g,
			b: this.b,
			a: this.a
		};
	}

	/**
	 * 内部のデータをhsvaの値で取得する
	 * @returns {{h: number, s: number, v: number, a: number}}
	 * @private
	 */
	_getHSV() {
		const max = Math.max(this.r, this.g, this.b);
		const min = Math.min(this.r, this.g, this.b);
		const delta = max - min;

		let h = 0;
		let s = max - min;
		const v = max;

		if (max !== 0.0) {
			s /= max;
		}

		if (delta === 0.0) {
			return { h: h, s: s, v: v, a: this.a };
		}

		if (max === this.r) {
			h = (this.g - this.b) / delta;
			if (h < 0.0) {
				h += 6.0;
			}
		} else if (max === this.g) {
			h = 2.0 + (this.b - this.r) / delta;
		} else {
			h = 4.0 + (this.r - this.g) / delta;
		}
		h /= 6.0;

		return {
			h: h,
			s: s,
			v: v,
			a: this.a
		};
	}

	/**
	 * 内部のデータをhslaの値で取得する
	 * @returns {{h: number, s: number, l: number, a: number}}
	 * @private
	 */
	_getHSL() {
		const max = Math.max(this.r, this.g, this.b);
		const min = Math.min(this.r, this.g, this.b);

		const l = (max + min) * 0.5;
		const delta = max - min;

		if (delta === 0) {
			return { h: 0, l: l, s: 0, a: this.a };
		}

		let s;
		if (l < 0.5) {
			s = delta / (max + min);
		} else {
			s = delta / (2.0 - max - min);
		}

		let h;
		if (max === this.r) {
			h = (this.g - this.b) / delta;
			if (h < 0.0) {
				h += 6.0;
			}
		} else if (max === this.g) {
			h = 2.0 + (this.b - this.r) / delta;
		} else {
			h = 4.0 + (this.r - this.g) / delta;
		}
		h /= 6.0;

		return {
			h: h,
			s: s,
			l: l,
			a: this.a
		};
	}

	/**
	 * 0...1 に正規化された色を取得する
	 * @returns {{r: number, g: number, b: number, a: number}}
	 */
	getNormalizedRGB() {
		return this._getRGB();
	}

	/**
	 * 0...255 に正規化された色を取得する
	 * @returns {{r: number, g: number, b: number, a: number}}
	 */
	getRGB() {
		return {
			r: Math.round(this.r * 255.0),
			g: Math.round(this.g * 255.0),
			b: Math.round(this.b * 255.0),
			a: Math.round(this.a * 255.0)
		};
	}

	/**
	 * 0x00RRGGBB の値を取得する
	 * @returns {number}
	 */
	getRRGGBB() {
		return (
			(Math.round(255.0 * NTColor._limit(this.r)) << 16) |
			(Math.round(255.0 * NTColor._limit(this.g)) << 8) |
			Math.round(255.0 * NTColor._limit(this.b))
		);
	}

	/**
	 * 0xAARRGGBB の値を取得する
	 * @returns {number}
	 */
	getAARRGGBB() {
		return (
			(Math.round(255.0 * NTColor._limit(this.a)) << 24) |
			(Math.round(255.0 * NTColor._limit(this.r)) << 16) |
			(Math.round(255.0 * NTColor._limit(this.g)) << 8) |
			Math.round(255.0 * NTColor._limit(this.b))
		);
	}

	/**
	 * 0...1 に正規化された HSV の値を取得する
	 * @returns {{h: number, s: number, v: number, a: number}}
	 * @private
	 */
	getNormalizedHSV() {
		return this._getHSV();
	}

	/**
	 * 0...255 の HSV の値を取得する。ただし色相は 0...359 とする。
	 * @returns {{h: number, s: number, v: number, a: number}}
	 * @private
	 */
	getHSV() {
		const color = this.getNormalizedHSV();
		color.h = Math.round(color.h * 360.0);
		color.s = Math.round(color.s * 255.0);
		color.v = Math.round(color.v * 255.0);
		color.a = Math.round(color.a * 255.0);
		return color;
	}

	/**
	 * 0...1 に正規化された HSL の値を取得する
	 * @returns {{h: number, s: number, l: number, a: number}}
	 * @private
	 */
	getNormalizedHSL() {
		return this._getHSL();
	}

	/**
	 * 0...255 の HSL の値を取得する。ただし色相は 0...359 とする。
	 * @returns {{h: number, s: number, l: number, a: number}}
	 */
	getHSL() {
		const color = this.getNormalizedHSL();
		color.h = Math.round(color.h * 360.0);
		color.s = Math.round(color.s * 255.0);
		color.l = Math.round(color.l * 255.0);
		color.a = Math.round(color.a * 255.0);
		return color;
	}

	/**
	 * 0...255 の赤成分
	 * @returns {number}
	 */
	getRed() {
		return Math.round(this.r * 255.0);
	}

	/**
	 * 0...255 の緑成分
	 * @returns {number}
	 */
	getGreen() {
		return Math.round(this.g * 255.0);
	}

	/**
	 * 0...255 の青成分
	 * @returns {number}
	 */
	getBlue() {
		return Math.round(this.b * 255.0);
	}

	/**
	 * 0...255 のアルファ成分
	 * @returns {number}
	 */
	getAlpha() {
		return Math.round(this.b * 255.0);
	}

	/**
	 * 明るい色を取得する
	 * @returns {NTColor}
	 */
	brighter() {
		const FACTOR = 1.0 / 0.7;
		return this.mul(FACTOR).limit();
	}

	/**
	 * 暗い色を取得する
	 * @returns {NTColor}
	 */
	darker() {
		const FACTOR = 0.7;
		return this.mul(FACTOR).limit();
	}

	/**
	 * CSSで使用できる16進数の色情報のテキストを取得する
	 * @returns {string}
	 */
	getCSSHex() {
		if (this.a === 1.0) {
			return (
				"#" +
				NTColor._hex(NTColor._limit(this.r)) +
				NTColor._hex(NTColor._limit(this.g)) +
				NTColor._hex(NTColor._limit(this.b))
			);
		} else {
			return (
				"#" +
				NTColor._hex(NTColor._limit(this.a)) +
				NTColor._hex(NTColor._limit(this.r)) +
				NTColor._hex(NTColor._limit(this.g)) +
				NTColor._hex(NTColor._limit(this.b))
			);
		}
	}

	/**
	 * CSSで使用できる 0...1 のrgb/rgbaの色情報のテキストを取得する
	 * @returns {string}
	 */
	getCSS255() {
		if (this.a === 1.0) {
			return (
				"rgb(" +
				Math.round(NTColor._limit(this.r) * 255) +
				"," +
				Math.round(NTColor._limit(this.g) * 255) +
				"," +
				Math.round(NTColor._limit(this.b) * 255) +
				")"
			);
		} else {
			return (
				"rgba(" +
				Math.round(NTColor._limit(this.r) * 255) +
				"," +
				Math.round(NTColor._limit(this.g) * 255) +
				"," +
				Math.round(NTColor._limit(this.b) * 255) +
				"," +
				this.a +
				")"
			);
		}
	}

	/**
	 * CSSで使用できるパーセンテージのrgb/rgbaの色情報のテキストを取得する
	 * @returns {string}
	 */
	getCSSPercent() {
		if (this.a === 1.0) {
			return (
				"rgb(" +
				Math.round(NTColor._limit(this.r) * 100) +
				"%," +
				Math.round(NTColor._limit(this.g) * 100) +
				"%," +
				Math.round(NTColor._limit(this.b) * 100) +
				"%)"
			);
		} else {
			return (
				"rgba(" +
				Math.round(NTColor._limit(this.r) * 100) +
				"%," +
				Math.round(NTColor._limit(this.g) * 100) +
				"%," +
				Math.round(NTColor._limit(this.b) * 100) +
				"%," +
				Math.round(NTColor._limit(this.a) * 100) +
				"%)"
			);
		}
	}

	/**
	 * 指定した透明度の色情報を作成して取得する
	 * @param {number} a
	 * @returns {NTColor}
	 */
	setAlpha(a) {
		const color = this.clone();
		color.a = a;
		return color;
	}

	/**
	 * 色の型情報
	 * @typedef {Object} NTColorInputColorRGBA
	 * @property {number} [r]
	 * @property {number} [g]
	 * @property {number} [b]
	 * @property {number} [a]
	 */

	/**
	 * 指定した 0...1 の色情報からオブジェクトを作成する
	 * @param {number|NTColorInputColorRGBA|number[]} color_or_r
	 * @param {number} [g]
	 * @param {number} [b]
	 * @param {number} [a = 1.0]
	 * @returns {NTColor}
	 */
	static newColorNormalizedRGB(color_or_r, g, b, a) {
		let in_r = 0.0;
		let in_g = 0.0;
		let in_b = 0.0;
		let in_a = 1.0;
		if (arguments.length === 1) {
			if (typeof color_or_r === "object") {
				if (!Array.isArray(color_or_r)) {
					if (color_or_r.r) in_r = color_or_r.r;
					if (color_or_r.g) in_g = color_or_r.g;
					if (color_or_r.b) in_b = color_or_r.b;
					if (color_or_r.a) in_a = color_or_r.a;
				} else {
					if (color_or_r.length >= 3) {
						in_r = color_or_r[0];
						in_g = color_or_r[1];
						in_b = color_or_r[2];
					}
					if (color_or_r.length >= 4) {
						in_a = color_or_r[3];
					}
				}
			} else {
				throw "newColorNormalizedRGB";
			}
		} else {
			if (arguments.length >= 3) {
				in_r = arguments[0];
				in_g = g;
				in_b = b;
			}
			if (arguments.length >= 4) {
				in_a = a;
			}
		}
		// 出力時にLimitする。入力時にはLimitしない。
		const color = new NTColor();
		color._setRGB(in_r, in_g, in_b, in_a);
		return color;
	}

	/**
	 * 指定した 0...255 の色情報からオブジェクトを作成する
	 * @param {number|NTColorInputColorRGBA|number[]} color_or_aarrggbb
	 * @param {number|boolean} [g_or_is_load_alpha = false]
	 * @param {number} [b]
	 * @param {number} [a=255.0]
	 * @returns {NTColor}
	 */
	static newColorRGB(color_or_aarrggbb, g_or_is_load_alpha, b, a) {
		let in_r = 0.0;
		let in_g = 0.0;
		let in_b = 0.0;
		let in_a = 255.0;
		if (arguments.length <= 2) {
			if (typeof color_or_aarrggbb === "number") {
				in_r = (color_or_aarrggbb >> 16) & 0xff;
				in_g = (color_or_aarrggbb >> 8) & 0xff;
				in_b = color_or_aarrggbb & 0xff;
				if (g_or_is_load_alpha) {
					in_a = (color_or_aarrggbb >> 24) & 0xff;
				}
			} else if (typeof color_or_aarrggbb === "object") {
				if (!Array.isArray(color_or_aarrggbb)) {
					if (color_or_aarrggbb.r) in_r = color_or_aarrggbb.r;
					if (color_or_aarrggbb.g) in_g = color_or_aarrggbb.g;
					if (color_or_aarrggbb.b) in_b = color_or_aarrggbb.b;
					if (color_or_aarrggbb.a) in_a = color_or_aarrggbb.a;
				} else {
					if (color_or_aarrggbb.length >= 3) {
						in_r = color_or_aarrggbb[0];
						in_g = color_or_aarrggbb[1];
						in_b = color_or_aarrggbb[2];
					}
					if (color_or_aarrggbb.length >= 4) {
						in_a = color_or_aarrggbb[3];
					}
				}
			} else {
				throw "newColorNormalizedRGB";
			}
		} else if (arguments.length >= 3) {
			in_r = arguments[0];
			in_g = arguments[1];
			in_b = arguments[2];
			if (arguments.length >= 4) {
				in_a = arguments[3];
			}
		}
		// 出力時にLimitする。入力時にはLimitしない。
		const color = new NTColor();
		color._setRGB(in_r / 255.0, in_g / 255.0, in_b / 255.0, in_a / 255.0);
		return color;
	}

	/**
	 * 色の型情報
	 * @typedef {Object} NTColorInputColorHSVA
	 * @property {number} [h]
	 * @property {number} [s]
	 * @property {number} [v]
	 * @property {number} [a]
	 */

	/**
	 * 指定した 0...1 の色情報からオブジェクトを作成する
	 * @param {number|NTColorInputColorHSVA|number[]} color_or_h
	 * @param {number} [s]
	 * @param {number} [v]
	 * @param {number} [a=1.0]
	 * @returns {NTColor}
	 */
	static newColorNormalizedHSV(color_or_h, s, v, a) {
		let in_h = 0.0;
		let in_s = 0.0;
		let in_v = 0.0;
		let in_a = 1.0;
		if (arguments.length === 1) {
			if (typeof color_or_h === "object") {
				if (!Array.isArray(color_or_h)) {
					if (color_or_h.h) in_h = color_or_h.h;
					if (color_or_h.s) in_s = color_or_h.s;
					if (color_or_h.v) in_v = color_or_h.v;
					if (color_or_h.a) in_a = color_or_h.a;
				} else {
					if (color_or_h.length >= 3) {
						in_h = color_or_h[0];
						in_s = color_or_h[1];
						in_v = color_or_h[2];
					}
					if (color_or_h.length >= 4) {
						in_a = color_or_h[3];
					}
				}
			} else {
				throw "newColorNormalizedHSV";
			}
		} else {
			if (arguments.length >= 3) {
				in_h = arguments[0];
				in_s = s;
				in_v = v;
			}
			if (arguments.length >= 4) {
				in_a = a;
			}
		}
		// HSVの計算上この時点でLimitさせる
		in_s = NTColor._limit(in_s);
		in_v = NTColor._limit(in_v);
		const color = new NTColor();
		color._setHSV(NTColor._flact(in_h), in_s, in_v, in_a);
		return color;
	}

	/**
	 * 指定した 0...360, 0...255 の色情報からオブジェクトを作成する
	 * @param {number|NTColorInputColorHSVA|number[]} color_or_h
	 * @param {number} [s]
	 * @param {number} [v]
	 * @param {number} [a=255.0]
	 * @returns {NTColor}
	 */
	static newColorHSV(color_or_h, s, v, a) {
		let in_h = 0.0;
		let in_s = 0.0;
		let in_v = 0.0;
		let in_a = 255.0;
		if (arguments.length <= 2) {
			if (typeof color_or_h === "object") {
				if (!Array.isArray(color_or_h)) {
					if (color_or_h.h) in_h = color_or_h.h;
					if (color_or_h.s) in_s = color_or_h.s;
					if (color_or_h.v) in_v = color_or_h.v;
					if (color_or_h.a) in_a = color_or_h.a;
				} else {
					if (color_or_h.length >= 3) {
						in_h = color_or_h[0];
						in_s = color_or_h[1];
						in_v = color_or_h[2];
					}
					if (color_or_h.length >= 4) {
						in_a = color_or_h[3];
					}
				}
			} else {
				throw "newColorNormalizedRGB";
			}
		} else if (arguments.length >= 3) {
			in_h = arguments[0];
			in_s = s;
			in_v = v;
			if (arguments.length >= 4) {
				in_a = a;
			}
		}
		return NTColor.newColorNormalizedHSV(in_h / 360.0, in_s / 255.0, in_v / 255.0, in_a / 255.0);
	}

	/**
	 * 色の型情報
	 * @typedef {Object} NTColorInputColorHSLA
	 * @property {number} [h]
	 * @property {number} [s]
	 * @property {number} [l]
	 * @property {number} [a]
	 */

	/**
	 * 指定した 0...1 の色情報からオブジェクトを作成する
	 * @param {number|NTColorInputColorHSLA|number[]} color_or_h
	 * @param {number} [s]
	 * @param {number} [l]
	 * @param {number} [a=1.0]
	 * @returns {NTColor}
	 */
	static newColorNormalizedHSL(color_or_h, s, l, a) {
		let in_h = 0.0;
		let in_s = 0.0;
		let in_l = 0.0;
		let in_a = 1.0;
		if (arguments.length === 1) {
			if (typeof color_or_h === "object") {
				if (!Array.isArray(color_or_h)) {
					if (color_or_h.h) in_h = color_or_h.h;
					if (color_or_h.s) in_s = color_or_h.s;
					if (color_or_h.l) in_l = color_or_h.l;
					if (color_or_h.a) in_a = color_or_h.a;
				} else {
					if (color_or_h.length >= 3) {
						in_h = color_or_h[0];
						in_s = color_or_h[1];
						in_l = color_or_h[2];
					}
					if (color_or_h.length >= 4) {
						in_a = color_or_h[3];
					}
				}
			} else {
				throw "newColorNormalizedHSL";
			}
		} else {
			if (arguments.length >= 3) {
				in_h = arguments[0];
				in_s = s;
				in_l = l;
			}
			if (arguments.length >= 4) {
				in_a = a;
			}
		}
		// HLSの計算上この時点でLimitさせる
		in_s = NTColor._limit(in_s);
		in_l = NTColor._limit(in_l);
		const color = new NTColor();
		color._setHSL(NTColor._flact(in_h), in_s, in_l, in_a);
		return color;
	}

	/**
	 * 指定した 0...360, 0...255 の色情報からオブジェクトを作成する
	 * @param {number|NTColorInputColorHSLA|number[]} color_or_h
	 * @param {number} s
	 * @param {number} l
	 * @param {number} [a=255.0]
	 * @returns {NTColor}
	 */
	static newColorHSL(color_or_h, s, l, a) {
		let in_h = 0.0;
		let in_s = 0.0;
		let in_l = 0.0;
		let in_a = 255.0;
		if (arguments.length <= 2) {
			if (typeof color_or_h === "object") {
				if (!Array.isArray(color_or_h)) {
					if (color_or_h.h) in_h = color_or_h.h;
					if (color_or_h.s) in_s = color_or_h.s;
					if (color_or_h.l) in_l = color_or_h.l;
					if (color_or_h.a) in_a = color_or_h.a;
				} else {
					if (color_or_h.length >= 3) {
						in_h = color_or_h[0];
						in_s = color_or_h[1];
						in_l = color_or_h[2];
					}
					if (color_or_h.length >= 4) {
						in_a = color_or_h[3];
					}
				}
			} else {
				throw "newColorNormalizedRGB";
			}
		} else if (arguments.length >= 3) {
			in_h = arguments[0];
			in_s = s;
			in_l = l;
			if (arguments.length >= 4) {
				in_a = a;
			}
		}
		return NTColor.newColorNormalizedHSL(in_h / 360.0, in_s / 255.0, in_l / 255.0, in_a / 255.0);
	}

	/**
	 * white
	 * @returns {NTColor}
	 */
	static get WHITE() {
		return NTColor.newColorRGB(0xffffff);
	}

	/**
	 * lightGray
	 * @returns {NTColor}
	 */
	static get LIGHT_GRAY() {
		return NTColor.newColorRGB(0xd3d3d3);
	}

	/**
	 * gray
	 * @returns {NTColor}
	 */
	static get GRAY() {
		return NTColor.newColorRGB(0x808080);
	}

	/**
	 * darkGray
	 * @returns {NTColor}
	 */
	static get DARK_GRAY() {
		return NTColor.newColorRGB(0xa9a9a9);
	}

	/**
	 * black
	 * @returns {NTColor}
	 */
	static get BLACK() {
		return NTColor.newColorRGB(0x000000);
	}

	/**
	 * red
	 * @returns {NTColor}
	 */
	static get RED() {
		return NTColor.newColorRGB(0xff0000);
	}

	/**
	 * pink
	 * @returns {NTColor}
	 */
	static get PINK() {
		return NTColor.newColorRGB(0xffc0cb);
	}

	/**
	 * orange
	 * @returns {NTColor}
	 */
	static get ORANGE() {
		return NTColor.newColorRGB(0xffa500);
	}

	/**
	 * yellow
	 * @returns {NTColor}
	 */
	static get YELLOW() {
		return NTColor.newColorRGB(0xffff00);
	}

	/**
	 * green
	 * @returns {NTColor}
	 */
	static get GREEN() {
		return NTColor.newColorRGB(0x008000);
	}

	/**
	 * magenta
	 * @returns {NTColor}
	 */
	static get MAGENTA() {
		return NTColor.newColorRGB(0xff00ff);
	}

	/**
	 * cyan
	 * @returns {NTColor}
	 */
	static get CYAN() {
		return NTColor.newColorRGB(0x00ffff);
	}

	/**
	 * blue
	 * @returns {NTColor}
	 */
	static get BLUE() {
		return NTColor.newColorRGB(0x0000ff);
	}
}
