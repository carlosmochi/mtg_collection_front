<template>
  <v-app>
    <NavBar/>
    <v-main>
      <router-view/>
    </v-main>

    <v-footer>
      <Footer/>
    </v-footer>
  </v-app>
</template>
<script>
  import NavBar from "@/components/NavBar";
  import Footer from "@/components/Footer";

  export default {
    name:'App',
    components:{
      NavBar,
      Footer
    }
  }
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

a {
  color: #797777;
  text-decoration: none;
  font-weight: bold;
  transition: .5s;
}

a.router-link-exact-active {
  color: #d90000;
}

</style>
