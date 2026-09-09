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

import { GraphicsHandler } from './graphics-handler';
import { Sketch } from './sketch';

export class CanvasIDHandler {
    static readonly #sketchCanvasCount: Map<string, number> = new Map<string, number>();

    public static getId(sketch: Sketch, handler: GraphicsHandler): string {
        const baseId: string = `${sketch.name}_${handler.graphics.width}-${handler.graphics.height}`;

        const mapCount: number | undefined = CanvasIDHandler.#sketchCanvasCount.get(baseId);
        let count;

        if (mapCount === undefined) {
            count = 0;
        } else {
            count = mapCount + 1;
        }

        CanvasIDHandler.#sketchCanvasCount.set(baseId, count);
        return `${baseId}_${count}`;
    }
}
