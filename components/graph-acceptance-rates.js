const React = require('react');
const { ResponsiveContainer, LineChart, XAxis, YAxis, Line, Tooltip, Legend, CartesianGrid, Label } = require("recharts");

class CustomComponent extends React.Component {
    render() {
        const { hasError, idyll, updateProps, ...props } = this.props;
        return (
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={[
                    {"Class": "2022", "Acceptance rate": 6.9},
                    {"Class": "2023", "Acceptance rate": 7.4},
                    {"Class": "2024", "Acceptance rate": 8.6},
                    {"Class": "2025", "Acceptance rate": 6.5},
                ]} margin={{left: 20, bottom: 20, right: 20}}>
                    <Legend position="bottom"/>
                    <CartesianGrid/>
                    <XAxis dataKey="Class" label={{value: "Class year", position: "insideBottom"}}/>
                    <YAxis domain={[5, 10]} label={{value: "Acceptance rate (%)", angle: -90, position: "insideLeft"}}/>
                    <Line dataKey="Acceptance rate" stroke="blue" strokeWidth={3} dot={{r: 4}}/>
                    <Tooltip/>
                </LineChart>
            </ResponsiveContainer>
        );
    }
}

module.exports = CustomComponent;
