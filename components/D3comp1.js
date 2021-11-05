const React = require('react');
const D3Component = require('idyll-d3-component');
const d3 = require('d3');

const padding = 24;
const labelHeight = 32;
const numCircles = Math.floor((1000 - (padding * 2) - 1) / 6 + 1);

// data
const numApplicants = 11462;
const numApplicants2024 = 10388;
const numAccepted = 745;
const numAccepted2024 = 895;
const numStudents = 469;
const numStudents2024 = 460;
const numGap = 83;
const numGap2024 = 7;
// const indexAccepted = d3.shuffle((new Array(numApplicants).fill(0)).map((d, i) => i)).slice(0, numAccepted);
const indexAccepted = new Array(numAccepted).fill(0).map((d, i) => i);
// const indexStudents = indexAccepted.sort((a, b) => a - b).slice(0, numStudents - numGap);
const indexStudents = new Array(numStudents).fill(0).map((d, i) => i);

const percentages = {
    asian: 0.155,
    black: 0.07,
    latinx: 0.17,
    native: 0.01,
    international: 0.15,
    white: 0.325,
    unknown: 0.120,
}

const percentages2024 = {
    asian: 0.198,
    black: 0.108,
    latinx: 0.165,
    international: 0.105,
    white: 0.306,
    unknown: 0.118,
}

function getLegendHtml(data) {
    let retval = `<div class="legend-container">`;
    for (let datum of data) {
        retval += `
<div class="legend-container legend-item">
    <div class="legend-circle" style="background: ${datum.color}"></div>
    <span>${datum.label}</span>
</div>
`;
    }
    retval += "</div>";

    return retval;
}

class D3comp1 extends D3Component {
    initialize(node, props) {
        const svg = (this.svg = d3.select(node).append('svg'));

        node.style.height = "100vh";
        node.style.width = "100vw";

        const containerHeight = node.clientHeight;
        const containerWidth = node.clientWidth;

        svg
            .attr('viewBox', `0 0 1000 ${1000 * containerHeight / containerWidth}`)
            .style('width', '100%')
            .style('height', 'auto');

        svg
            .selectAll("circle.applicant")
            .data(new Array(numApplicants).fill(0))
            .enter()
            .append('circle')
            .style("fill", "#ffffff")
            .attr('r', 1.5)
            .attr('cx', (d, i) => (i % numCircles) * 6 + padding)
            .attr('cy', (d, i) => Math.floor(i / numCircles) * 6 + padding)
            .attr("class", (d, i) => "applicant" + (indexAccepted.includes(i) ? " accepted" : " rejected") + (indexStudents.includes(i) ? " student" : " harvard"))

        svg
            .selectAll("circle.gapper.student")
            .data(new Array(numGap).fill(0))
            .enter()
            .append("circle")
            .attr("r", 0)
            .attr("cx", (d, i) => ((i + numAccepted) % (Math.floor(numCircles / 4) - 1)) * 12 + padding)
            .attr('cy', (d, i) => Math.floor((i + numAccepted) / (Math.floor(numCircles / 4) - 1)) * 12 + padding)
            .style("fill", "blue")
            .attr("class", "student gapper");

        svg
            .selectAll("circle.accepted2024")
            .data(new Array(numAccepted2024).fill(0))
            .enter()
            .append("circle")
            .attr("r", 0)
            .attr("cx", (d, i) => ((i % (Math.floor(numCircles / 4) - 1)) * 12 + padding + (Math.floor(numCircles / 4) + 1) * 12))
            .attr('cy', (d, i) => (Math.floor((i) / (Math.floor(numCircles / 4) - 1)) * 12 + padding))
            .style("opacity", 0.5)
            .style("fill", "#ffffff")
            .attr("class", (d, i) => ("accepted2024" + (i < (numStudents2024 - numGap2024) ? " student2024" : " harvard2024")))

        svg
            .selectAll("circle.gapper2024")
            .data(new Array(numGap2024).fill(0))
            .enter()
            .append("circle")
            .attr("r", 0)
            .attr("cx", (d, i) => (((i + numAccepted2024) % (Math.floor(numCircles / 4) - 1)) * 12 + padding + (Math.floor(numCircles / 4) + 1) * 12))
            .attr('cy', (d, i) => (Math.floor((i + numAccepted2024) / (Math.floor(numCircles / 4) - 1)) * 12 + padding))
            .style("opacity", 0.5)
            .style("fill", "blue")
            .attr("class", "gapper2024 student2024")

        svg
            .selectAll("text.classLabel")
            .data([2024, 2025])
            .enter()
            .append("text")
            .attr("class", "classLabel")
            .text(d => `co${d}`)
            .attr("x", d => (d === 2024) ? padding : (containerWidth / 2 + 2 * padding))
            .attr("y", 36)
            .style("opacity", 0)
            .attr("fill", "#ffffff")
            .style("size", 20);
    }

