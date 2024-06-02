import ReactEcharts from "echarts-for-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const MultiBarChart = () => {
  const [chartData, setChartData] = useState({
    kisiler: [],
    stajyerData: [],
    calisanData: [],
  });

  const kisileriGetir = async () => {
    try {
      const response = await axios.get(
        "https://gozleme-cc975-default-rtdb.firebaseio.com/firmas.json"
      );
      const data = response.data;

      setChartData(data);

      console.log(data);
    } catch (error) {
      console.error("Veri alınırken bir hata oluştu:", error);
    }
  };

  console.log("chartData", chartData);

  useEffect(() => {
    kisileriGetir();
  }, []);

  const options = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    legend: {
      data: ["Sirket Calisani", "Stajer"],
    },
    xAxis: [
      {
        type: "category",
        data: Object.values(chartData).map((item) => item?.firma),
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Sirket Calisani",
        min: 0,
        axisLabel: {
          formatter: "{value} kisi",
        },
      },
      {
        type: "value",
        name: "Stajer",
        min: 0,
        axisLabel: {
          formatter: "{value} kisi",
        },
      },
    ],
    series: [
      {
        name: "Sirket Calisani",
        type: "bar",
        data: Object.values(chartData).map((item) => item?.calisankisi),
      },
      {
        name: "Stajer",
        type: "bar",
        data: Object.values(chartData).map((item) => item?.stajyer),
      },
    ],
  };

  console.log(
    "qweqw",
    Object.keys(chartData)?.map((key, index) => key)
  );

  return (
    <ReactEcharts option={options} style={{ width: "100%", height: "350px" }} />
  );
};

export default MultiBarChart;
