import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  //   createUserWithEmailAndPassword,
  //   updateCurrentUser,
} from "firebase/auth";
// import SignUp1 from "../views/auth/signup/SignUp1";
// import Signin1 from "../views/auth/signin/SignIn1";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyAz0h7Ea_UL3sFZH80SBMenETSYP0awM8A",
  authDomain: "gozleme-cc975.firebaseapp.com",
  databaseURL: "https://gozleme-cc975-default-rtdb.firebaseio.com",

  projectId: "gozleme-cc975",
  storageBucket: "gozleme-cc975.appspot.com",
  messagingSenderId: "565702657746",
  appId: "1:565702657746:web:0280dd69c9f81af0378f0b",
  measurementId: "G-DQLHY5ED02",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);
const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getDatabase(app);
// export const SignUp1 = async (kullaniciadi, email, password) => {
//   await createUserWithEmailAndPassword(auth, email, password);
//   await updateCurrentUser(auth, { displayName: kullaniciadi });
// };

// export const Signin1 = (email, password) => {};
export { auth };
const teacherData = {
  teacher1: {
    mail: "mail@mail.com",
    sifre: "sifre",
  },
};

const studentData = {
  student1: {
    nameLastname: "isim soyisim",
    donem: "donem1",
  },
};
const firmaData = {
  firma1: {
    firmaadi: "",
  },
};

// Veri ekleme fonksiyonu
async function addData() {
  try {
    await database.ref("Teacher").set(teacherData);
    await database.ref("Student").set(studentData);
    console.log("Veriler başarıyla eklendi.");
  } catch (error) {
    console.error("Veri ekleme hatası: ", error);
  }
}

addData();