    update(props, oldProps) {
        const {state} = props;

        d3.select("#d3-legend")
            .style("display", "block")
            .html(null);

        if (state !== 1 && state < 6) {
            this.svg
                .selectAll("circle.applicant")
                .style("fill", "#ffffff")
                .transition()
                .duration(750)

            this.svg
                .selectAll("circle.rejected")
                .transition()
                .duration(750)
                .attr("r", 0);
        }

        if (state < 3) {
            this.svg
                .selectAll("circle.gapper")
                .transition()
                .duration(750)
                .attr("r", 0);

            this.svg
                .selectAll("text.classLabel")
                .transition()
                .duration(750)
                .style("opacity", 0);
        }

        if (state >= 3) {
            this.svg
                .selectAll("circle.student")
                .transition()
                .duration(750)
                .attr("r", 3);

            this.svg
                .selectAll("text.classLabel")
                .transition()
                .duration(750)
                .style("opacity", 1);
        }

        if (state < 4) {
            this.svg
                .selectAll("circle.student2024, circle.accepted2024")
                .transition()
                .duration(750)
                .attr("r", 0);
        }

        if (state < 6) {
            this.svg
                .selectAll("circle.accepted2024")
                .style("fill", "#ffffff")
                .transition()
                .duration(750)
                .attr("r", 0);
        }

        switch (state) {
            case 1: {
                this.svg
                    .selectAll('circle.applicant')
                    .transition()
                    .duration(750)
                    .attr('r', 1.5)
                    .attr('cx', (d, i) => ((i % numCircles) * 6 + padding))
                    .attr('cy', (d, i) => (Math.floor(i / numCircles) * 6 + padding))
                    .style("fill", (d, i) => ((i > numApplicants2024) ? "blue" : "#ffffff"));

                d3.select("#d3-legend")
                    .html(
                        getLegendHtml(
                            [{label: "One application", color: "#ffffff"}, {label: "More applications than previous year", color: "blue"}]
                        )
                    )

                break;
            }
            case 2: {
                this.svg
                    .selectAll('circle.accepted')
                    .transition()
                    .duration(750)
                    .attr('r', 1.5)
                    .attr('cx', (d, i) => ((i % numCircles) * 6 + padding))
                    .attr('cy', (d, i) => (Math.floor(i / numCircles) * 6 + padding));

                this.svg
                    .selectAll('circle.rejected')
                    .transition()
                    .attr('r', 1.5)
                    .duration(750)
                    .attr("r", 0);

                d3.select("#d3-legend")
                    .html(getLegendHtml([{label: "One admitted student", color: "#ffffff"}]));

                break;
            }
            case 3: {
                const numPerRow = Math.floor(numCircles / 4) - 1;

                this.svg
                    .selectAll('circle.accepted')
                    .transition()
                    .duration(750)
                    .attr('r', 3)
                    .attr('cx', (d, i) => (i % numPerRow) * 12 + padding)
                    .attr('cy', (d, i) => (Math.floor(i / numPerRow) * 12 + padding + labelHeight));

                this.svg
                    .selectAll("circle.gapper.student")
                    .transition()
                    .duration(750)
                    .attr("cx", (d, i) => (((i + numAccepted) % numPerRow) * 12 + padding))
                    .attr("cy", (d, i) => (Math.floor((i + numAccepted) / numPerRow) * 12 + padding + labelHeight))

                this.svg
                    .selectAll("circle.gapper.student")
                    .transition()
                    .delay(750)
                    .duration(750)
                    .style("fill", "blue")
                    .attr("r", 3)

                this.svg
                    .selectAll("circle.accepted2024")
                    .transition()
                    .duration(750)
                    .attr("r", 3)
                    .attr('cx', (d, i) => (i % numPerRow * 12 + padding + 12 * (numPerRow + 2)))
                    .attr('cy', (d, i) => Math.floor(i / numPerRow) * 12 + padding + labelHeight)

                this.svg
                    .selectAll("circle.gapper2024")
                    .transition()
                    .duration(750)
                    .attr('cx', (d, i) => ((i + numAccepted2024) % numPerRow * 12 + padding + 12 * (numPerRow + 2)))
                    .attr('cy', (d, i) => Math.floor((i + numAccepted2024) / numPerRow) * 12 + padding + labelHeight)

                this.svg
                    .selectAll("circle.gapper2024")
                    .transition()
                    .delay(750)
                    .duration(750)
                    .style("fill", "blue")
                    .attr("r", 3)

                d3.select("#d3-legend")
                    .html(getLegendHtml([
                        {label: "One admitted student", color: "#ffffff"},
                        {label: "Deferred enrollment", color: "blue"},
                    ]));

                break;
            }
            case 4: {
                this.svg
                    .selectAll("circle.harvard, circle.harvard2024")
                    .transition()
                    .duration(750)
                    .attr("r", 0)

                const numPerRow = Math.floor(numCircles / 4) - 1;

                this.svg
                    .selectAll("circle.student")
                    .style("fill", "#ffffff")
                    .transition()
                    .duration(750)
                    .attr("r", 3)
                    .attr('cx', (d, i) => (i % numPerRow * 12 + padding))
                    .attr('cy', (d, i) => Math.floor(i / numPerRow) * 12 + padding + labelHeight)

                this.svg
                    .selectAll("circle.student2024")
                    .style("fill", "#ffffff")
                    .transition()
                    .duration(750)
                    .attr("r", 3)
                    .attr('cx', (d, i) => (i % numPerRow * 12 + padding + 12 * (numPerRow + 2)))
                    .attr('cy', (d, i) => Math.floor(i / numPerRow) * 12 + padding + labelHeight)

                d3.select("#d3-legend")
                    .html(getLegendHtml([
                        {label: "One enrolled student", color: "#ffffff"},
                    ]));

                break;
            }
            case 5: {
                const categories = ["black", "native", "latinx", "asian", "international", "white", "unknown"];
                const categoryNums = categories.map(d => numStudents * percentages[d]);
                const categoryNums2024 = categories.map(d => numStudents2024 * (percentages2024[d] || 0));
                const categoryCutoffs = categories.map((d, i) => [d, categoryNums.slice(0, i + 1).reduce((a, b) => a + b, 0)]);

                console.log(categoryCutoffs);

                const categoryCutoffs2024 = categories.map((d, i) => [d, categoryNums2024.slice(0, i + 1).reduce((a, b) => a + b, 0)]);
                const categoryColors = {
                    black: "#F06FBC",
                    native: "#A465BE",
                    latinx: "#4D5BAC",
                    asian: "#00549C",
                    // multiracial: "#00A5BC",
                    international: "#00C8A3",
                    white: "#88E581",
                    unknown: "#ffffff",
                };

                this.svg
                    .selectAll("circle.student")
                    .transition()
                    .duration(750)
                    .style("fill", (d, i) => {
                        for (let cutoffPair of categoryCutoffs) {
                            if (i < cutoffPair[1]) return categoryColors[cutoffPair[0]];
                        }

                        return "#ffffff";
                    })

                this.svg
                    .selectAll("circle.student2024")
                    .transition()
                    .duration(750)
                    .style("fill", (d, i) => {
                        for (let cutoffPair of categoryCutoffs2024) {
                            if (i < cutoffPair[1]) return categoryColors[cutoffPair[0]];
                        }

                        return "#ffffff";
                    })

                d3.select("#d3-legend")
                    .html(getLegendHtml([
                        {label: "One enrolled student", color: "#ffffff"},
                    ]));

                break;
            }
            case 6: {
                this.svg
                    .selectAll("circle.student")
                    .transition()
                    .duration(750)
                    .style("fill", (d, i) => (i < 0.13 * numStudents ? "blue" : "#ffffff"))

                this.svg
                    .selectAll("circle.student2024")
                    .transition()
                    .duration(750)
                    .style("fill", (d, i) => (i < 0.28 * numStudents2024 ? "blue" : "#ffffff"))

                d3.select("#d3-legend")
                    .html(getLegendHtml([
                        {label: "One enrolled student", color: "#ffffff"},
                        {label: "FLI student", color: "blue"},
                    ]));

                break;
            }
            case 7:
            case 8: {
                this.svg
                    .selectAll("circle.student")
                    .transition()
                    .duration(750)
                    .style("fill", (d, i) => (i < 17 ? "#F06FBC" : i < 35 ? "#88E581" : i < (0.13 * numStudents2024) ? "blue" : "#ffffff"))

                this.svg
                    .selectAll("circle.student2024")
                    .transition()
                    .duration(750)
                    .style("fill", (d, i) => (i < 16 ? "#F06FBC" : i < 36 ? "#88E581" : i < (0.28 * numStudents2024) ? "blue" : "#ffffff"))

                d3.select("#d3-legend")
                    .html(getLegendHtml([
                        {label: "One enrolled student", color: "#ffffff"},
                        {label: "FLI student", color: "blue"},
                        {label: "QuestBridge Match", color: "#F06FBC"},
                        {label: "Posse Scholar", color: "#88E581"},
                    ]));

                break;
            }
        }
    }
}

module.exports = D3comp1;
