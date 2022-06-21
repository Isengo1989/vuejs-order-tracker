import firebase from "firebase";

const db = firebase.database().ref("/orders");

class DataService {
  getAll() {
    return db;
  }
  deleteAll() {
    return db.remove();
  }
}

export default new DataService();
