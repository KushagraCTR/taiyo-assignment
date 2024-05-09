import React, { useEffect, useState } from "react";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import SideMenu from "../Components/SideMenu";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ChartData {
  cases: { [date: string]: number };
  deaths: { [date: string]: number };
  recovered: { [date: string]: number };
}

const CovidLineChart: React.FC = () => {
  const [showSideBar, setShowSideBar] = useState(true);
  const [chartDataCASES, setChartDataCASES] = useState<any>(null);
  const [chartDataDEATH, setChartDataDEATH] = useState<any>(null);
  const [chartDataRECOVERED, setChartDataRECOVERED] = useState<any>(null);

  const toggleSideBar = () => {
    setShowSideBar(!showSideBar);
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch(
          "https://disease.sh/v3/covid-19/historical/all?lastdays=all"
        );
        if (!response1.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: ChartData = await response1.json();

        const dates = Object.keys(data?.cases);
        const cases = Object.values(data?.cases);

        const datesDEATH = Object.keys(data?.deaths);
        const DEATHS = Object.values(data?.deaths);

        const dateRECOVERED = Object.keys(data?.recovered);
        const RECOVERED = Object.values(data?.recovered);

        setChartDataCASES({
          labels: dates,
          datasets: [
            {
              label: "Cases",
              data: cases,
              fill: false,
              borderColor: "rgba(75, 192, 192, 1)",
              tension: 0.1,
            },
          ],
        });

        setChartDataDEATH({
          labels: datesDEATH,
          datasets: [
            {
              label: "Deaths",
              data: DEATHS,
              fill: false,
              borderColor: "red",
              tension: 0.1,
            },
          ],
        });

        setChartDataRECOVERED({
          labels: dateRECOVERED,
          datasets: [
            {
              label: "Recovered",
              data: RECOVERED,
              fill: false,
              borderColor: "blue",
              tension: 0.1,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <SideMenu showSideBar={showSideBar} toggleSideBar={toggleSideBar} />

      <h2
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          fontSize: "28px",
        }}
      >
        COVID-19 Cases Over Time
      </h2>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "30px",
        }}
      >
        {chartDataCASES && (
          <div
            style={{
              height: "700px",
              width: "1500px",
              display: "flex",
              justifyContent: "center",
              marginTop: "15px",
            }}
          >
            <Line data={chartDataCASES} />
          </div>
        )}
        {chartDataDEATH && (
          <div
            // className="h-700 min-w-full w-1500 flex justify-center mt-30"
            style={{
              height: "700px",
              width: "1500px",
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Line data={chartDataDEATH} />
          </div>
        )}

        {chartDataRECOVERED && (
          <div
            style={{
              height: "700px",
              width: "1500px",
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
            }}
          >
            <Line data={chartDataRECOVERED} />
          </div>
        )}
      </div>
    </div>
  );
};

export default CovidLineChart;
