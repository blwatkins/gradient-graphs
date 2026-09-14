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

import { DownloadIndicator } from './genart-utils/download-indicator';
import {DrawableGraphics} from "./p5-utils/drawable-graphics";
import {P5ContextHandler} from "./p5-utils/p5-context-handler";
import p5 from "p5";
import { GraphicsHandler } from "./p5-utils/graphics-handler";
import {AspectRatio} from "./genart-utils/aspect-ratio";

// TODO - async timer for setting isActive to false after download completes or fails

export class AppDownloadIndicator extends DownloadIndicator implements DrawableGraphics {
    #graphicsHandler: GraphicsHandler;
    #isActive: boolean;
    #isDownloading: boolean;
    #downloadSuccess: boolean;
    #activeTimeoutMillis: number = 5_000;

    constructor(ctx: p5) {
        super();
        this.#graphicsHandler = new GraphicsHandler({ aspectRatio: new AspectRatio(1, 1), resolution: 100 }, ctx);
        this.#isActive = false;
        this.#isDownloading = false;
        this.#downloadSuccess = false;
    }

    draw(target: P5ContextHandler | p5 | p5.Graphics, x: number, y: number, width: number, height: number): void {
        if (this.#isActive) {
            if (this.#isDownloading) {
                this.#graphicsHandler.graphics.background(0);
            } else {
                if (this.#downloadSuccess) {
                    this.#graphicsHandler.graphics.background(0, 255, 0);
                } else {
                    this.#graphicsHandler.graphics.background(255, 0, 0);
                }
            }

            P5ContextHandler.getCtx(target).image(this.#graphicsHandler.graphics, x, y, width, height);
        }
    }

    downloadStart(): void {
        this.#isActive = true;
        this.#isDownloading = true;
    }

    downloadComplete(): void {
        this.#isDownloading = false;
        this.#downloadSuccess = true;
        this.#activeTimeout();
    }

    downloadFailure(): void {
        this.#isDownloading = false;
        this.#downloadSuccess = false;
        this.#activeTimeout();
    }

    #activeTimeout(): void {
        new Promise<void>(resolve => {
            setTimeout(resolve, this.#activeTimeoutMillis);
        }).then((): void => {
            this.#isActive = false;
        });
    }
}
