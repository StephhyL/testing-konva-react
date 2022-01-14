import { Chart, Dataset } from "react-rainbow-components";

const containerStyles = {
  maxWidth: 600,
};
const labels = ["Data-Red", "Data-Orange", "Data-Yellow", "Data-Green"];
const dataset = [
  {
    value: 10,
    color: "#fe4849",
  },
  {
    value: 15,
    color: "#ff6837",
  },
  {
    value: 42,
    color: "#ffcc00",
  },
  {
    value: 33,
    color: "#1ad1a3",
  },
];
function renderDataset() {
  const data = [];
  const colors = [];
  dataset.forEach((set) => {
    data.push(set.value);
    colors.push(set.color);
  });

  return <Dataset title="Data" values={data} backgroundColor={colors} />;
}

const PieChart = () => (
  <div className="rainbow-p-vertical_xx-large rainbow-p-horizontal_medium">
    <div
      style={containerStyles}
      className="rainbow-align-content_center rainbow-m-vertical_large rainbow-m_auto"
    >
      <Chart labels={labels} type="pie" legendPosition="right">
        {renderDataset()}
      </Chart>
    </div>
  </div>
);

export default PieChart;
