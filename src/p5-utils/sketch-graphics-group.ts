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

import { StringUtility } from '@blwatkins/utils';

import { GraphicsHandler } from './graphics-handler';
import { Sketch } from './sketch';
import { SketchGraphics } from './sketch-graphics';
import { CanvasIDHandler } from './canvas-id-handler';

export class SketchGraphicsGroup extends SketchGraphics {
    readonly #graphicsHandlers: Map<string, GraphicsHandler> = new Map<string, GraphicsHandler>();

    public constructor(sketch: Sketch, handler: GraphicsHandler, handlerName: string = 'default') {
        super(sketch, handler);
        this.#graphicsHandlers.set(handlerName, handler);
    }

    public setActiveHandler(handlerName: string): void {
        this.activeHandler = this.#graphicsHandlers.get(handlerName) ?? this.activeHandler;
    }

    // TODO - should existing keys be overwritten?
    public addHandler(handlerName: string, handler: GraphicsHandler): void {
        StringUtility.assertSingleLineTrimmedString(handlerName);
        this.#graphicsHandlers.set(handlerName, handler);
        handler.id = CanvasIDHandler.getId(this.sketch, handler);
    }

    // TODO - downloadImage - make abstract method in SketchGraphics

    // TODO - downloadImageFrom(name)

    // TODO - downloadAllImages - get blobs in parallel (Promise.all), then output in zip download using JSZip
}
