import {initializeApp, FirebaseOptions, getApp, getApps} from 'firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyDDnvBm5BVpClKbtN5rSMoAIXqx2DR7X50",
  authDomain: "codetyper.firebaseapp.com",
  projectId: "codetyper",
  storageBucket: "codetyper.appspot.com",
  messagingSenderId: "193304577883",
  appId: "1:193304577883:web:bda6782a66aa1756dbbc7e"
};

// Initialize Firebase
var app
if(getApps().length === 0){
    app = initializeApp(firebaseConfig)
}
else{
    app = getApp();
}

export default app