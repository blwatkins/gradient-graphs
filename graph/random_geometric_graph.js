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

class RandomGeometricGraph extends Graph {
    constructor(numNodes, expectedDegree) {
        super(new Scale(createVector(-0.5, -0.5), createVector(0.5, 0.5)));
        this.radius = sqrt(expectedDegree / (numNodes * PI));
        this.buildNodes(numNodes);
        this.initializeAdjacencyLists();
        this.buildAdjacencyLists();
    }

    buildNodes(numNodes) {
        for (let i = 0; i < numNodes; i++) {
            let node = this.buildRandomNode();
            this.nodes.push(node);
        }
    }

    buildAdjacencyLists() {
        for (let i = 0; i < this.nodes.length; i++) {
            let a = this.nodes[i];

            for (let j = i + 1; j < this.nodes.length; j++) {
                let b = this.nodes[j];
                let distance = Node.getDistance(a, b);
                let hasEdge = distance <= this.radius;

                if (hasEdge) {
                    let aAdjacencyList = this.adjacencyList.get(a);
                    let bAdjacencyList = this.adjacencyList.get(b);
                    aAdjacencyList.push(b);
                    bAdjacencyList.push(a);
                }
            }
        }

        this.buildCompactAdjacencyList();
        this.buildEdges();
    }
}
