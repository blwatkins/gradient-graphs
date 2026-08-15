/*
 * Copyright (c) 2022-2026 Brittni Watkins.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 *
 * SPDX-License-Identifier: AGPL-3.0-only
 */

"use strict";

import { randomInt, randomFloat, randomBoolean } from '../random/random.mjs';

// COLOR
export class Color {
    constructor(color) {
        this.initColor(color);
    }

    initColor(color) {
        colorMode(RGB, 255);
        this.red = red(color);
        this.green = green(color);
        this.blue = blue(color);
        this.alpha = alpha(color);
    }

    getColor() {
        colorMode(RGB, 255);
        return color(this.red, this.green, this.blue, this.alpha);
    }

    setColor(color) {
        this.initColor(color);
    }

    getRed() {
        return this.red;
    }

    getGreen() {
        return this.green;
    }

    getBlue() {
        return this.blue;
    }

    getAlpha() {
        return this.alpha;
    }

    setRed(red) {
        this.red = Math.floor(constrain(red, 0, 255));
    }

    setGreen(green) {
        this.green = Math.floor(constrain(green, 0, 255));
    }

    setBlue(blue) {
        this.blue = Math.floor(constrain(blue, 0, 255));
    }

    setAlpha(alpha) {
        this.alpha = Math.floor(constrain(alpha, 0, 255));
    }
}

// RANGE
export class Range {
    constructor(low, high) {
        this.low = low;
        this.high = high;
    }

    getLow() {
        return this.low;
    }

    getHigh() {
        return this.high;
    }
}

// COLOR GENERATORS
export class ColorGenerator {
    getRandomColor() {
        return color(0);
    }

    mapColor(value, minValue, maxValue, saturation, brightness) {
        return color(0);
    }

    getName() {
        return "Color Generator";
    }

    randomBoolean(chanceOfTrue) {
        let r = randomFloat(0, 1);
        let bool = true;

        if (r > chanceOfTrue) {
            bool = false;
        }

        return bool;
    }
}

export class RGBColorGenerator extends ColorGenerator {
    constructor(redRange, greenRange, blueRange) {
        super();
        this.redRange = redRange;
        this.greenRange = greenRange;
        this.blueRange = blueRange;
    }

    getRandomColor() {
        colorMode(RGB, 255);
        let r = randomInt(this.redRange.getLow(), this.redRange.getHigh());
        let g = randomInt(this.greenRange.getLow(), this.greenRange.getHigh());
        let b = randomInt(this.blueRange.getLow(), this.blueRange.getHigh());
        return color(r, g, b);
    }

    mapColor(value, minValue, maxValue, saturation, brightness) {
        return this.getRandomColor();
    }

    getName() {
        return "RGB Color Generator";
    }
}

export class HSBColorGenerator extends ColorGenerator {
    constructor(lowHueValue, highHueValue) {
        super();
        this.lowHueValue = lowHueValue;
        this.highHueValue = highHueValue;
        this.isBright = this.randomBoolean(0.8);
    }

    getRandomColor() {
        colorMode(HSB, 360);
        let saturation = randomInt(180, 360);
        let brightness = randomInt(180, 360);

        if (this.isBright) {
            saturation = 360;
            brightness = 360;
        }
        
        let hue = randomInt(this.lowHueValue, this.highHueValue);
        return color(hue, saturation, brightness);
    }

    mapColor(value, minValue, maxValue, saturation, brightness) {
        colorMode(HSB, 360);
        let hue = map(value, minValue, maxValue, this.lowHueValue, this.highHueValue);
        return color(hue, saturation, brightness);
    }

    getName() {
        return "HSB Color Generator";
    }
}

export class ComplementaryColorGenerator extends ColorGenerator {
    constructor() {
        super();
        this.baseHue = randomInt(0, 360);
        this.complementaryHue = (this.baseHue + 180) % 360;
        this.isBright = this.randomBoolean(0.2);
    }

