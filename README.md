# Gradient Graphs

The Gradient Graphs generative art algorithm, written by Brittni Watkins.
Originally published on May 8, 2022.

## Description

A Gabriel Graph is a special kind of graph in graph theory where an edge can only be formed between two nodes if the circle formed by those two nodes contains no other nodes in the graph.  A Random Geometric Graph is a graph where an edge can only be formed between two nodes if they are less than a certain distance away from each other.  In this project, I have created random Gabriel Graphs and Random Geometric Graphs, where the graphs have a random number of nodes and each node has a random position.  Each node is assigned a color, and each edge is colored according to the two nodes at each end, with a gradient line and a gradient circle which slowly transitions from one color to the other.  Users can interact with the project to remove the nodes, edge lines, or edge circles, choosing how they would like the graph to be displayed.

Made with p5.js

### Instructions

Press 'a' to toggle the edge circles on and off.
Press 's' to toggle the edge lines on and off.
Press 'd' to toggle the nodes on and off.

## Timeline

- **February 12, 2022:** Brittni begins work on a new generative color system using Java and Processing.
- **February 13, 2022:** Brittni begins work on her generative art system: a collection of pseudo-random number functions and generative color factories written in JavaScript with p5.js.
- **February 20, 2022:** Brittni begins work  on the Growing Graphs Processing sketch.
- **March 29, 2022:** Brittni begins work on the Gradient Graphs algorithm using p5.js and JavaScript.
- **May 8, 2022:** Brittni publishes the Gradient Graphs p5.js sketch as a [Generative Token on fx(hash)](https://www.fxhash.xyz/project/gradient-graphs).
- **August 13, 2026:** Brittni begins work on the Gradient Graphs 2.0 algorithm, which will feature improved aspect ratio and resolution handling and graphs that are able to extend beyond the canvas boundaries.

## Roadmap

### v2.0.0

- [ ] Versioned algorithms published to the web via GitHub Pages deployment
- [ ] Improved aspect ratio and resolution handling
- [ ] Graphs that are able to extend beyond the canvas boundaries

### v3.0.0

- [ ] Conversion of project files from static HTML, CSS, and JavaScript to a Node.js project with dependency management and build scripts
- [ ] Rewrite of full algorithm in TypeScript using the `@blwatkins` generative art utility packages
- [ ] New color palettes, and improved palette selection, color generation, and color selection
- [ ] Algorithm improvements for graph generation and edge detection

## License

The source code of this project and its outputs are licensed under the [Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International (CC BY-NC-ND 4.0) License](https://creativecommons.org/licenses/by-nc-nd/4.0/deed.en).

## Project Status Badges

### [GitHub](https://github.com/blwatkins/gradient-graphs)

![GitHub License](https://badgen.net/github/license/blwatkins/gradient-graphs)
![GitHub Dependabot](https://badgen.net/github/dependabot/blwatkins/gradient-graphs)
![GitHub Last Commit](https://badgen.net/github/last-commit/blwatkins/gradient-graphs)
![GitHub Commits](https://badgen.net/github/commits/blwatkins/gradient-graphs)
![GitHub Commit Activity](https://img.shields.io/github/commit-activity/y/blwatkins/gradient-graphs)
![GitHub Code Size in Bytes](https://img.shields.io/github/languages/code-size/blwatkins/gradient-graphs)
![GitHub Repo Size](https://img.shields.io/github/repo-size/blwatkins/gradient-graphs)
![GitHub Repo File or Directory Count](https://img.shields.io/github/directory-file-count/blwatkins/gradient-graphs)
![GitHub Language Count](https://img.shields.io/github/languages/count/blwatkins/gradient-graphs)

### GitHub Actions

![CodeQL](https://github.com/blwatkins/gradient-graphs/actions/workflows/codeql.yml/badge.svg)
![Deploy GitHub Pages with Jekyll](https://github.com/blwatkins/gradient-graphs/actions/workflows/gh-pages-jekyll.yml/badge.svg)

## Thank Yous

A huge thank you to all the open source contributors who have made this project possible by creating and maintaining the libraries and tools used in this project, and to the open source community for fostering collaboration and innovation.

A special thank you to all the educators, mentors, and content creators who have shared their knowledge and expertise in the fields of algorithmic art, web development, and computer science.
Thank you for giving me the tools, resources, opportunities, support, and inspiration to learn and grow as a developer.

## Resources and References

For additional information about the tools and platforms used to create this project, the following resources may be helpful:

- [Processing](https://processing.org/)
- [p5.js](https://p5js.org/)
- [fx(hash)](https://www.fxhash.xyz/)
- [fx(hash) Docs - Genart on the Blockchain](https://docs.fxhash.xyz/knowledge-base/quickstart/genart-on-the-blockchain)

----

Copyright &copy; 2022-2026 Brittni Watkins.
