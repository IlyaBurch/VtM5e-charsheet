<template>
    <button @click="login">Login with Google</button>
  </template>
  
  <script setup>
    import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
    import { auth } from "@/components/firebase/firebase.js";
  
    async function login() {
        const provider = new GoogleAuthProvider();
        try {
          await signInWithPopup(auth, provider);
        } catch (error) {
          console.error(error);
        }
      }
  </script>
  