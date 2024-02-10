
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";
import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import {
  getAuth,
  signOut
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
  getFirestore,
  getDocs,
  doc,
  collection,
  addDoc,
  deleteDoc,
  getDoc,
  query,
  where
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";



const firebaseConfig = {
  apiKey: "AIzaSyB9nplk1w_Us4tXTSUsrkFnHObxxsVUSL8",
  authDomain: "olx-clone-d6899.firebaseapp.com",
  projectId: "olx-clone-d6899",
  storageBucket: "olx-clone-d6899.appspot.com",
  messagingSenderId: "207249975973",
  appId: "1:207249975973:web:10dbe97715c5ce3ee7fb4c",
  measurementId: "G-PJWE3MSH6S"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);



const storage = getStorage(app);



async function postAdToDb(ad) {
  /*
  1. Upload image to Storage
  2. Get the URL of the image
  3. Add all data with URL in database
  */


  try {
      const storageRef = ref(storage, `ads/${ad.image.name}`);

      await uploadBytes(storageRef, ad.image)

      const url = await getDownloadURL(storageRef)

      ad.image = url
      

      await addDoc(collection(db, "ads"), ad)
      alert('Data added successfully!')
  } catch (e) {
      alert(e.message)
  }
}

async function getAds() {
  const querySnapshot = await getDocs(collection(db, "ads"))
  const ads = []
  querySnapshot.forEach((doc) => {
      // console.log(doc.id, " => ", doc.data());
      // const ad = { id: doc.id, ...doc.data() }

      const ad = doc.data()
      ad.id = doc.id

      ads.push(ad)
  });

  return ads
}

async function getSingleAd(adId) {
  const docRef = doc(db, "ads", adId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
      const ad = docSnap.data()

      return ad
  } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
  }
}

async function getUser(uid) {
  console.log('uid', uid)
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
      const user = docSnap.data()

      return user
  } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
  }
}


async function searchInAds(inputValue) {
  const adsRef = collection(db, "ads")
  const querySnapshot = await getDocs(query(adsRef, where("title", "==", inputValue)))
  const ads = []
  querySnapshot.forEach((doc) => {
      const ad = doc.data()
      ad.id = doc.id

      ads.push(ad)
  });

  return ads
}


function logout() {
  return signOut(auth)
}

export {
  searchInAds,
  postAdToDb,
  getAds,
  getSingleAd,
  getUser,
  logout
}