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

import {AspectRatio} from "./aspect-ratio";

// TODO - define schema and builder
export interface ContextHandlerConfig {
    readonly aspectRatio: AspectRatio;
    readonly resolution: number;
}

export class ContextHandler {
    readonly #aspectRatio: AspectRatio;
    readonly #resolution: number;

    public static getStrokeMultiplier(resolution: number): number {
        return resolution * 0.001;
    }

    constructor(config: ContextHandlerConfig) {
        // TODO - verify schemas
        this.#aspectRatio = config.aspectRatio;
        this.#resolution = config.resolution;
    }

    get aspectRatio(): AspectRatio {
        return this.#aspectRatio;
    }

    get resolution(): number {
        return this.#resolution;
    }

    get strokeMultiplier(): number {
        return ContextHandler.getStrokeMultiplier(this.#resolution);
    }
}
