import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import moment from "moment";
// import 'firebase/compat/storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.AUTHDOMAIN,
  projectId: process.env.PROJECTID,
  storageBucket: process.env.STORAGEBUCKET,
  messagingSenderId: process.env.MESSAGINGSENDERID,
  appId: process.env.APPID,
  measurementId: process.env.MEASUREMENTID,
};

console.log("firebaseConfig: ", firebaseConfig);

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// export const auth = firebase.auth();
export const firestore = firebase.firestore();
// export const storage = firebase.storage();

export function postToJSON(doc) {
  const data = doc.data();

  var date = new Date(data.date.toMillis());
  var dateString = moment(date).format("MMMM Do");
  var timeString = moment(date, "YYYYMMDD").fromNow();
  var fullDateString = moment(date).format("MMMM Do YYYY, h:mm:ss a");

  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    date: dateString,
    time: timeString,
    fullDate: fullDateString,
  };
}