    getRandomColor() {
        colorMode(HSB, 360);
        let bool = randomBoolean();
        let c = color(0);
        let h = 0;
        let saturation = randomInt(180, 360);
        let brightness = randomInt(180, 360);

        if (this.isBright) {
            saturation = 360;
            brightness = 360;
        }

        if (bool) {
            h = this.baseHue;
        } else {
            h = this.complementaryHue;
        }

        let hue = randomInt(h - 10, h + 10);

        if (hue < 0) {
            hue = 360 + hue;
        } else if (hue > 360) {
            hue = hue % 360;
        }

        c = color(hue, saturation, brightness);
        return c;
    }

    mapColor(value, minValue, maxValue, saturation, brightness) {
       return this.getRandomColor(); 
    }

    getName() {
        return "Complementary Color Generator";
    }
}

export class TriadicColorGenerator extends ColorGenerator {
    constructor() {
        super();
        this.baseHue = randomInt(0, 360);
        this.secondaryHue = (this.baseHue + 120) % 360;
        this.tertiaryHue = (this.secondaryHue + 120) % 360;
        this.isBright = this.randomBoolean(0.2);
    }

    getRandomColor() {
        colorMode(HSB, 360);
        let r = randomInt(0, 3);
        let c = color(0);
        let h = 0;
        let saturation = randomInt(180, 360);
        let brightness = randomInt(180, 360);

        if (this.isBright) {
            saturation = 360;
            brightness = 360;
        }

        if (r % 3 === 0) {
            h = this.baseHue;
        } else if (r % 3 === 1) {
            h = this.secondaryHue;
        } else if (r % 3 === 2) {
            h = this.tertiaryHue;
        }

        let hue = randomInt(h - 10, h + 10);

        if (hue < 0) {
            hue = 360 + hue;
        } else if (hue > 360) {
            hue = hue % 360;
        }

        c = color(hue, saturation, brightness);
        return c;
    }

    mapColor(value, minValue, maxValue, saturation, brightness) {
       return this.getRandomColor(); 
    }

    getName() {
        return "Triadic Color Generator";
    }
}

// RGB COLOR GENERATORS
export class BlackColorGenerator extends RGBColorGenerator {
    constructor() {
        super(null, null, null);
    }

    getRandomColor() {
        colorMode(RGB, 255);
        let gray = randomInt(0, 100);
        return color(gray);
    }

    getName() {
        return "Black Color Generator";
    }
}

export class BlueColorGenerator extends RGBColorGenerator {
    constructor() {
        super(new Range(0, 100), new Range(0, 100), new Range(100, 255));
    }

    getName() {
        return "Blue Color Generator";
    }
}

export class CyanColorGenerator extends RGBColorGenerator {
    constructor() {
        super(new Range(0, 100), new Range(100, 255), new Range(100, 255));
    }

    getName() {
        return "Cyan Color Generator";
    }
}

export class GreenColorGenerator extends RGBColorGenerator {
    constructor() {
        super(new Range(0, 100), new Range(100, 255), new Range(0, 100));
    }

    getName() {
        return "Green Color Generator";
    }
}

export class MagentaColorGenerator extends RGBColorGenerator {
    constructor() {
        super(new Range(100, 255), new Range(0, 100), new Range(100, 255));
    }

    getName() {
        return "Magenta Color Generator";
    }
}

export class RandomColorGenerator extends RGBColorGenerator {
    constructor() {
        super(new Range(0, 255), new Range(0, 255), new Range(0, 255));
    }

    getName() {
        return "Random Color Generator";
    }
}

export class RedColorGenerator extends RGBColorGenerator {
    constructor() {
        super(new Range(100, 255), new Range(0, 100), new Range(0, 100));
    }

    getName() {
        return "Red Color Generator";
    }
}

export class WhiteColorGenerator extends RGBColorGenerator {
    constructor() {
        super(null, null, null);
    }

    getRandomColor() {
        colorMode(RGB, 255);
        let gray = randomInt(100, 255);
        return color(gray);
    }

    getName() {
        return "White Color Generator";
    }
}

export class YellowColorGenerator extends RGBColorGenerator {
    constructor() {
        super(new Range(100, 255), new Range(100, 255), new Range(0, 100));
    }

    getName() {
        return "Yellow Color Generator";
    }
}

// HSB Color Generators
export class BottomColorGenerator extends HSBColorGenerator {
    constructor() {
        super(0, 180);
    }

