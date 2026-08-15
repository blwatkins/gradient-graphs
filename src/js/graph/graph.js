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

class Graph {
    constructor(scale) {
        this.scale = scale;
        this.nodes = [];
        this.adjacencyList = new Map();
        this.compactAdjacencyList = new Map();
        this.edges = [];
    }

    getNodes() {
        return this.nodes;
    }

    getScale() {
        return this.scale;
    }

    getEdges() {
        return this.edges;
    }

    buildRandomNode() {
        let min = this.scale.getMin();
        let max = this.scale.getMax();
        let x = randomFloat(min.x, max.x);
        let y = randomFloat(min.y, max.y);
        let position = createVector(x, y);
        return new Node(position);
    }

    initializeAdjacencyLists() {
        this.nodes.forEach(node => {
            this.adjacencyList.set(node, []);
            this.compactAdjacencyList.set(node, []);
        });
    }

    buildCompactAdjacencyList() {
        this.nodes.forEach(node => {
            let fullAdjacencyList = this.adjacencyList.get(node);
            let compactAdjacencyList = this.compactAdjacencyList.get(node);
            let nodePosition = node.getPosition();

            fullAdjacencyList.forEach(a => {
                let aPosition = a.getPosition();

                if (aPosition.x < nodePosition.x) {
                    compactAdjacencyList.push(a);
                }
            });
        });
    }

    buildEdges() {
        this.nodes.forEach(node => {
            let compactAdjacencyList = this.compactAdjacencyList.get(node);

            compactAdjacencyList.forEach(a => {
                let edge = new Edge(node, a);
                this.edges.push(edge);
            });
        });
    }
}
