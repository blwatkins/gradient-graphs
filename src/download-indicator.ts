/*
 * Copyright (c) 2026 Brittni Watkins.
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

import p5 from "p5";

import { AspectRatio } from "./genart-utils/aspect-ratio";
import { GraphicsDownloadIndicator } from "./p5-utils/graphics-download-indicator";
import {P5ContextHandler} from "./p5-utils/p5-context-handler";
import {MathUtility} from "@blwatkins/utils";

export class AppDownloadIndicator extends GraphicsDownloadIndicator {
    #offsetRadius;
    #theta;
    #d;
    #deltaTheta;
    #deltaD;
    #deltaOffset;

    constructor(ctx: p5) {
        super({aspectRatio: new AspectRatio(1, 1), resolution: 100}, ctx);
        this.displayTimeoutMillis = 10_000;
        this.#offsetRadius = 25;
        this.#deltaTheta = 0.025;
        this.#deltaD = 0.5;
        this.#theta = 0;
        this.#d = 25;
        this.#deltaOffset = -0.5;
        console.log(this.#deltaD);
        console.log(this.#deltaOffset);
    }

    public override renderTo(target: P5ContextHandler | p5.Graphics | p5): void {
        const ctx: p5.Graphics | p5 = P5ContextHandler.getCtx(target);
        const maxOffset: number = (Math.min(ctx.width, ctx.height) / 2.0) - (this.#d / 2.0);


        if (this.isDownloading()) {
            this.#offsetRadius = maxOffset;
            const x: number = (ctx.width / 2.0) + (this.#offsetRadius * Math.cos(this.#theta));
            const y: number = (ctx.height / 2.0) +  (this.#offsetRadius * Math.sin(this.#theta));
            this.#theta += this.#deltaTheta;

            ctx.background(200);
            ctx.fill(255);
            ctx.noStroke();
            ctx.circle(x, y, this.#d);
        } else if (this.hasSuccess()) {
            if (this.#offsetRadius > 0) {
                this.#offsetRadius = MathUtility.constrain(this.#offsetRadius + this.#deltaOffset, 0, maxOffset);
            }

            const x: number = (ctx.width / 2.0) + (this.#offsetRadius * Math.cos(this.#theta));
            const y: number = (ctx.height / 2.0) +  (this.#offsetRadius * Math.sin(this.#theta));

            ctx.background(255);
            ctx.fill(0, 200, 0);
            ctx.circle(x, y, this.#d);
        } else if (this.hasFailure()) {
            if (this.#offsetRadius > 0) {
                this.#offsetRadius = MathUtility.constrain(this.#offsetRadius + this.#deltaOffset, 0, maxOffset);
            }

            const x: number = (ctx.width / 2.0) + (this.#offsetRadius * Math.cos(this.#theta));
            const y: number = (ctx.height / 2.0) +  (this.#offsetRadius * Math.sin(this.#theta));

            ctx.background(0);
            ctx.fill(200, 0, 0);
            ctx.circle(x, y, this.#d);
        }
    }
}
