<template>
  <v-container>
    <v-form>
      <v-col cols="12">

        <v-text-field
            v-model="this.cardName"
            :rules="[v => !!v || 'Item is required']"
            label="Search by Name"
            placeholder="eg. Elesh Norn"
            hint="Inform and press ENTER"
            required
            clearable
            @keydown.enter="getCards"
            append-inner-icon="mdi-magnify"
            @click:append-inner="getCards"
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
          Card
        </th>
        <th class="text-left">
          Actions
        </th>
        <th>
          <v-btn class="mr-4"
                 @click="$router.push('/card/newCard')"
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
          v-for="card in this.cards"
          :key="card.id"
      >
        <td>{{ card.name }}</td>
        <td>
          <router-link :to="'/card/' + card.id" class="btn btn-primary">
            <v-icon icon="mdi-square-edit-outline"/>
          </router-link>
          <v-icon icon="mdi-close-thick"
                  @click="deleteCard(card.id)"
          ></v-icon>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import CardService from "@/services/CardService";

export default {
  name: "CardList",
  data(){
    return {
      cards:[],
      cardName: ""
    }
  },
  methods:{
    getAll(){
      CardService.getAsList()
          .then(response => {
            this.cards = response.data;
            console.log(response.data);
          })
          .catch(e =>{
            console.log(e)
          });
    },
    getCards(){
      if(this.cardName == '')
        this.getAll()
      else {
        CardService.getByName(this.cardName)
            .then(response => {
              if (response.data == undefined)
                this.cards = null;
              else
                this.cards = response.data;
            })
            .catch(e => {
              console.log(e)
            });
      }
    },
    deleteCard(id){
      CardService.delete(id)
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