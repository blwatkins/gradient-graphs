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

import { ContextHandler, ContextHandlerConfig } from '../genart-utils/context-handler';

export class P5ContextHandler extends ContextHandler {
    #ctx: p5.Graphics | p5 | null;

    public constructor(config: ContextHandlerConfig) {
        super(config);
        this.#ctx = null;
    }

    public static getCtx(target: P5ContextHandler | p5.Graphics | p5): p5.Graphics | p5 {
        if (target instanceof P5ContextHandler) {
            return target.ctx;
        }

        return target;
    }

    public static override getStrokeMultiplier(arg: P5ContextHandler | p5.Graphics | p5 | number): number {
        if (typeof arg === 'number') {
            return super.getStrokeMultiplier(arg);
        }

        if (arg instanceof P5ContextHandler) {
            return arg.strokeMultiplier;
        }

        return ContextHandler.getStrokeMultiplier(Math.max(arg.width, arg.height));
    }

    // TODO - Update error type
    // TODO - Custom error type for missing context?
    public get ctx(): p5.Graphics | p5 {
        if (!this.#ctx) {
            throw new Error('Missing p5.js context.');
        }

        return this.#ctx;
    }

    protected set ctx(ctx: p5.Graphics | p5) {
        this.#ctx = ctx;
    }
}
