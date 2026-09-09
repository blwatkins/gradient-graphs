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

import p5 from 'p5';

import { ContextHandlerConfig } from '../genart-utils/context-handler';

import { P5ContextHandler } from './p5-context-handler';

export class GraphicsHandler extends P5ContextHandler {
    readonly #graphics: p5.Graphics;

    constructor(config: ContextHandlerConfig, ctx: p5) {
        super(config);
        this.#graphics = ctx.createGraphics(
            this.aspectRatio.getWidth(this.resolution),
            this.aspectRatio.getHeight(this.resolution)
        );
        this.ctx = this.#graphics;
    }

    get graphics(): p5.Graphics {
        return this.#graphics;
    }

    get id(): string {
        return this.#graphics.elt.id;
    }

    set id(id: string) {
        this.#graphics.elt.id = id;
    }
}
