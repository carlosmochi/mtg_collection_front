<template>
  <v-container>
    <div v-if="currentUser" class="edit-form">
      <h4>
        <v-icon icon="mdi-controller"/>
        Game
      </h4>


      <p>{{ message }}</p>
      <v-form>

        <v-col
            cols="12"
        >
          <v-text-field
              v-model="currentUser.fullName"
              :rules="[v => !!v || 'Item is required']"
              label="Name"
              required
              clearable
          ></v-text-field>
        </v-col>
        <v-col
            cols="12"
        >
          <v-text-field
              v-model="currentUser.email"
              :rules="[v => !!v || 'Item is required']"
              label="Email"
              required
              clearable
          ></v-text-field>
        </v-col>

        <v-btn
            class="ma-2"
            color="orange-darken-2"
            @click="$router.go(-1)"
        >
          <v-icon
              start
              icon="mdi-arrow-left"
          ></v-icon>
          Back
        </v-btn>

        <v-btn
            color="success"
            class="mr-4"
            @click="submitForm"
        >
          Update
        </v-btn>


      </v-form>

    </div>

  </v-container>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  name: "UserDetails",
  data(){
    return {
      currentUser: null,
      message: '',
    };
  },

  methods: {
    submitForm() {
      this.update();
    },
    getUser(id) {
      UserService.get(id)
          .then(response => {
            this.currentUser = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
    },
    update() {
      UserService.update(this.currentUser.id, this.currentUser)
          .then(response => {
            this.message = 'The Game was updated successfully!';
            console.log(response.data);
          })
          .catch(e => {
            console.log(e.response.data);
            this.message = e.response.data.message;
          });
    }
  },

  mounted() {
    this.message = '';
    this.getUser(this.$route.params.id);

  },


};
</script>

<style scoped>

</style>