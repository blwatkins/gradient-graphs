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

class GabrielGraph extends Graph {
    constructor(numNodes) {
        super(new Scale(createVector(-0.5, -0.5), createVector(0.5, 0.5)));
        this.buildNodes(numNodes);
        this.initializeAdjacencyLists();
        this.buildAdjacencyList();
    }

    buildNodes(numNodes) {
        for (let i = 0; i < numNodes; i++) {
            let node = this.buildRandomNode();
            this.nodes.push(node);
        }
    }

    buildAdjacencyList() {
        for (let i = 0; i < this.nodes.length; i++) {
            let a = this.nodes[i];

            for (let j = i + 1; j < this.nodes.length; j++) {
                let b = this.nodes[j];
                let hasIntersectingNode = this.hasIntersectingNode(a, b);

                if (!hasIntersectingNode) {
                    let aAdjacency = this.adjacencyList.get(a);
                    let bAdjacency = this.adjacencyList.get(b);
                    aAdjacency.push(b);
                    bAdjacency.push(a);
                }
            }
        }

        this.buildCompactAdjacencyList();
        this.buildEdges();
    }

    hasIntersectingNode(a, b) {
        let hasIntersect = false;
        let diameter = Node.getDistance(a, b);
        let radius = diameter / 2.0;
        let center = Node.getCenterPoint(a, b);

        for (let i = 0; i < this.nodes.length; i++) {
            let node = this.nodes[i];

            if (node !== a && node !== b) {
                let nodePosition = node.getPosition();
                let distFromCenter = dist(center.x, center.y, nodePosition.x, nodePosition.y);

                if (distFromCenter < radius) {
                    hasIntersect = true;
                    break;
                }
            }
        }

        return hasIntersect;
    }
}
