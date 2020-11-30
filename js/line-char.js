import * as common from "./common.js";

function drawLines() {
    const svg = d3.select("svg#linechar");

    // SCALES 
    const xScale = d3.scaleBand()
        .domain(common.data.map(d => d.name))
        .range([common.margin.left, common.width - common.margin.right])
        .padding(0.1);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(common.data, d => d.value)])
        .range([common.height - common.margin.bottom, common.margin.top]);

    // AXIS
    const xAxis = g => g.attr("transform", `translate(0, ${common.height - common.margin.bottom})`)
        .call(d3.axisBottom(xScale));

    const yAxis = g => g.attr("transform", `translate(${common.margin.left},0)`)
        .call(d3.axisLeft(yScale));

    //LINES
    const line = d3.line()
        .x(d => xScale(d.name))
        .y(d => yScale(d.value));


    svg.append("path")
        .data([common.data])
        .attr("class", "line")
        .attr("d", line);

    svg.append("g").call(xAxis);

    svg.append("g").call(yAxis);

}

export { drawLines };


