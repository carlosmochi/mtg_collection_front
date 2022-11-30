<template>
  <v-container>
    <v-row>
      <v-col col="12">
        <v-footer  >
          <v-col class="text-center" cols="12">
            {{ new Date().getFullYear() }} —
            Magic Collections
          </v-col>
        </v-footer>
      </v-col>
    </v-row>
  </v-container>

</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: 'Footer',
  data(){
    return{

    }
  }
}
</script>

<style scoped>
.v-footer {
  background-color:black;
  color: whitesmoke;
  align-items: center;
  justify-content: center;
  display: flex;
  bottom: 0;
  width: 100%;
}
</style>