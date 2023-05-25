const json = [
    {name: "a", size: 10, semester: 1},
    {name: "B", size: 4, semester: 2},
    {name: "c", size: 50, semester: 3},
    {name: "x", size: 3, semester: 4},
    {name: "y", size: 1, semester: 5},
    {name: "z", size: 12, semester: 6},
    {name: "x", size: 3, semester: 2},
    {name: "y", size: 10, semester: 4},
    {name: "z", size: 50, semester: 3},
    {name: "a", size: 10, semester: 1},
    {name: "B", size: 4, semester: 2},
    {name: "c", size: 50, semester: 3},
    {name: "x", size: 3, semester: 4},
    {name: "y", size: 1, semester: 5},
    {name: "z", size: 12, semester: 6},
    {name: "x", size: 3, semester: 2},
    {name: "y", size: 10, semester: 4},
    {name: "z", size: 50, semester: 3},
    {name: "a", size: 10, semester: 1},
    {name: "B", size: 4, semester: 2},
    {name: "c", size: 50, semester: 3},
    {name: "x", size: 3, semester: 4},
    {name: "y", size: 1, semester: 5},
    {name: "z", size: 12, semester: 6},
    {name: "x", size: 3, semester: 2},
    {name: "y", size: 10, semester: 4},
    {name: "z", size: 50, semester: 3},
]

data_grouped_after_semester = function () {
    const data = JSON.parse(JSON.stringify(json));

    let semester_eins = [];
    let semester_zwei = [];
    let semester_drei = [];

    for (let i in data) {
        let record = data[i];

        switch (record.semester) {
            case 1:
                semester_eins.push(record);
                break;
            case 2:
                semester_zwei.push(record);
                break;
            case 3:
                semester_drei.push(record);
                break;
            default:
        }
    }

    return [
        {Description: "Semester 1", children: semester_eins},
        {Description: "Semester 2", children: semester_zwei},
        {Description: "Semester 3", children: semester_drei},
    ];
}

const width = window.innerWidth;
const height = window.innerHeight;

document.getElementById("chart").setAttribute("width", `${width}px`)
document.getElementById("chart").setAttribute("height", `${height}px`)

let root = d3.pack()
    .size([width, height])
    .padding(5)(d3.hierarchy({children: json}).sum(d => d.size));

const svg = d3.select("#chart")
    .style("width", "100%")
    .style("height", "auto")
    .attr("font-size", 10)
    .attr("font-family", "sans-serif")
    .attr("text-anchor", "middle");

let node = svg.selectAll("g")
    .data(root.leaves())
    .enter().append("g")
    .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

let circle = node.append("circle")
    .attr("r", d => d.r)
    .attr("stroke", "#00c4ff")
    .attr("stroke-width", d => {
        if (d.height !== 0) {
            return "0px";
        }

        return "2px";
    })
    .attr("fill", d => {
        if (d.height !== 0) {
            return "none";
        }

        return "#d9edf7";
    });

const format = d3.format(",d");
let current_circle = undefined;

circle.on("click", function (e, d) {

    // cleanup previous selected circle
    if (current_circle !== undefined) {
        current_circle.attr("fill", "#d9edf7");
        svg.selectAll("#details-popup").remove();
    }

    // select the circle
    current_circle = d3.select(this);
    current_circle.attr("fill", "#b2e1f9");

    let textBlock = svg.selectAll("#details-popup")
        .data([d])
        .enter()
        .append("g")
        .attr("id", "details-popup")
        .attr("font-size", 14)
        .attr("font-family", "sans-serif")
        .attr("text-anchor", "start")
        .attr("transform", `translate(0, 20)`);

    textBlock.append("text")
        .text("Details:")
        .attr("font-weight", "bold");
    textBlock.append("text")
        .text(d => "Name: " + d.data.name)
        .attr("y", "16");
    textBlock.append("text")
        .text(d => "Size: " + format(d.data.size))
        .attr("y", "32");
    textBlock.append("text")
        .text(d => "Semester: " + format(d.data.semester))
        .attr("y", "48");
});


