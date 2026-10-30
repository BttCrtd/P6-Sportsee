import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import "../../styles/simpleBar.css";
import { usePerformance } from "../../hook/usePerformance";
import getLast30Days from "../../utils/get30DayPerformance";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function SimpleBarChart() {
  const { performanceData, loading } = usePerformance();

  //Navigation entre les périodes
  const [periodOffset, setPeriodOffset] = useState(0);

  if (loading || !performanceData) {
    return <p>Chargement...</p>;
  }

  const endDate = new Date();

  endDate.setDate(endDate.getDate() - periodOffset * 30);

  // Récupération des performances de la période
  const chartData = getLast30Days(performanceData, endDate, 30);

  // Tableau des 4 semaines
  const weeklyDistances = [0, 0, 0, 0];

  const today = endDate;

  // Calcul des kilomètres par semaine
  chartData.forEach((session) => {
    const sessionDate = new Date(session.date);

    const diffDays = Math.floor(
      (today - sessionDate) / (1000 * 60 * 60 * 24)
    );

    const weekIndex = Math.floor(diffDays / 7);

    if (weekIndex >= 0 && weekIndex < 4) {
      weeklyDistances[3 - weekIndex] += session.distance;
    }
  });

  // Données 
  const simpleBarChartData = [
    { name: "S1", km: weeklyDistances[0] },
    { name: "S2", km: weeklyDistances[1] },
    { name: "S3", km: weeklyDistances[2] },
    { name: "S4", km: weeklyDistances[3] },
  ];

  // Moyenne sur les 4 semaines
  const moyen = Math.round(
    simpleBarChartData.reduce((sum, week) => sum + week.km, 0) /
      simpleBarChartData.length
  );

 let endDateString = endDate.toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "short",
});

let startDate = new Date(endDate);
startDate.setDate(startDate.getDate() - 30);
let startDateString = startDate.toLocaleDateString("fr-FR", {
  day: "numeric",
  month: "short",
});

  return (
    <div className="simple-bar-container">

      <div className="simpleBar-header-container">
        <div className="title-container">
          <div className="title">
            <h3>{moyen}km en moyenne</h3>
          </div>
          <div className="period-buttons">
            <button
              onClick={() => setPeriodOffset(periodOffset + 1)}
            >
              <FaChevronLeft />
            </button>
            <p>{startDateString} - {endDateString}</p>
            <button
              onClick={() => setPeriodOffset(periodOffset - 1)}
              disabled={periodOffset === 0}
            >
              <FaChevronRight />
            </button>
          </div>
        </div>

        <p>Total des kilomètres 4 dernières semaines</p>
        
        
      </div>


      <BarChart
        style={{
          width: "100%",
          aspectRatio: 1.075 / 1,
        }}
        responsive
        data={simpleBarChartData}
        margin={{
          top: 5,
          right: 0,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid
          strokeDasharray="3 3"
          vertical={false}
        />

        <XAxis
          dataKey="name"
          tickMargin={25}
          tickLine={false}
        />

        <YAxis
          dataKey="km"
          width="auto"
          tickCount={4}
        />

        <Tooltip
          cursor={{
            fill: "transparent",
          }}
          contentStyle={{
            backgroundColor: "#000000",
            color: "#E7E7E7",
            borderRadius: "10px",
            padding: "23px 13px",
            display: "flex",
            flexDirection: "column",
            gap: "2px",
          }}
        />

        <Legend
          layout="horizontal"
          align="left"
          verticalAlign="bottom"
          iconType="circle"
  />

        <Bar
          dataKey="km"
          name="Km"
          fill="#B6BDFC"
          activeBar={{
            fill: "#0B23F4",
            stroke: "#0B23F4",
          }}
          radius={[30, 30, 30, 30]}
          barSize={14}
        />

      </BarChart>

    </div>
  );
}