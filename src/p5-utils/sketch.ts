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

/**
 * Developer Notes:
 * A Sketch is the core of a generative art algorithm.
 * It should be renderable to a p5.Graphics object and drawable to a p5.js Canvas (p5).
 * Sketch must stay separate from sketch instance and graphics for aspect ratio agnostic rendering
 */
export abstract class Sketch {
    public abstract renderTo(ctx: p5.Graphics | p5): void;
}