    getName() {
        return "Bottom Color Generator";
    }
}

export class CoolColorGenerator extends HSBColorGenerator {
    constructor() {
        super(90, 285);
    }

    getName() {
        return "Cool Color Generator";
    }
}

export class RainbowColorGenerator extends HSBColorGenerator {
    constructor() {
        super(0, 360);
    }

    getName() {
        return "Rainbow Color Generator";
    }
}

export class TopColorGenerator extends HSBColorGenerator {
    constructor() {
        super(180, 360);
    }

    getName() {
        return "Top Color Generator";
    }
}

export class WarmColorGenerator extends HSBColorGenerator {
    constructor() {
        super(0, 70);
    }

    getName() {
        return "Warm Color Generator";
    }
}

// COLOR GENERATOR FACTORIES
export class ColorGeneratorFactory {
    getColorGenerator() {
        return new ColorGenerator();
    }

    getName() {
        return "Color Generator Factory";
    }
}

export class UniformColorGeneratorFactory extends ColorGeneratorFactory {
    getColorGenerator() {
        let r = randomInt(0, 16);
        let colorGenerator;

        switch (r % 16) {
            case 1:
                colorGenerator = new BlackColorGenerator();
                break;
            case 2:
                colorGenerator = new BlueColorGenerator();
                break;
            case 3:
                colorGenerator = new CyanColorGenerator();
                break;
            case 4:
                colorGenerator = new GreenColorGenerator();
                break;
            case 5:
                colorGenerator = new MagentaColorGenerator();
                break;
            case 6:
                colorGenerator = new RedColorGenerator();
                break;
            case 7:
                colorGenerator = new WhiteColorGenerator();
                break;
            case 8:
                colorGenerator = new YellowColorGenerator();
                break;
            case 9:
                colorGenerator = new BottomColorGenerator();
                break;
            case 10:
                colorGenerator = new CoolColorGenerator();
                break;
            case 11:
                colorGenerator = new RainbowColorGenerator();
                break;
            case 12:
                colorGenerator = new TopColorGenerator();
                break;
            case 13:
                colorGenerator = new WarmColorGenerator();
                break;
            case 14:
                colorGenerator = new ComplementaryColorGenerator();
                break;
            case 15:
                colorGenerator = new TriadicColorGenerator();
                break;
            default:
                colorGenerator = new RandomColorGenerator();
                break;
        }

        return colorGenerator;
    }

    getName() {
        return "Uniform Color Generator Factory";
    }
}

export class UniformRGBColorGeneratorFactory extends ColorGeneratorFactory {
    getColorGenerator() {
        let r = randomInt(0, 9);
        let colorGenerator;

        switch(r % 9) {
            case 1:
                colorGenerator = new BlackColorGenerator();
                break;
            case 2:
                colorGenerator = new BlueColorGenerator();
                break;
            case 3:
                colorGenerator = new GreenColorGenerator();
                break;
            case 4:
                colorGenerator = new MagentaColorGenerator();
                break;
            case 5:
                colorGenerator = new RandomColorGenerator();
                break;
            case 6:
                colorGenerator = new RedColorGenerator();
                break;
            case 7:
                colorGenerator = new CyanColorGenerator();
                break;
            case 8:
                colorGenerator = new WhiteColorGenerator();
                break;
            default:
                colorGenerator = new YellowColorGenerator();
                break;
        }

        return colorGenerator;
    }

    getName() {
        return "Uniform RGB Color Generator Factory";
    }
}

export class UniformHSBColorGeneratorFactory extends ColorGeneratorFactory {
    getColorGenerator() {
        let r = randomInt(0, 5);
        let colorGenerator;

        switch(r % 5) {
            case 1:
                colorGenerator = new BottomColorGenerator();
                break;
            case 2:
                colorGenerator = new CoolColorGenerator();
                break;
            case 3:
                colorGenerator = new RainbowColorGenerator();
                break;
            case 4:
                colorGenerator = new TopColorGenerator();
                break;
            default:
                colorGenerator = new WarmColorGenerator();
                break;
        }

        return colorGenerator;
    }

    getName() {
        return "Uniform HSB Color Generator Factory";
    }
}
