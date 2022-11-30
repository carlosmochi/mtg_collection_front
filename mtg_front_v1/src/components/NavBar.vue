<template>
  <v-app-bar app color="black" dark>

    <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
    <v-toolbar-title>Magic Collections</v-toolbar-title>

    <v-spacer></v-spacer>

    <router-link to="/">
      <v-btn icon="mdi-home"/>
    </router-link>
<!--    <router-link to="/games">-->
<!--      <v-btn icon="mdi-magnify"/>-->
<!--    </router-link>-->
    <router-link to="/user">
      <v-btn icon="mdi-account"/>
    </router-link>
    <router-link to="/about">
      <v-btn icon="mdi-dots-vertical"/>
    </router-link>

  </v-app-bar>

  <v-navigation-drawer
      v-model="drawer"
      temporary
  >
    <v-list density="compact" nav>
      <router-link to="/">
        <v-list-item prepend-icon="mdi-view-dashboard" title="Home" value="home"></v-list-item>
      </router-link>
      <router-link to="/user">
        <v-list-item prepend-icon="mdi-account" title="Find users" value="user"></v-list-item>
      </router-link>
      <router-link to="/card">
        <v-list-item prepend-icon="mdi-cards" title="Cards" value="card"></v-list-item>
      </router-link>
      <router-link to="/deck">
        <v-list-item prepend-icon="mdi-cards-variant" title="Decks" value="deck"></v-list-item>
      </router-link>
      <router-link to="/about">
        <v-list-item prepend-icon="mdi-forum" title="About" value="about"></v-list-item>
      </router-link>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  name: 'NavBar',
  data(){
    return{
      drawer: false
    }
  }
}
</script>
<style scoped>

</style>