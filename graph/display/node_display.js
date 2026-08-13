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

class NodeDisplay {
    constructor(positionPercentage, diameter, color) {
        this.positionPercentage = positionPercentage.copy();
        this.diameter = diameter;
        this.color = color;
        this.displayNode = true;
        this.pointPercentages = [];
        this.buildPoints();
    }

    buildPoints() {
        let theta = 0;
        let numPoints = 20;
        let radius = this.diameter / 2.0;

        for (let i = 0; i < numPoints; i++) {
            let baseX = this.positionPercentage.x * width;
            let baseY = this.positionPercentage.y * height;
            let x = baseX + (cos(theta) * radius);
            let y = baseY + (sin(theta) * radius);
            let xPercent = x / width;
            let yPercent = y / height;
            let percentVector = createVector(xPercent, yPercent);
            this.pointPercentages.push(percentVector);
            theta += TWO_PI / numPoints;
        }
    }

    getColor() {
        return this.color;
    }

    toggleDisplayNode() {
        this.displayNode = !this.displayNode;
    }

    display() {
        if (this.displayNode) {
            this.displayShape();
        }
    }

    displayShape() {
        beginShape();
        fill(this.color.getColor());
        noStroke();

        this.pointPercentages.forEach(point => {
            vertex(point.x * width, point.y * height);
        });

        endShape(CLOSE);
    }
}
