const svg = d3.select("#chart");
const width = window.innerWidth;
const height = window.innerHeight;

svg.attr("width", width).attr("height", height);

let numNodes = 100;
let nodes = d3.range(numNodes).map(function (d, i) {
    return {
        name: `${Math.random() * 25}`,
        size: Math.random() * 25,
        value: i % 3
    }
});

// Sort the data in descending order based on the value property
nodes.sort(function (x, y) {
    return d3.descending(x.size, y.size);
});

const simulation = d3.forceSimulation(nodes)
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("collide", d3.forceCollide((d) => d.size + 1));

const bubbles = svg.selectAll(".bubble")
    .data(nodes)
    .enter()
    .append("circle")
    .attr("class", "bubble")
    .attr("r", (d) => d.size)
    .attr("fill", "steelblue");

simulation.on("tick", ticked);

function ticked() {
    bubbles
        .attr("cx", (d) => d.x)
        .attr("cy", (d) => d.y);
}

// Start the simulation after sorting the bubbles
simulation.alpha(1).restart();