import ReactEcharts from "echarts-for-react";
import React, { useEffect, useState } from "react";
import axios from "axios"; // axios kütüphanesini import et

const PieBasicChart = () => {
  const [bolumler, setBolumler] = useState([]);
  const [chartData, setChartData] = useState([]);

  const bolumleriGetir = async () => {
    await axios
      .get("https://gozleme-cc975-default-rtdb.firebaseio.com/students.json")
      .then((response) => {
        const bolumlers = [];

        // Her bir bölümün adını anahtar, öğrenci sayısını değer olarak içeren bir nesne oluşturmak için boş bir nesne
        const bolumlerObj = {};

        // Her bir öğrencinin bölüm bilgisini kontrol ederek sayaçları artırın
        for (const key in response?.data) {
          const bolum = response?.data[key].bolum;
          if (!bolumlerObj[bolum]) {
            bolumlers.push(bolum);
            bolumlerObj[bolum] = 1;
          } else {
            bolumlerObj[bolum]++;
          }
        }

        const bolumData = bolumlers?.map((bolum) => ({
          name: bolum,
          value: bolumlerObj[bolum],
        }));

        // Her bir bölümü label: bolum adı, value: bolum sayısı şeklinde içeren bir nesne dizisi oluşturun

        setChartData(bolumData);
      });
  };

  const bolumSayisi = () => {
    // Bölüm verilerini saklamak için bir dizi
  };

  useEffect(() => {
    // Bileşen yüklendiğinde bölüm verilerini almak için useEffect kullanın
    bolumleriGetir();
  }, []);

  const options = {
    tooltip: {
      trigger: "item",
    },
    legend: {
      top: "5%",
      left: "center",
    },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: "#fff",
          borderWidth: 2,
        },
        label: {
          show: false,
          position: "center",
        },
        emphasis: {
          label: {
            show: true,
            fontSize: 40,
            fontWeight: "bold",
          },
        },
        labelLine: {
          show: false,
        },
        data: chartData,
      },
    ],
  };

  return (
    <ReactEcharts
      option={options}
      style={{ width: "600px", height: "400px" }}
    ></ReactEcharts>
  );
};

export default PieBasicChart;
