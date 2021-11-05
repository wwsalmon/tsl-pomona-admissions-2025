const React = require('react');
const { ResponsiveContainer, LineChart, XAxis, YAxis, Line, Tooltip, Legend, CartesianGrid } = require("recharts");

class CustomComponent extends React.Component {
    render() {
        const { hasError, idyll, updateProps, ...props } = this.props;
        return (
            <div style={{overflowX: "auto", width: "100%"}}>
                <ResponsiveContainer width="100%" minWidth={400} height={300}>
                    <LineChart data={[
                        {"Semester": "Fall '11", "First-year": 397, "Sophomore": 409, "Junior": 391, "Senior": 370, "Previous Max": 451},
                        {"Semester": "Fall '12", "First-year": 401, "Sophomore": 395, "Junior": 405, "Senior": 384, "Previous Max": 451},
                        {"Semester": "Fall '13", "First-year": 398, "Sophomore": 401, "Junior": 389, "Senior": 399, "Previous Max": 451},
                        {"Semester": "Fall '14", "First-year": 451, "Sophomore": 394, "Junior": 389, "Senior": 401, "Previous Max": 451},
                        {"Semester": "Fall '15", "First-year": 402, "Sophomore": 446, "Junior": 398, "Senior": 394, "Previous Max": 451},
                        {"Semester": "Fall '16", "First-year": 416, "Sophomore": 398, "Junior": 432, "Senior": 396, "Previous Max": 451},
                        {"Semester": "Fall '17", "First-year": 419, "Sophomore": 427, "Junior": 390, "Senior": 435, "Previous Max": 451},
                        {"Semester": "Fall '18", "First-year": 415, "Sophomore": 423, "Junior": 427, "Senior": 390, "Previous Max": 451},
                        {"Semester": "Fall '19", "First-year": 418, "Sophomore": 422, "Junior": 421, "Senior": 427, "Previous Max": 451},
                        {"Semester": "Fall '20", "First-year": 404, "Sophomore": 373, "Junior": 335, "Senior": 352, "Previous Max": 451},
                        {"Semester": "Fall '21", "First-year": 469, "Sophomore": 460, "Junior": 455, "Senior": 363, "Previous Max": 451},
                    ]} margin={{left: 20, bottom: 20, right: 20}}>
                        <Legend height={100} wrapperStyle={{bottom: 0}}/>
                        <CartesianGrid/>
                        <XAxis dataKey="Semester" label={{value: "Semester", position: "bottom"}}/>
                        <YAxis domain={[300, 500]} label={{value: "Number of students", angle: -90, position: "insideLeft"}}/>
                        <Line dataKey="First-year" stroke="#F06FBC" strokeWidth={3} dot={{r: 4}}/>
                        <Line dataKey="Sophomore" stroke="#A465BE" strokeWidth={3} dot={{r: 4}}/>
                        <Line dataKey="Junior" stroke="#00549C" strokeWidth={3} dot={{r: 4}}/>
                        <Line dataKey="Senior" stroke="#00C8A3" strokeWidth={3} dot={{r: 4}}/>
                        <Line dataKey="Previous Max" stroke="blue" dot={false} />
                        <Tooltip/>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        );
    }
}

module.exports = CustomComponent;
