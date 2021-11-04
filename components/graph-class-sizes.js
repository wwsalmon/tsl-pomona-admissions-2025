const React = require('react');
const { ResponsiveContainer, LineChart, XAxis, YAxis, Line, Tooltip, Legend, CartesianGrid } = require("recharts");

class CustomComponent extends React.Component {
    render() {
        const { hasError, idyll, updateProps, ...props } = this.props;
        return (
            <ResponsiveContainer width="100%" height={400}>
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
                ]}>
                    <Legend/>
                    <CartesianGrid/>
                    <XAxis dataKey="Semester"/>
                    <YAxis domain={[300, 500]}/>
                    <Line dataKey="First-year" stroke="#F06FBC" strokeWidth={3}/>
                    <Line dataKey="Sophomore" stroke="#A465BE" strokeWidth={3}/>
                    <Line dataKey="Junior" stroke="#00549C" strokeWidth={3}/>
                    <Line dataKey="Senior" stroke="#00C8A3" strokeWidth={3}/>
                    <Line dataKey="Previous Max" stroke="blue" dot={false} />
                    <Tooltip/>
                </LineChart>
            </ResponsiveContainer>
        );
    }
}

module.exports = CustomComponent;
