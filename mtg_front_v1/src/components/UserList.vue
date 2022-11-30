<template>
  <v-container>
    <v-form>
      <v-col cols="12">

        <v-text-field
            v-model="this.userName"
            :rules="[v => !!v || 'Item is required']"
            label="Search by Name"
            placeholder="eg. GTA"
            hint="Inform and press ENTER"
            required
            clearable
            @keydown.enter="getUser"
            append-inner-icon="mdi-magnify"
            @click:append-inner="getUser"
        ></v-text-field>
      </v-col>
    </v-form>


    <v-table
        density="compact"
        fixed-header
        height="400px"
    >
      <thead>
      <tr>
        <th class="text-left">
          User
        </th>
        <th class="text-left">
          Action
        </th>
        <th>
          <v-btn class="mr-4"
                 @click="$router.push('/user/newUser')"
                 color="green"
          >
            <v-icon
                start
                icon="mdi-plus"
            ></v-icon>
            Add
          </v-btn>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr class="text-left"
          v-for="user in this.users"
          :key="user.id"
      >
        <td>{{ user.fullName }}</td>
        <td>
          <router-link :to="'/user/' + user.id" class="btn btn-primary">
            <v-icon icon="mdi-square-edit-outline"/>
          </router-link>
          <v-icon icon="mdi-close-thick"
          @click="deleteUser(user.id)"
          ></v-icon>
        </td>

      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import UserService from "@/services/UserService";

export default {
  name: "UserList",
  data(){
    return {
      users:[],
      userName: ""
    }
  },
  methods:{
    getAll(){
      UserService.getAll()
          .then(response => {
            this.users = response.data._embedded.users;
            console.log(response.data);
          })
          .catch(e =>{
            console.log(e)
          });
    },
    getUser(){
      if(this.userName == '')
        this.getAll()
      else {
        UserService.getByName(this.userName)
            .then(response => {
              if (response.data._embedded == undefined)
                this.users = null;
              else
                this.users = response.data._embedded.users;
            })
            .catch(e => {
              console.log(e)
            });
      }
    },
    deleteUser(id){
      UserService.delete(id)
          .then(response =>{
            alert(response.data)
          })
          .catch(e => {
            console.log(e)
          })
    }
  },
  mounted() {
    this.getAll()
  }
}
</script>

<style scoped>

</style>