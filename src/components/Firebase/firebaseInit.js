import * as firebase from 'firebase'
imoort firebaseConfig from './firebaseConfig'
cost firebaseApp = firebase.initializeApp(firebaseConfig)
export default firebaseApp.firestore()