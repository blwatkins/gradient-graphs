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

export class AspectRatio {
    // TODO - widthRatio and heightRatio must both be larger than 1
    // TODO - widthRatio and heightRatio must both be integers
    readonly #widthRatio: number;
    readonly #heightRatio: number;

    // TODO - config?
    constructor(widthRatio: number, heightRatio: number) {
        // TODO - verify values/schema
        this.#widthRatio = widthRatio;
        this.#heightRatio = heightRatio;
    }

    public get widthRatio(): number {
        return this.#widthRatio;
    }

    public get heightRatio(): number {
        return this.#heightRatio;
    }

    public getWidth(resolution: number): number {
        const unit: number = this.#getUnit(resolution);
        return Math.floor(unit * this.#widthRatio);
    }

    public getHeight(resolution: number): number {
        const unit: number = this.#getUnit(resolution);
        return Math.floor(unit * this.#heightRatio);
    }

    #getUnit(resolution: number): number {
        return (resolution / Math.max(this.#widthRatio, this.#heightRatio));
    }
}
