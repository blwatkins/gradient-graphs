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

class Node {
    constructor(position) {
        this.position = position.copy();
    }

    getPosition() {
        return this.position;
    }

    static getDistance(a, b) {
        let aPosition = a.getPosition();
        let bPosition = b.getPosition();
        return dist(aPosition.x, aPosition.y, bPosition.x, bPosition.y);
    }

    static getCenterPoint(a, b) {
        let aPosition = a.getPosition();
        let bPosition = b.getPosition();
        let centerX = (aPosition.x + bPosition.x) / 2.0;
        let centerY = (aPosition.y + bPosition.y) / 2.0;
        return createVector(centerX, centerY);
    }
}
