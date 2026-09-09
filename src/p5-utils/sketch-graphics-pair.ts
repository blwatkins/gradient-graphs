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

import { HTMLElementUtility } from '../utils/html-element-utility';

import { DownloadHandler } from '../genart-utils/download-handler';

import { Sketch } from './sketch';
import { GraphicsHandler } from './graphics-handler';
import { SketchGraphics } from './sketch-graphics';

export class SketchGraphicsPair extends SketchGraphics {
    public constructor(sketch: Sketch, handler: GraphicsHandler) {
        super(sketch, handler);
    }

    public downloadImage(): void {
        this.render();
        const canvasID: string = this.activeHandler.id;
        const canvas: HTMLElement | null = document.getElementById(canvasID);
        HTMLElementUtility.assertHTMLCanvasElement(canvas);
        DownloadHandler.downloadImage(canvas);
    }
}
