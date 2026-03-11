import { initializeApp } from 'firebase/app'
import { getAnalytics, type Analytics } from 'firebase/analytics'
import { getAuth, type Auth } from 'firebase/auth'
import { getStorage, type FirebaseStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: 'AIzaSyBNN4re12asS_FXF2iCSWmz35pIMADkPhY',
  authDomain: 'vtm5e-charsheet.firebaseapp.com',
  projectId: 'vtm5e-charsheet',
  storageBucket: 'vtm5e-charsheet.appspot.com',
  messagingSenderId: '507385361268',
  appId: '1:507385361268:web:03002d700dd35f6f8b7221',
  measurementId: 'G-0P3ZC3B1RZ',
}

const app = initializeApp(firebaseConfig)
const auth: Auth = getAuth(app)
const analytics: Analytics = getAnalytics(app)
const storage: FirebaseStorage = getStorage(app)

export { auth, storage, analytics }
