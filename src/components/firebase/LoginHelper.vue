<template>
  <button @click="login">Login with Google</button>
</template>

<script setup lang="ts">
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { auth } from '@/components/firebase/firebase'

async function login(): Promise<void> {
  const provider = new GoogleAuthProvider()
  try {
    await signInWithPopup(auth, provider)
  } catch (error) {
    console.error(error)
  }
}
</script>
