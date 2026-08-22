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
import { SketchGraphicsGroup } from './p5-utils/sketch-graphics-group';
import { SketchGrid } from './p5-utils/sketch-grid';
import { SketchCell } from './p5-utils/sketch-cell';

// TODO - future - Individual sketches should have the option to accept their own deterministic seed
// - determinism can come from overall app-level seed, or sketch-level seed.
// - use sketch level seed with app-level seed fallback

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
        const aspectRatio: AspectRatio = new AspectRatio(2, 1);

        let sketch: GradientGraphs;
        let sketchPair1: SketchGraphicsPair;
        let sketchPair2: SketchGraphicsPair;

        let sketchB: GradientGraphs;
        let sketchBPair1: SketchGraphicsPair;
        let sketchBPair2: SketchGraphicsPair;
        let sketchBGroup1: SketchGraphicsGroup;

        let sketchGrid: SketchGrid;

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
                    {
                        aspectRatio: new AspectRatio(9, 16),
                        resolution: 1920
                    },
                    ctx
                )
            );
            sketchPair2 = new SketchGraphicsPair(
                sketch,
                new GraphicsHandler(
                    {
                        aspectRatio: new AspectRatio(16, 9),
                        resolution: 720
                    },
                    ctx
                )
            );

            sketchB = new GradientGraphs();
            sketchBPair1 = new SketchGraphicsPair(
                sketchB,
                new GraphicsHandler(
                    {
                        aspectRatio: new AspectRatio(5, 7),
                        resolution: 2160
                    },
                    ctx
                )
            );
            sketchBPair2 = new SketchGraphicsPair(
                sketchB,
                new GraphicsHandler(
                    {
                        aspectRatio: new AspectRatio(4, 3),
                        resolution: 1080
                    },
                    ctx
                )
            );
            sketchBGroup1 = new SketchGraphicsGroup(
                sketchB,
                new GraphicsHandler(
                    {
                        aspectRatio: new AspectRatio(1, 1),
                        resolution: 500
                    },
                    ctx
                )
            );
            sketchBGroup1.addHandler(
                'widescreen',
                new GraphicsHandler(
                    {
                        aspectRatio: new AspectRatio(16, 9),
                        resolution: 3840
                    },
                    ctx
                )
            );

            sketchGrid = new SketchGrid(2, 3, [
                new SketchCell(
                    new SketchGraphicsPair(
                        sketch,
                        new GraphicsHandler(
                            {
                                aspectRatio: new AspectRatio(3, 1),
                                resolution: 720
                            },
                            ctx
                        )
                    )
                ),
                new SketchCell(
                    new SketchGraphicsPair(
                        sketchB,
                        new GraphicsHandler(
                            {
                                aspectRatio: new AspectRatio(3, 1),
                                resolution: 720
                            },
                            ctx
                        )
                    )
                ),
                new SketchCell(
                    new SketchGraphicsPair(
                        new GradientGraphs(),
                        new GraphicsHandler(
                            {
                                aspectRatio: new AspectRatio(3, 1),
                                resolution: 720
                            },
                            ctx
                        )
                    )
                ),
                new SketchCell(
                    new SketchGraphicsPair(
                        new GradientGraphs(),
                        new GraphicsHandler(
                            {
                                aspectRatio: new AspectRatio(3, 1),
                                resolution: 720
                            },
                            ctx
                        )
                    )
                ),
                new SketchCell(
                    new SketchGraphicsPair(
                        new GradientGraphs(),
                        new GraphicsHandler(
                            {
                                aspectRatio: new AspectRatio(3, 1),
                                resolution: 720
                            },
                            ctx
                        )
                    )
                ),
                new SketchCell(
                    new SketchGraphicsPair(
                        new GradientGraphs(),
                        new GraphicsHandler(
                            {
                                aspectRatio: new AspectRatio(3, 1),
                                resolution: 720
                            },
                            ctx
                        )
                    )
                ),
            ]);

            console.log(sketchPair1, sketchPair2, sketchBPair1, sketchBPair2, sketchBGroup1);
        };

        ctx.draw = (): void => {
            ctx.background(255);
            sketchGrid.draw(ctx, 0, 0, ctx.width, ctx.height, 0.9, 'center');
            // ctx.imageMode(ctx.CENTER);
            // const width1: number = ctx.width / 3.0;
            // const offsetX: number = width1 / 2.0;
            // const offsetY: number = ctx.height / 4.0;
            //
            // sketchPair1.draw(ctx, offsetX, offsetY, width1, ctx.height / 2.0);
            // sketchPair2.draw(ctx, width1 + offsetX, offsetY, width1, ctx.height / 2.0);
            //
            // sketchGrid.draw(ctx, (2 * width1), 0, width1, ctx.height / 2.0, 25, 25, ctx.CENTER);
            //
            // const widthB: number = ctx.width / 3.0;
            // const offsetXB: number = widthB / 2.0;
            //
            // sketchBPair1.draw(ctx, offsetXB, ctx.height / 2.0 + offsetY, widthB, ctx.height / 2.0);
            // sketchBPair2.draw(ctx, widthB + offsetXB, ctx.height / 2.0 + offsetY, widthB, ctx.height / 2.0);
            // sketchBGroup1.draw(ctx, 2 * widthB + offsetXB, ctx.height / 2.0 + offsetY, widthB, ctx.height / 2.0);
        };

        ctx.keyPressed = (): void => {
            if (ctx.keyIsDown('a')) {
                sketchBGroup1.setActiveHandler('widescreen');
            } else if (ctx.keyIsDown('d')) {
                sketchBGroup1.setActiveHandler('default');
            }
        };

        ctx.windowResized = (): void => {
            decorateCanvas();
        };
    }
}
