import { useState } from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
} from "recharts";
import "../../styles/composedChart.css";
import { usePerformance } from "../../hook/usePerformance";
import getLast7Days from "../../utils/get7DayPerformance";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";


export default function ComposedCharte() {
  const { performanceData, loading } = usePerformance();

  const [periodOffset, setPeriodOffset] = useState(0);

  if (loading || !performanceData) {
    return <p>Chargement...</p>;
  }

 
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const endDate = new Date();

  endDate.setDate(
    endDate.getDate() - periodOffset * 7
  );

  const chartPerformance = getLast7Days(
    performanceData,
    endDate
  );

  // Jour de la semaine
  const dayOfWeek = endDate.getDay();

  // Nombre de jours depuis lundi
  const daysSinceMonday =
    dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  // Lundi de la semaine affichée
  const monday = new Date(endDate);
  monday.setDate(endDate.getDate() - daysSinceMonday);

  // Les 7 jours de la semaine
  const weekDates = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);

    return date;
  });

  
  const days = [
    "Dim",
    "Lun",
    "Mar",
    "Mer",
    "Jeu",
    "Ven",
    "Sam",
  ];

  const chartData = weekDates.map((date) => {
    const formattedDate = date.toISOString().split("T")[0];

    const session = chartPerformance.find(
      (session) => session.date === formattedDate
    );

    return {
      date: formattedDate,
      day: days[date.getDay()],
      Moyen: session?.heartRate.average ?? null,
      Min: session?.heartRate.min ?? null,
      Max: session?.heartRate.max ?? null,
    };
  });

  let endDateString = endDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });

  let startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 6);

  let startDateString = startDate.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "short",
  });

  return (
    <div className="composed-chart-container">
      <div className="composed-header-container">
        <div className="title-container">
          <div className="title">
            <h3>112BPM</h3>
          </div>
          <div className="period-buttons">
            <button
              onClick={() => setPeriodOffset(periodOffset + 1)}
              aria-label="Semaine précédente"
            >
              <FaChevronLeft />
            </button>
            <p>{startDateString} - {endDateString}</p>
            <button
              onClick={() => setPeriodOffset(periodOffset - 1)}
              disabled={periodOffset === 0}
              aria-label="Semaine suivante"
            >
              <FaChevronRight />
            </button>

          </div>
        </div>
        <p>Fréquence cardiaque moyenne</p>

        

      </div>

      <ComposedChart
        style={{
          width: "100%",
          aspectRatio: 1.227 / 1,
        }}
        responsive
        data={chartData}
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
          dataKey="day"
          tickMargin={25}
          tickLine={false}
        />

        <YAxis
          width={40}
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

        <Bar
          dataKey="Min"
          name="Min BPM"
          fill="#FCC1B6"
          radius={[30, 30, 30, 30]}
          barSize={14}
        />

        v<Line
          type="monotone"
          dataKey="Moyen"
          name="Max BPM"
          stroke="#0B23F4"
          strokeWidth={2}
          dot={{
            fill: "#0B23F4",
            r: 4,
          }}
        />

        <Bar
          dataKey="Max"
          name="Max BPM"
          fill="#F4320B"
          radius={[30, 30, 30, 30]}
          barSize={14}
        />


        <Legend
          layout="horizontal"
          iconType="circle"
          align="left"
        />

      </ComposedChart>

    </div>
  );
}