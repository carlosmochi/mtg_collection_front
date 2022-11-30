<template>
  <v-container>
    <v-form>
      <v-col cols="12">

        <v-text-field
            v-model="name"
            :rules="[v => !!v || 'Item is required']"
            label="Search by Name"
            placeholder="eg. Elesh"
            hint="Inform and press ENTER"
            required
            clearable
            @keydown.enter="getDecks"
            append-inner-icon="mdi-magnify"
            @click:append-inner="getDecks"
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
          Deck
        </th>
        <th class="text-left">
          Actions
        </th>
        <th>
          <v-btn class="mr-4"
                 @click="$router.push('/deck/newDeck')"
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
          v-for="deck in this.decks"
          :key="deck.id"
      >
        <td>{{ deck.name }}</td>
        <td>
          <router-link :to="'/deck/' + deck.id" class="btn btn-primary">
            <v-icon icon="mdi-square-edit-outline"/>
          </router-link>
          <v-icon icon="mdi-close-thick"
                  @click="deleteDeck(deck.id)"
          ></v-icon>
        </td>
      </tr>
      </tbody>
    </v-table>
  </v-container>
</template>

<script>
import DeckService from "@/services/DeckService";

export default {
  name: "DeckList",
  data(){
    return {
      decks:[],
      deckName: ""
    }
  },
  methods:{
    getAll(){
      DeckService.getAllAsList()
          .then(response => {
            this.decks = response.data;
            console.log(response.data);
          })
          .catch(e =>{
            console.log(e)
          });
    },
    getDecks(){
      DeckService.get(this.deckName)
          .then(response => {
            if(response.data == undefined)
              this.decks = null;
            else
              this.decks = response.data;
          })
          .catch(e =>{
            console.log(e)
          });
    },
    deleteDeck(id){
      DeckService.delete(id)
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