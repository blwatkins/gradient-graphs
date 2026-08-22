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

import p5 from 'p5';

import { ArtApp } from './p5-utils/art-app';
import { GradientGraphs } from './sketch';
import { SketchGraphicsPair } from './p5-utils/sketch-graphics-pair';
import { GraphicsHandler } from './p5-utils/graphics-handler';
import { AspectRatio } from './genart-utils/aspect-ratio';

// TODO - Current Goal Architecture
// Main
// App ~ p5Ctx
// AppScreen ~ Graphics
// SketchGrid ~ Graphics
// SketchCell ~ Graphics
// Any can run a Sketch
// SketchContainers can run the sketch with graphics OR p5Ctx
// Sketch is the algorithm

export class GradientGraphsApp extends ArtApp {
    public override main(ctx: p5): void {
        const canvasId = 'gradient-graphs-app';
        const aspectRatio: AspectRatio = new AspectRatio(16, 9);

        let sketch: GradientGraphs;
        let sketchPair1: SketchGraphicsPair;
        let sketchPair2: SketchGraphicsPair;

        let sketchB: GradientGraphs;
        let sketchBPair1: SketchGraphicsPair;
        let sketchBPair2: SketchGraphicsPair;

        // TODO - Add AspectRatio handling back to decorate Canvas
        function decorateCanvas(): void {
            const canvas = document.getElementById(canvasId);
            const parent = canvas?.parentElement;

            if (canvas && parent) {
                canvas.style.width = '';
                canvas.style.height = '';
                canvas.style.maxWidth = parent.offsetWidth.toString(10) + 'px';
                canvas.style.maxHeight = parent.offsetHeight.toString(10) + 'px';
                canvas.style.aspectRatio = `auto ${aspectRatio.widthRatio} / ${aspectRatio.heightRatio}`;
            }
        }

        ctx.setup = (): void => {
            const resolution: number = 1920;
            const canvas: p5.Renderer = ctx.createCanvas(
                aspectRatio.getWidth(resolution),
                aspectRatio.getHeight(resolution)
            );
            canvas.id(canvasId);

            ctx.pixelDensity(1);
            decorateCanvas();

            sketch = new GradientGraphs();
            sketchPair1 = new SketchGraphicsPair(
                sketch,
                new GraphicsHandler(
                    ctx,
                    {
                        aspectRatio: new AspectRatio(9, 16),
                        resolution: 1920
                    })
            );
            sketchPair2 = new SketchGraphicsPair(
                sketch,
                new GraphicsHandler(
                    ctx,
                    {
                        aspectRatio: new AspectRatio(16, 9),
                        resolution: 720
                    })
            );

            sketchB = new GradientGraphs();
            sketchBPair1 = new SketchGraphicsPair(
                sketchB,
                new GraphicsHandler(
                    ctx,
                    {
                        aspectRatio: new AspectRatio(5, 7),
                        resolution: 2160
                    })
            );
            sketchBPair2 = new SketchGraphicsPair(
                sketchB,
                new GraphicsHandler(
                    ctx,
                    {
                        aspectRatio: new AspectRatio(4, 3),
                        resolution: 1080
                    })
            );
        };

        ctx.draw = (): void => {
            ctx.imageMode(ctx.CENTER);
            const offsetX: number = ctx.width / 4.0;
            const offsetY: number = ctx.height / 4.0;
            sketchPair1.draw(ctx, offsetX, offsetY, ctx.width / 2.0, ctx.height / 2.0);
            sketchPair2.draw(ctx, ctx.width / 2.0 + offsetX, offsetY, ctx.width / 2.0, ctx.height / 2.0);
            sketchBPair1.draw(ctx, offsetX, ctx.height / 2.0 + offsetY, ctx.width / 2.0, ctx.height / 2.0);
            sketchBPair2.draw(ctx, ctx.width / 2.0 + offsetX, ctx.height / 2.0 + offsetY, ctx.width / 2.0, ctx.height / 2.0);

            ctx.strokeWeight(20);
            ctx.line(ctx.width / 2.0, 0, ctx.width / 2.0, ctx.height);
            ctx.line(0, ctx.height / 2.0, ctx.width, ctx.height / 2.0);
        };

        ctx.windowResized = (): void => {
            decorateCanvas();
        };
    }
}
