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

let graphDisplay;
let graphType;
let nodeDispersalType;
let backgroundType;
let backgroundColor;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    graphType = getRandomGraphType();
    nodeDispersalType = getRandomNodeDispersalType();
    let graph = buildGraph(graphType, nodeDispersalType);
    let center = createVector(0, 0);
    let colorGenerators = getRandomColorGenerators();
    graphDisplay = new GraphDisplay(graph, center, width - (width / 50), height - (height / 50), colorGenerators);
    backgroundType = getRandomBackgroundType();
    backgroundColor = getBackgroundColor(backgroundType);
}

function draw() {
    background(backgroundColor);
    graphDisplay.display();
}

function keyPressed() {
    if (key === 'a') {
        graphDisplay.toggleDisplayCircle();
    } else if (key === 's') {
        graphDisplay.toggleDisplayLine();
    } else if (key === 'd') {
        graphDisplay.toggleDisplayNode();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function getRandomGraphType() {
    let bool = randomBoolean();
    let graphType = "random";

    if (bool) {
        graphType = "gabriel";
    }

    return graphType;
}

function getRandomBackgroundType() {
    let r = randomFloat(0, 1);
    let chanceOfBlack = 0.7;
    let backgroundType = "black";

    if (r > chanceOfBlack) {
        backgroundType = "white";
    }

    return backgroundType;
}

function buildGraph(graphType, nodeDispersalType) {
    let graph;
    let numNodes;

    if (nodeDispersalType === "low") {
        numNodes = randomInt(5, 200);
    } else if (nodeDispersalType === "medium") {
        numNodes = randomInt(200, 600);
    } else {
        numNodes = randomInt(600, 800);
    }

    if (graphType === "gabriel") {
        graph = new GabrielGraph(numNodes);
    } else {
        let expectedDegree;

        if (nodeDispersalType === "low") {
            expectedDegree = 5;
        } else if (nodeDispersalType === "medium") {
            expectedDegree = 6;
        } else {
            expectedDegree = 7;
        }

        graph = new RandomGeometricGraph(numNodes, expectedDegree);
    }

    return graph;
}

function getRandomNodeDispersalType() {
    let r = randomFloat(0, 1);
    let chanceOfLow = 0.5;
    let chanceOfMedium = 0.3;
    let nodeDispersal;

    if (r < chanceOfLow) {
        nodeDispersal = "low";
    } else if (r < chanceOfLow + chanceOfMedium) {
        nodeDispersal = "medium";
    } else {
        nodeDispersal = "high";
    }

    return nodeDispersal;
}

function getRandomColorGenerators() {
    let colorGeneratorFactory = new UniformColorGeneratorFactory();
    let colorGenerators = [];
    let numColorGenerators = randomInt(1, 4);

    for (let i = 0; i < numColorGenerators; i++) {
        let colorGenerator = colorGeneratorFactory.getColorGenerator();
        colorGenerators.push(colorGenerator);
    }

    return colorGenerators;
}

function getBackgroundColor(backgroundType) {
    let col = color(0);

    if (backgroundType === "white") {
        col = color(255);
    }

    return col;
}
