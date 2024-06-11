<template>
  <section class="footer">
    <img src="@/assets/darkpack_logo1.png" class="dp-logo"/>
    <p class="text">Portions of the materials are the copyrights and trademarks of Paradox Interactive AB, and are used with permission. All rights reserved. For more information please visit <a href="https://worldofdarkness.com">worldofdarkness.com</a>.</p>
  </section>
</template>

<script setup>

</script>

<style lang="scss" scoped>
.footer{
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    background-color: rgb(0, 0, 0);
    color: white;
    font-size: 10px;
    height: 75px;
}

.dp-logo{
    width: 50px;
    margin-bottom: 10px;
    padding-left: 1rem;  
}

.text{
  padding-left: 2rem;
}
</style>