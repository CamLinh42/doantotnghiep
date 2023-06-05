// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBpanVDlbr-hn2sYICdIEDttMyXsoZKsKE",
  authDomain: "phongkham-ba0e2.firebaseapp.com",
  projectId: "phongkham-ba0e2",
  storageBucket: "phongkham-ba0e2.appspot.com",
  messagingSenderId: "750225861522",
  appId: "1:750225861522:web:f14654cbaa5fc3d5922f4b",
  measurementId: "G-D1FQ80FEF0",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const uploadFile = async (base64String) => {
  try {
    // Tạo một canvas để vẽ ảnh
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    const img = new Image();
    img.src = base64String;
    await img.decode(); // Chờ cho ảnh tải xong
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0);

    // Tải lên tệp tin ảnh lên Firebase Storage
    const storage = getStorage();
    const storageRef = ref(storage, `images/${Date.now()}.png`);
    const blob = await new Promise((resolve) =>
      canvas.toBlob(resolve, "image/png")
    );
    await uploadBytes(storageRef, blob);
    console.log("Tải lên thành công!");

    // Lấy URL của tệp tin ảnh
    const url = await getDownloadURL(storageRef);
    return url;
  } catch (error) {
    console.log("Lỗi khi tải lên tệp tin ảnh:", error);
  }
};
export { app, db, uploadFile };
