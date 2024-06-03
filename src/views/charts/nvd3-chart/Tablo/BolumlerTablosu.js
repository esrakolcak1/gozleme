import ReactEcharts from "echarts-for-react";
import React, { useEffect, useState } from "react";
// import axios from "axios"; // axios kütüphanesini import et
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../../firebase/firebaseConfig";
import * as _ from "lodash";

const BolumlerTablosu = () => {
  const [student, setStudents] = useState([]);

  const bolumGetir = async () => {
    await getDocs(collection(firestore, "students")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      const group = _.groupBy(newData, "bolum");
      const data = Object.keys(group).map((key) => {
        const item = group[key];
        return { name: key, value: item.length };
      });
      setStudents(data);
    });
  };

  useEffect(() => {
    bolumGetir();
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
        data: student,
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

export default BolumlerTablosu;
