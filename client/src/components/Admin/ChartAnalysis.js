import React, { useState, Fragment } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const ChartAnalysis = () => {
  const [showDays, setShowDays] = useState(true);
  const [showMonths, setShowMonths] = useState(false);

  const toggleData = () => {
    if (showDays) {
      setShowDays(false);
      return setShowMonths(true);
    } else {
      setShowMonths(false);
      return setShowDays(true);
    }
  };
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const data = {
    // x-axis label values
    labels: showDays ? days : months,
    datasets: [
      {
        label: "# of Calories Lost",
        // y-axis data plotting values
        data: [200, 300, 1300, 520, 2000, 350, 150],
        fill: false,
        borderWidth: 4,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "green",
        responsive: true,
      },
      {
        label: "# of Protein Lost",
        // y-axis data plotting values
        data: [400, 200, 1000, 720, 3000, 250, 350],
        fill: false,
        borderWidth: 4,
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "pink",
        responsive: true,
      },
    ],
  };

  const chartNav = (
    <div className={`mt-5`}>
      <div style={{ width: "400px" }}>
        <ul class="nav nav-pills nav-justified">
          <li class="nav-item" style={{ textAlign: "left" }}>
            <a
              className={`nav-link`}
              aria-current="page"
              href="#"
              onClick={toggleData}
            >
              Daily
            </a>
          </li>
          <li class="nav-item" style={{ textAlign: "left" }}>
            <a
              className={`nav-link`}
              aria-current="page"
              href="#"
              onClick={toggleData}
            >
              Monthly
            </a>
          </li>

          {/* <li class="nav-item" style={{ textAlign: "left" }}>
            <a className={`nav-link`} href="/write-article">
              Monthly
            </a>
          </li> */}
        </ul>
      </div>
    </div>
  );

  return (
    <Fragment>
      <Line data={data} />
      {chartNav}
    </Fragment>
  );
};

export default ChartAnalysis;
