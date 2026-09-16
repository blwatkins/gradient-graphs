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

import { DownloadIndicator } from '../genart-utils/download-indicator';
import { Drawable } from './drawable';
import { GraphicsHandler } from "./graphics-handler";
import p5 from "p5";
import { ContextHandlerConfig } from "../genart-utils/context-handler";
import { Renderable } from "./renderable";
import { P5ContextHandler } from "./p5-context-handler";

export abstract class GraphicsDownloadIndicator extends DownloadIndicator implements Drawable, Renderable {
    readonly #graphicsHandler: GraphicsHandler;
    #displayTimeoutMillis: number = 5_000;

    protected constructor(config: ContextHandlerConfig, ctx: p5) {
        super();
        this.#graphicsHandler = new GraphicsHandler(config, ctx);
    }

    public abstract renderTo(target: P5ContextHandler | p5.Graphics | p5): void;

    public draw(target: P5ContextHandler | p5 | p5.Graphics, x: number, y: number, width: number, height: number): void {
        if (!this.isIdle()) {
            this.render();
            P5ContextHandler.getCtx(target).image(this.#graphicsHandler.graphics, x, y, width, height);
        }
    }

    protected set displayTimeoutMillis(millis: number) {
        this.#displayTimeoutMillis = millis;
    }

    protected override downloadStart(): void {
        /* Empty */
    }

    protected override downloadSuccess(): void {
        this.#displayTimeout();
    }

    protected override downloadFailure(): void {
        this.#displayTimeout();
    }

    protected override downloadIdle(): void {
        /* Empty */
    }

    protected render(): void {
        this.renderTo(this.#graphicsHandler);
    }

    #displayTimeout(): void {
        new Promise<void>(resolve => {
            setTimeout(resolve, this.#displayTimeoutMillis);
        }).then((): void => {
            this.idle();
        });
    }
}
