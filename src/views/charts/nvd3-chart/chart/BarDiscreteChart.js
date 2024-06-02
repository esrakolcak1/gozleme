import ReactEcharts from "echarts-for-react";
import React, { useEffect, useState } from "react";
import axios from "axios";

const BarDiscreteChart = () => {
  const [ogrenciler, setOgrenciler] = useState([]);
  const [ogretmenler, setOgretmenler] = useState([]);
  const [firmalar, setFirmalar] = useState([]);
  const [hamiler, setHamiler] = useState([]);

  const ogrencileriGetir = async () => {
    try {
      const response = await axios.get(
        "https://gozleme-cc975-default-rtdb.firebaseio.com/students.json"
      );
      setOgrenciler(response?.data || []);
    } catch (error) {
      console.error("Öğrenci verileri alınırken bir hata oluştu:", error);
    }
  };

  const ogretmenleriGetir = async () => {
    try {
      const response = await axios.get(
        "https://gozleme-cc975-default-rtdb.firebaseio.com/teachers.json"
      );
      setOgretmenler(response?.data || []);
    } catch (error) {
      console.error("Öğretmen verileri alınırken bir hata oluştu:", error);
    }
  };

  const firmalariGetir = async () => {
    try {
      const response = await axios.get(
        "https://gozleme-cc975-default-rtdb.firebaseio.com/firmas.json"
      );
      setFirmalar(response?.data || []);
    } catch (error) {
      console.error("Firma verileri alınırken bir hata oluştu:", error);
    }
  };

  const hamileriGetir = async () => {
    try {
      const response = await axios.get(
        "https://gozleme-cc975-default-rtdb.firebaseio.com/hamis.json"
      );
      setHamiler(response?.data || []);
    } catch (error) {
      console.error("Hami verileri alınırken bir hata oluştu:", error);
    }
  };

  useEffect(() => {
    ogrencileriGetir();
    ogretmenleriGetir();
    firmalariGetir();
    hamileriGetir();
  }, []);

  const option = {
    xAxis: {
      type: "category",
      data: ["Hami", "Ogretmen", "Ogrenci", "Firma"],
    },
    legend: {
      data: ["Hami", "Ogretmen", "Ogrenci", "Firma"],
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        data: [
          Object.keys(hamiler).length,
          Object.keys(ogretmenler).length,
          Object.keys(ogrenciler).length,
          Object.keys(firmalar).length,
        ],
        type: "bar",
      },
    ],
  };

  return (
    <ReactEcharts option={option} style={{ width: "100%", height: "400px" }} />
  );
};

export default BarDiscreteChart;
// data: [
//   Object.keys(ogrenciler).length,
//   Object.keys(ogretmenler).length,
//   Object.keys(firmalar).length,
//   Object.keys(hamiler).length,
// ],
