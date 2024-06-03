import ReactEcharts from "echarts-for-react";
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { firestore } from "../../../../firebase/firebaseConfig";

const EklentiTablosu = () => {
  const [ogrenciler, setStudents] = useState([]);
  const [ogretmenler, setTeachers] = useState([]);
  const [firmalar, setFirmas] = useState([]);
  const [hamiler, setHamis] = useState([]);

  const ogrencileriGetir = async () => {
    await getDocs(collection(firestore, "students")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setStudents(newData);

    });
  };



  const ogretmenleriGetir = async () => {
    try {
      const response = await getDocs(collection(firestore, "teachers")).then(
        (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setTeachers(newData);
        }
      );
    } catch (error) {
      console.error("Öğretmen verileri alınırken bir hata oluştu:", error);
    }
  };

  const firmalariGetir = async () => {
    try {
      const response = await getDocs(collection(firestore, "firmas")).then(
        (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setFirmas(newData);
        }
      );
    } catch (error) {
      console.error("Firma verileri alınırken bir hata oluştu:", error);
    }
  };

  const hamileriGetir = async () => {
    try {
      const response = await getDocs(collection(firestore, "hamis")).then(
        (querySnapshot) => {
          const newData = querySnapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));
          setHamis(newData);
        }
      );
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

export default EklentiTablosu;
// data: [
//   Object.keys(ogrenciler).length,
//   Object.keys(ogretmenler).length,
//   Object.keys(firmalar).length,
//   Object.keys(hamiler).length,
// ],
