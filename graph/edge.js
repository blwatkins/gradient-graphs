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

class Edge {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }

    getA() {
        return this.a;
    }

    getB() {
        return this.b;
    }

    isEqual(node) {
        let equals = false;

        if (node !== null) {
            let haveSameNodes = (this.a === node.getA()) && (this.b === node.getB());
            let haveDifferentNodes = (this.a === node.getB()) && (this.b === node.getA());
            equals = haveSameNodes || haveDifferentNodes;
        }

        return equals;
    }
}
