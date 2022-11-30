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
          Create
        </v-btn>


      </v-form>

    </div>

  </v-container>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  name: "NewUser",
  data(){
    return {
      currentUser: {
        fullName:'',
        email:''
      },
      message: '',
    };
  },

  methods: {
    submitForm() {
      this.save();
    },
    save() {
      UserService.create(this.currentUser)
          .then(response => {
            this.message = 'The user has been created!';
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
  },


};
</script>

<style scoped>

</style>