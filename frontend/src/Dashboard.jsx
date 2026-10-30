import "./styles/dashboard.css";
import HeaderProfil from "./components/HeaderProfil/HeaderProfil";
import SimpleBarChart from "./components/SimpleBar/SimpleBar";
import PieCharts from "./components/PieChart/PieChart";
import ComposedCharte from "./components/ComposedChart/ComposedChart";
import StatCard from "./components/StatCard/StatCard";

export default function Dashboard() {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(endDate.getDate() - 7);
  return (
    <>
      <main id="center">
        <HeaderProfil dist={true} />
        <section className="performance-container">
            <h2>Vos dernières performances</h2>
            <div className="graphique-container">
              <SimpleBarChart />
              <ComposedCharte />
            </div>
          </section>

          <section className="performance-container">
            <div>
              <h2>Cette semaine</h2>
              <p>Du {startDate.toLocaleDateString()} au {endDate.toLocaleDateString()}</p>
            </div>

            <div className="graphique-container">
              <PieCharts />
              <div className="bande-contain">
                <StatCard type="activity" id="blue"/>
                <StatCard type="distance" id="orange"/>
              </div>
            </div>
          </section>
      </main>
    </>
  );
}
