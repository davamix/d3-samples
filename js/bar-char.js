import * as common from "./common.js";

function drawBars() {
    const svg = d3.select("svg#barchar")
        .append("g").attr("fill", "orange");

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

    // BARS
    svg.selectAll("rect")
        .data(common.data)
        .join("rect")
        .attr("x", d => xScale(d.name))
        .attr("y", d => yScale(d.value))
        .attr("height", d => yScale(0) - yScale(d.value))
        .attr("width", xScale.bandwidth());

    svg.append("g").call(xAxis);

    svg.append("g").call(yAxis);

}

export { drawBars };