/** Code for changing the form / changing to list etc. **/
function filterSelection(sortAfter) {
    switch (sortAfter) {
        case 'all': {
            document.getElementById("content").style.display = "block";
            document.getElementById("list").style.display = "none";
            root = d3.pack()
                .size([width, height])
                .padding(5)(d3.hierarchy({children: json}).sum(d => d.size));

            svg.selectAll("g").remove();

            node = svg.selectAll("g")
                .data(root.leaves())
                .enter().append("g")
                .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

            node.append("circle")
                .attr("r", d => d.r)
                .attr("stroke", "#00c4ff")
                .attr("stroke-width", d => {
                    if (d.height !== 0) {
                        return "0px";
                    }

                    return "2px";
                })
                .attr("fill", d => {
                    if (d.height !== 0) {
                        return "none";
                    }

                    return "#d9edf7";
                }).on("click", function (e, d) {

                // cleanup previous selected circle
                if (current_circle !== undefined) {
                    current_circle.attr("fill", "#d9edf7");
                    svg.selectAll("#details-popup").remove();
                }

                // select the circle
                current_circle = d3.select(this);
                current_circle.attr("fill", "#b2e1f9");

                let textBlock = svg.selectAll("#details-popup")
                    .data([d])
                    .enter()
                    .append("g")
                    .attr("id", "details-popup")
                    .attr("font-size", 14)
                    .attr("font-family", "sans-serif")
                    .attr("text-anchor", "start")
                    .attr("transform", `translate(0, 20)`);

                textBlock.append("text")
                    .text("Details:")
                    .attr("font-weight", "bold");
                textBlock.append("text")
                    .text(d => "Name: " + d.data.name)
                    .attr("y", "16");
                textBlock.append("text")
                    .text(d => "Size: " + format(d.data.size))
                    .attr("y", "32");
                textBlock.append("text")
                    .text(d => "Semester: " + format(d.data.semester))
                    .attr("y", "48");
            });
            break;
        }
        case 'semester': {
            document.getElementById("content").style.display = "block";
            document.getElementById("list").style.display = "none";
            root = d3.pack()
                .size([width, height])
                .padding(5)(d3.hierarchy({children: data_grouped_after_semester()}).sum(d => d.size));

            svg.selectAll("g").remove();

            node = svg.selectAll("g")
                .data(root.descendants())
                .enter().append("g")
                .attr("transform", d => `translate(${d.x + 1},${d.y + 1})`);

            node.append("circle")
                .attr("r", d => d.r)
                .attr("stroke", "#00c4ff")
                .attr("stroke-width", d => {
                    if (d.height !== 0) {
                        return "0px";
                    }

                    return "2px";
                })
                .attr("fill", d => {
                    if (d.height !== 0) {
                        return "none";
                    }

                    return "#d9edf7";
                }).on("click", function (e, d) {

                // cleanup previous selected circle
                if (current_circle !== undefined) {
                    current_circle.attr("fill", "#d9edf7");
                    svg.selectAll("#details-popup").remove();
                }

                // select the circle
                current_circle = d3.select(this);
                current_circle.attr("fill", "#b2e1f9");

                let textBlock = svg.selectAll("#details-popup")
                    .data([d])
                    .enter()
                    .append("g")
                    .attr("id", "details-popup")
                    .attr("font-size", 14)
                    .attr("font-family", "sans-serif")
                    .attr("text-anchor", "start")
                    .attr("transform", `translate(0, 20)`);

                textBlock.append("text")
                    .text("Details:")
                    .attr("font-weight", "bold");
                textBlock.append("text")
                    .text(d => "Name: " + d.data.name)
                    .attr("y", "16");
                textBlock.append("text")
                    .text(d => "Size: " + format(d.data.size))
                    .attr("y", "32");
                textBlock.append("text")
                    .text(d => "Semester: " + format(d.data.semester))
                    .attr("y", "48");
            });

            svg.selectAll(".categories")
                .data(root.children)
                .enter()
                .append("g")
                .attr("transform", d => `translate(${d.x + 1},${d.y + d.r + 1})`)
                .append("text")
                .text(d => d.data.Description)
                .attr("font-size", 12)
                .attr("font-family", "sans-serif")
                .attr("text-anchor", "middle");
            break;
        }
        case 'list': {
            document.getElementById("content").style.display = "none";
            const list = document.getElementById("list");
            list.innerHTML = '';
            list.style.display = "block";

            for (const item of json) {
                const li = document.createElement("li");
                const textnode = document.createTextNode(`Name: ${item.name}, Size: ${item.size}, Semester: ${item.semester}`.toString());
                li.appendChild(textnode);
                list.appendChild(li);
            }
            break;
        }
        default: {
            console.log("Not existing");
        }
    }
}

let btnContainer = document.getElementById("myBtnContainer");
const btns = btnContainer.getElementsByClassName("btn");
for (let i = 0; i < btns.length; i++) {
    btns[i].addEventListener("click", function () {
        const current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active", "");
        this.className += " active";
    });
}