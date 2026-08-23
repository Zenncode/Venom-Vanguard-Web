import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported, Analytics } from "firebase/analytics";

// Web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBZA49sMhOc5iAUB1jJS0epSn-PFxjSNo8",
  authDomain: "venom-vanguard.firebaseapp.com",
  projectId: "venom-vanguard",
  storageBucket: "venom-vanguard.firebasestorage.app",
  messagingSenderId: "346516756267",
  appId: "1:346516756267:web:ffbc2921c4f00fc46cd76e",
  measurementId: "G-9GE59J95YF"
};

// Initialize Firebase (avoid re-initialization in SSR / Hot Reload)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

let analytics: Analytics | null = null;

// Initialize Analytics only in client-side environment
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

export { app, analytics, firebaseConfig };
