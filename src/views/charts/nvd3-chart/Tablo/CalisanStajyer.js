import ReactEcharts from "echarts-for-react";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../../firebase/firebaseConfig";

const CalisanStajyer = () => {
  const [firmalar, setFirmas] = useState([]);
  const [stajyer, setStajyer] = useState([]);
  const [calisan, setCalisan] = useState([]);

  const firmalariGetir = async () => {
    try {
      await getDocs(collection(firestore, "firmas")).then((querySnapshot) => {
        const newData = querySnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
       

        newData.map((e) => {
          calisan.pu;
          setCalisan(...calisan, Number(e.calisankisi));
          setStajyer(...stajyer, Number(e.stajyer));
        });
    
        setFirmas(newData);
      });
    } catch (error) {
      console.error("Firma verileri alınırken bir hata oluştu:", error);
    }
  };

  useEffect(() => {
    firmalariGetir();
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
        data: Object.keys(firmalar).length,
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
        data: firmalar.map((e) => {
          return Number(e?.calisankisi);
        }),
      },
      {
        name: "Stajer",
        type: "bar",
        data: firmalar.map((e) => {
          return Number(e?.stajyer);
        }),
      },
    ],
  };

  return (
    <ReactEcharts option={options} style={{ width: "100%", height: "350px" }} />
  );
};

export default CalisanStajyer;
