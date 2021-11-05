const React = require('react');

class CustomComponent extends React.Component {
    render() {
        const { hasError, idyll, updateProps, ...props } = this.props;

        const categoryColors = {
            "Black/African American": "#F06FBC",
            "Latinx": "#4D5BAC",
            "Asian American": "#00549C",
            "Multiracial": "#00A5BC",
            "International": "#00C8A3",
            "White": "#88E581",
            "Unknown": "#000000",
        };

        const raceData = [
            {"label": "Black/African American", 2025: "🔻 7%", 2024: "10.8%"},
            {"label": "Latinx", 2025: "🔻 15.5%", 2024: "16.5%"},
            {"label": "Asian American", 2025: "🔻 15.5%", 2024: "19.8%"},
            {"label": "Multiracial", 2025: "🔻 0.5%", 2024: "7.3%"},
            {"label": "International", 2025: "🔼 15%", 2024: "10.5%"},
            {"label": "White", 2025: "🔼 32.5%", 2024: "30.6%"},
            {"label": "Unknown", 2025: "14%", 2024: "4.5%"},
        ]

        return (
            <div {...props}>
                <table>
                    <tr>
                        <th>Race/ethnicity</th>
                        <th>co2024</th>
                        <th>co2025</th>
                    </tr>
                    {raceData.map((row, i) => (
                        <tr key={i}>
                            <td style={{display: "flex", alignItems: "center"}}>
                                <div style={{width: 12, height: 12, borderRadius: "50%", backgroundColor: categoryColors[row.label], marginRight: 6}}></div>
                                <span>{row.label}</span>
                            </td>
                            <td>{row[2024]}</td>
                            <td>{row[2025]}</td>
                        </tr>
                    ))}
                </table>
            </div>
        );
    }
}

module.exports = CustomComponent;
