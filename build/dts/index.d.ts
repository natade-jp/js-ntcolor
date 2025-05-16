export { NTColor as default };
/**
 * NTColor.js
 *
 * AUTHOR:
 *  natade (https://github.com/natade-jp)
 *
 * LICENSE:
 *  The MIT license https://opensource.org/licenses/MIT
 */
/**
 * 色情報を扱うクラス (immutable)
 */
declare class NTColor {
    /**
     * `v0 + (v1 - v0) * x` で線形補間する
     * @param {number} v0
     * @param {number} v1
     * @param {number} x
     * @returns {number}
     * @private
     */
    private static _mix;
    /**
     * 指定した値を [0.0,1.0] の範囲にする
     * @param {number} x
     * @returns {number}
     * @private
     */
    private static _limit;
    /**
     * 指定した値を比較する
     * @param {number} x
     * @param {number} y
     * @returns {boolean}
     * @private
     */
    private static _equals;
    /**
     * 指定した値を負の値へ整数化する
     * @param {number} x
     * @returns {number}
     * @private
     */
    private static _flact;
    /**
     * 16進数の文字列化する
     * @param {number} x
     * @returns {string}
     * @private
     */
    private static _hex;
    /**
     * 少数3桁程度の固定小数点文字列を取得する
     * @param {number} x
     * @returns {string}
     * @private
     */
    private static _ftos;
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
    static newColorNormalizedRGB(color_or_r: number | number[] | {
        r?: number;
        g?: number;
        b?: number;
        a?: number;
    }, g?: number, b?: number, a?: number, ...args: any[]): NTColor;
    /**
     * 指定した 0...255 の色情報からオブジェクトを作成する
     * @param {number|NTColorInputColorRGBA|number[]} color_or_aarrggbb
     * @param {number|boolean} [g_or_is_load_alpha = false]
     * @param {number} [b]
     * @param {number} [a=255.0]
     * @returns {NTColor}
     */
    static newColorRGB(color_or_aarrggbb: number | number[] | {
        r?: number;
        g?: number;
        b?: number;
        a?: number;
    }, g_or_is_load_alpha?: number | boolean, b?: number, a?: number, ...args: any[]): NTColor;
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
    static newColorNormalizedHSV(color_or_h: number | number[] | {
        h?: number;
        s?: number;
        v?: number;
        a?: number;
    }, s?: number, v?: number, a?: number, ...args: any[]): NTColor;
    /**
     * 指定した 0...360, 0...255 の色情報からオブジェクトを作成する
     * @param {number|NTColorInputColorHSVA|number[]} color_or_h
     * @param {number} [s]
     * @param {number} [v]
     * @param {number} [a=255.0]
     * @returns {NTColor}
     */
    static newColorHSV(color_or_h: number | number[] | {
        h?: number;
        s?: number;
        v?: number;
        a?: number;
    }, s?: number, v?: number, a?: number, ...args: any[]): NTColor;
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
    static newColorNormalizedHSL(color_or_h: number | number[] | {
        h?: number;
        s?: number;
        l?: number;
        a?: number;
    }, s?: number, l?: number, a?: number, ...args: any[]): NTColor;
    /**
     * 指定した 0...360, 0...255 の色情報からオブジェクトを作成する
     * @param {number|NTColorInputColorHSLA|number[]} color_or_h
     * @param {number} s
     * @param {number} l
     * @param {number} [a=255.0]
     * @returns {NTColor}
     */
    static newColorHSL(color_or_h: number | number[] | {
        h?: number;
        s?: number;
        l?: number;
        a?: number;
    }, s: number, l: number, a?: number, ...args: any[]): NTColor;
    /**
     * white
     * @returns {NTColor}
     */
    static get WHITE(): NTColor;
    /**
     * lightGray
     * @returns {NTColor}
     */
    static get LIGHT_GRAY(): NTColor;
    /**
     * gray
     * @returns {NTColor}
     */
    static get GRAY(): NTColor;
    /**
     * darkGray
     * @returns {NTColor}
     */
    static get DARK_GRAY(): NTColor;
    /**
     * black
     * @returns {NTColor}
     */
    static get BLACK(): NTColor;
    /**
     * red
     * @returns {NTColor}
     */
    static get RED(): NTColor;
    /**
     * pink
     * @returns {NTColor}
     */
    static get PINK(): NTColor;
    /**
     * orange
     * @returns {NTColor}
     */
    static get ORANGE(): NTColor;
    /**
     * yellow
     * @returns {NTColor}
     */
    static get YELLOW(): NTColor;
    /**
     * green
     * @returns {NTColor}
     */
    static get GREEN(): NTColor;
    /**
     * magenta
     * @returns {NTColor}
     */
    static get MAGENTA(): NTColor;
    /**
     * cyan
     * @returns {NTColor}
     */
    static get CYAN(): NTColor;
    /**
     * blue
     * @returns {NTColor}
     */
    static get BLUE(): NTColor;
    /**
     * 赤色成分 [0.0,1.0]
     * @types {number}
     */
    _r: number;
    /**
     * 緑色成分 [0.0,1.0]
     * @types {number}
     */
    _g: number;
    /**
     * 青色成分 [0.0,1.0]
     * @types {number}
     */
    _b: number;
    /**
     * 透明度成分 [0.0,1.0]
     * @types {number}
     */
    _a: number;
    /**
     * 色を表示できる範囲内 [0.0,1.0] に収める
     * @returns {NTColor}
     */
    limit(): NTColor;
    /**
     * 色をアルファ値で焼きこむ
     * @returns {NTColor}
     */
    bake(): NTColor;
    /**
     * 各色成分に加法混色を行う
     * @param {NTColor} x
     * @returns {NTColor}
     */
    addColorMixture(x: NTColor): NTColor;
    /**
     * 各色成分に減法混色を行う
     * @param {NTColor} x
     * @returns {NTColor}
     */
    subColorMixture(x: NTColor): NTColor;
    /**
     * 各色成分に掛け算を行う
     * @param {NTColor|number} x
     * @returns {NTColor}
     */
    mul(x: NTColor | number): NTColor;
    /**
     * オブジェクトを複製する
     * @returns {NTColor}
     */
    clone(): NTColor;
    /**
     * オブジェクトを比較する
     * @param {NTColor} x
     * @returns {boolean}
     */
    equals(x: NTColor): boolean;
    /**
     * 文字列化する
     * @returns {string}
     */
    toString(): string;
    /**
     * 内部のデータを RGBA で書き換える
     * @param {number} r [0.0,1.0]
     * @param {number} g [0.0,1.0]
     * @param {number} b [0.0,1.0]
     * @param {number} [a] [0.0,1.0]
     * @returns {NTColor}
     * @private
     */
    private _setRGB;
    /**
     * 内部のデータを HSVA で書き換える
     * @param {number} h [0.0,1.0]
     * @param {number} s [0.0,1.0]
     * @param {number} v [0.0,1.0]
     * @param {number} [a] [0.0,1.0]
     * @returns {NTColor}
     * @private
     */
    private _setHSV;
    /**
     * 内部のデータを HSLA で書き換える
     * @param {number} h [0.0,1.0]
     * @param {number} s [0.0,1.0]
     * @param {number} l [0.0,1.0]
     * @param {number} [a] [0.0,1.0]
     * @returns {NTColor}
     * @private
     */
    private _setHSL;
    /**
     * 内部のデータを RGBA の値で取得する
     * @returns {{r: number, g: number, b: number, a: number}}
     * @private
     */
    private _getRGB;
    /**
     * 内部のデータを HSVA の値で取得する
     * @returns {{h: number, s: number, v: number, a: number}}
     * @private
     */
    private _getHSV;
    /**
     * 内部のデータを HSLA の値で取得する
     * @returns {{h: number, s: number, l: number, a: number}}
     * @private
     */
    private _getHSL;
    /**
     * [0.0,1.0] に正規化された ARGB の値を取得する
     * @returns {{r: number, g: number, b: number, a: number}}
     */
    toNormalizedRGB(): {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    /**
     * [0,255] の ARGB の値を取得する
     * @returns {{r: number, g: number, b: number, a: number}}
     */
    toRGB(): {
        r: number;
        g: number;
        b: number;
        a: number;
    };
    /**
     * 0x00RRGGBB の値を取得する
     * @returns {number}
     */
    toRRGGBB(): number;
    /**
     * 0xAARRGGBB の値を取得する
     * @returns {number}
     */
    toAARRGGBB(): number;
    /**
     * [0.0,1.0] に正規化された HSV の値を取得する
     * @returns {{h: number, s: number, v: number, a: number}}
     */
    toNormalizedHSV(): {
        h: number;
        s: number;
        v: number;
        a: number;
    };
    /**
     * [0,255] の HSV の値を取得する。ただし色相は [0,359] とする。
     * @returns {{h: number, s: number, v: number, a: number}}
     */
    toHSV(): {
        h: number;
        s: number;
        v: number;
        a: number;
    };
    /**
     * [0.0,1.0] に正規化された HSL の値を取得する
     * @returns {{h: number, s: number, l: number, a: number}}
     */
    toNormalizedHSL(): {
        h: number;
        s: number;
        l: number;
        a: number;
    };
    /**
     * [0,255] の HSL の値を取得する。ただし色相は [0,359] とする。
     * @returns {{h: number, s: number, l: number, a: number}}
     */
    toHSL(): {
        h: number;
        s: number;
        l: number;
        a: number;
    };
    /**
     * [0.0,1.0] の赤成分
     * @returns {number}
     */
    get r(): number;
    /**
     * [0.0,1.0] の緑成分
     * @returns {number}
     */
    get g(): number;
    /**
     * [0.0,1.0] の青成分
     * @returns {number}
     */
    get b(): number;
    /**
     * [0.0,1.0] のアルファ成分
     * @returns {number}
     */
    get a(): number;
    /**
     * [0,255] の赤成分
     * @returns {number}
     */
    get ir(): number;
    /**
     * [0,255] の緑成分
     * @returns {number}
     */
    get ig(): number;
    /**
     * [0,255] の青成分
     * @returns {number}
     */
    get ib(): number;
    /**
     * [0,255] のアルファ成分
     * @returns {number}
     */
    get ia(): number;
    /**
     * [0,100] の赤成分
     * @returns {number}
     */
    get pr(): number;
    /**
     * [0,100] の緑成分
     * @returns {number}
     */
    get pg(): number;
    /**
     * [0,100] の青成分
     * @returns {number}
     */
    get pb(): number;
    /**
     * [0,100] のアルファ成分
     * @returns {number}
     */
    get pa(): number;
    /**
     * 明るい色を取得する
     * @returns {NTColor}
     */
    brighter(): NTColor;
    /**
     * 暗い色を取得する
     * @returns {NTColor}
     */
    darker(): NTColor;
    /**
     * CSSで使用できる16進数の色情報のテキストを取得する
     * @returns {string}
     */
    toCSSHex(): string;
    /**
     * CSSで使用できる `rgb()`/`rgba()` の色情報のテキストを取得する
     * @returns {string}
     */
    toCSS255(): string;
    /**
     * CSSで使用できるパーセンテージのrgb/rgbaの色情報のテキストを取得する
     * @returns {string}
     */
    toCSSPercent(): string;
    /**
     * 指定した透明度の色情報を作成して取得する
     * @param {number} a
     * @returns {NTColor}
     */
    setAlpha(a: number): NTColor;
}
