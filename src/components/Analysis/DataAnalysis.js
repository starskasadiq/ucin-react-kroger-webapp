import React from "react";
import { Chart as ChartJS } from "chart.js/auto";
import { Chart, Bar, Line, Pie, Doughnut } from "react-chartjs-2";
import { useState, useEffect } from "react";
import classes from "../Analysis/DataAnalysis.module.css";

const DataAnalysis = () => {
  const [ageRequestMade, setageRequestMade] = useState(false);
  const [isAgeDataExists, setAgeDataExists] = useState(false);
  const [ageDataExtract, setAgeDataExtract] = useState(null);

  const [incomeRequestMade, setIncomeRequestMade] = useState(false);
  const [isIncomeDataExists, setIncomeDataExists] = useState(false);
  const [incomeDataExtract, setIncomeDataExtract] = useState(null);

  const [yearRequestMade, setYearRequestMade] = useState(false);
  const [isYearSpendExists, setYearSpendExists] = useState(false);
  const [yearSpendExtract, setYearSpendExtract] = useState(null);

  const [growCommReqMade, setGrowCommReqMade] = useState(false);
  const [isGrowingCommExists, setGrowingCommExists] = useState(false);
  const [growingCommExtarct, setGrowingCommExtract] = useState(null);

  useEffect(() => {
    const identifier = setTimeout(() => {
      if (!isAgeDataExists) {
        if (!ageRequestMade) {
          setageRequestMade(true);
          fetch("http://localhost:8080/api/v1/analysis/age-spend", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              // console.log(data);
              setAgeDataExtract(setAgeData(data));
              setAgeDataExists(true);
              // console.log(ageDataExtract);
            });
        }
      }

      if (!isIncomeDataExists) {
        if (!incomeRequestMade) {
          setIncomeRequestMade(true);
          fetch("http://localhost:8080/api/v1/analysis/income-spend", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setIncomeDataExtract(setIncomeData(data));
              setIncomeDataExists(true);
            });
        }
      }

      if (!isYearSpendExists) {
        if (!yearRequestMade) {
          setYearRequestMade(true);
          fetch("http://localhost:8080/api/v1/analysis/year-spend", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              setYearSpendExtract(setYearSpendData(data));
              setYearSpendExists(true);
            });
        }
      }

      if (!isGrowingCommExists) {
        if (!growCommReqMade) {
          setGrowCommReqMade(true);
          fetch("http://localhost:8080/api/v1/analysis/grow-comm-spend", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((data) => {
              console.log(data);
              setGrowingCommExtract(setGrowingData(data));
              setGrowingCommExists(true);
            });
        }
      }
    }, 500);
    return () => {
      clearTimeout(identifier);
    };
  }, [
    isAgeDataExists,
    isIncomeDataExists,
    isYearSpendExists,
    isGrowingCommExists,
  ]);

  const setAgeData = (data) => {
    let ageRange = [];
    ageRange = data.map((each) => {
      return each.ageRange;
    });

    let spend = [];
    spend = data.map((each) => {
      return each.spend;
    });

    const state = {
      labels: ageRange,
      datasets: [
        {
          fill: false,
          tension: 0.1,
          label: "Expenses per AGE_RANGE",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: spend,
        },
      ],
    };
    return state;
  };

  const setIncomeData = (data) => {
    let incomeGroup = [];
    incomeGroup = data.map((each) => {
      return each.incomeRange;
    });

    let spend = [];
    spend = data.map((each) => {
      return each.spend;
    });

    const state = {
      labels: incomeGroup,
      datasets: [
        {
          label: "Expenses per Income Range",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: spend,
        },
      ],
    };
    return state;
  };

  const setYearSpendData = (data) => {
    let yearGroup = [];
    yearGroup = data.map((each) => {
      return each.year;
    });

    let spend = [];
    spend = data.map((each) => {
      return each.spend;
    });

    const state = {
      labels: yearGroup,
      datasets: [
        {
          label: "Expenses per Year Range",
          backgroundColor: [
            "#B21F00",
            "#C9DE00",
            "#2FDE00",
            "#00A6B4",
            "#6800B4",
          ],
          hoverBackgroundColor: [
            "#501800",
            "#4B5000",
            "#175000",
            "#003350",
            "#35014F",
          ],
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: spend,
        },
      ],
    };
    return state;
  };

  const setGrowingData = (data) => {
    const getRadarData = (data) => {
      return Object.entries(data).map((key, val) => {
        return {
          label: key[0],
          data: key[1],
          fill: true,
          backgroundColor: "rgba(75,192,192,0.2)",
          borderColor: "#000000",
          borderWidth: 2,
        };
      });
    };

    const state = {
      labels: [2018, 2019, 2020],
      datasets: getRadarData(data),
    };
    return state;
  };

  return (
    <div>
      {!isGrowingCommExists || !isYearSpendExists || (
        <div className={classes.rowC}>
          <p>
            Charts showing average spending’s of customers over years. Charts
            showing growing and shrinking commodities over years.
          </p>
        </div>
      )}
      <div className={classes.rowC}>
        {isGrowingCommExists && (
          <section className={classes.databox1}>
            <Line
              data={growingCommExtarct}
              options={{
                title: {
                  display: true,
                  text: "Average Expenses per Commodity",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </section>
        )}

        {isYearSpendExists && (
          <section className={classes.piedoughnut}>
            <Pie
              data={yearSpendExtract}
              options={{
                title: {
                  display: true,
                  text: "Average Expenses per Income",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </section>
        )}

        {isIncomeDataExists && (
          <section className={classes.piedoughnut}>
            <Doughnut
              data={incomeDataExtract}
              options={{
                title: {
                  display: true,
                  text: "Average Expenses per Income",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </section>
        )}
      </div>

      <div className={classes.rowC}>
      {!isAgeDataExists || !isIncomeDataExists || (
        <div className={classes.rowC}>
          <p>
          Charts showing demographic factors – Income and Age group affecting expenditure of customers.
          </p>
        </div>
      )}
      </div>
      <div className={classes.rowC}>
        {isAgeDataExists && (
          <section className={classes.databox}>
            <Bar
              data={ageDataExtract}
              options={{
                title: {
                  display: true,
                  text: "Average Expenses per Age",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </section>
        )}
        {isIncomeDataExists && (
          <section className={classes.databox}>
            <Line
              data={incomeDataExtract}
              options={{
                title: {
                  display: true,
                  text: "Average Expenses per Income",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </section>
        )}
      </div>
    </div>
  );
};

export default DataAnalysis;
