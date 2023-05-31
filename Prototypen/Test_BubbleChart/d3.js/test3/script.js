const width = window.innerWidth;
const height = window.innerHeight;
let colorScale = ['orange', 'lightblue', '#B19CD9'];
let xCenter = [100, 300, 500];

let numNodes = 100;
let nodes = d3.range(numNodes).map(function (d, i) {
    return {
        radius: Math.random() * 25,
        category: i % 3
    }
});

nodes = [{radius: 30, category: 1},
    {radius: 43, category: 2},
    {radius: 23, category: 2},
    {radius: 100, category: 0},
    {radius: 35, category: 1},
    {radius: 53, category: 2},
    {radius: 13, category: 2},
    {radius: 10, category: 0},
];

const bubble = data => d3.pack()
    .size([width, height])
    .padding(2)(d3.hierarchy({children: data})
        .sum(d => d.radius));

d3.select("svg").attr("width", width).attr("height", height);

let simulation = d3.forceSimulation(bubble(nodes).children)
    .force('charge', d3.forceManyBody().strength(5))
    .force('x', d3.forceX().x(width / 2))
    .force('collision', d3.forceCollide().radius(function (d) {
        return d.radius
    }))
    .on('tick', ticked);

function ticked() {
    const u = d3.select('svg g')
        .selectAll('circle')
        .data(nodes)
        .join('circle')
        .attr('r', function (d) {
            return d.radius;
        })
        .attr('stroke', '#bbb')
        .attr('stroke-width', '2px')
        .attr('stroke-opacity', 1.0)
        .attr('fill-opacity', 0.8)
        .attr('fill', function (d) {
            return colorScale[d.category];
        })
        .attr('cx', function (d) {
            return d.x;
        })
        .attr('cy', function (d) {
            return d.y;
        });
}

function filterSelection(sortAfter) {
    switch (sortAfter) {
        case 'semester': {
            document.getElementById("content").style.display = "block";
            document.getElementById("list").style.display = "none";
            simulation = d3.forceSimulation(nodes)
                .force('charge', d3.forceManyBody().strength(5))
                .force('x', d3.forceX().x(function (d) {
                    return xCenter[d.category];
                }))
                .force('collision', d3.forceCollide().radius(function (d) {
                    return d.radius;
                }))
                .on('tick', ticked);
            break;
        }
        case 'all': {
            document.getElementById("content").style.display = "block";
            document.getElementById("list").style.display = "none";
            simulation = d3.forceSimulation(nodes)
                .force('charge', d3.forceManyBody().strength(5))
                .force('x', d3.forceX().x(function (d) {
                    return width / 2;
                }))
                .force('collision', d3.forceCollide().radius(function (d) {
                    return d.radius
                }))
                .on('tick', ticked);
            break;
        }
        case 'list': {
            document.getElementById("content").style.display = "none";
            const list = document.getElementById("list");
            list.innerHTML = '';
            list.style.display = "block";

            for (const item of nodes) {
                const node = document.createElement("li");
                const textnode = document.createTextNode(`radius: ${item.radius}   category: ${item.category}`);
                node.appendChild(textnode);
                list.appendChild(node);
            }
            break;
        }
    }
}

(async () => {
    filterSelection('all');
})();

let btnContainer = document.getElementById("myBtnContainer");
const btns = btnContainer.getElementsByClassName("btn");
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        const current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}