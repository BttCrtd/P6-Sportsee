import { Pie, PieChart, Cell } from "recharts";
import "../../styles/pieChart.css";
import { useUser } from "../../hook/useUser";


const COLORS = ["#B6BDFC", "#0B23F4"];

export default function PieCharts() {
  const { userData, loading } = useUser();

  if (loading || !userData) {
    return <p>Chargement...</p>;
  }

  const rest = 6 - userData.profile.goal;


  const data = [
    { name: `${rest} restants`, value: rest },
    { name: `${userData.profile.goal} réalisées`, value: userData.profile.goal },
  ];

  return (
    <div className="pie-chart-container">
      <div className="header-container">
        <div className="title">
          <h3>
            <span>X{userData.profile.goal}</span> sur objectif de 6
          </h3>
        </div>
        <p>Courses hebdomadaire réalisées</p>
      </div>
      <div className="center">
        <PieChart
          style={{
            width: "80%",
            aspectRatio: 1,
          }}
          responsive
        >
          <Pie
            data={data}
            innerRadius="50%"
            outerRadius="80%"
            cornerRadius="10px"
            fill="#8884d8"
            paddingAngle={0}
            dataKey="value"
            label={({name}) => name }
            labelLine={false}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}{" "}
          </Pie>
        </PieChart>
      </div>
    </div>
  );
}
