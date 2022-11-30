<template>
  <v-container>
    <div v-if="currentDeck" class="edit-form">
      <h4>
        <v-icon icon="mdi-controller"/>
        Card
      </h4>


      <p>{{ message }}</p>
      <v-form>
        <v-col
            cols="12"
        >
          <v-row>
            <v-text-field
                v-model="currentDeck.name"
                :rules="[v => !!v || 'Item is required']"
                label="Name"
                required
                clearable
            ></v-text-field>
            <v-select
                label="format" v-model="currentDeck.deckType"
                :items="['STANDARD', 'MODERN', 'LEGACY', 'COMMANDER']"
                variant="solo"
            >
            </v-select>
          </v-row>
        </v-col>
        <v-col
            cols="12"
        >
          <v-select
              label="commander" v-model="commander.name"
              disabled
              :items="allCards"
              variant="solo"
          >
          </v-select>
        </v-col>
        <v-col>
          <v-row>
            <v-select
                label="card" v-model="cardToAdd"
                :items="this.deckList"
                variant="solo"
                density="compact"
            >
            </v-select>
            <v-btn class="mr-4"
                   @click="addCard()"
                   color="green"
            >
              <v-icon
                  start
                  icon="mdi-plus"
              ></v-icon>
              Add
            </v-btn>
          </v-row>
        </v-col>
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
              Action
            </th>
          </tr>
          </thead>
          <tbody>
          <tr class="text-left"
              v-for="card in this.currentDeck.cards"
              :key="card.id"
          >
            <td>
              <v-col
                  cols="auto"
              >
                <v-row>
                  <v-col cols="3">
                    {{ card.card.name }}
                  </v-col>
                  <v-btn
                      class="mr-4"
                      @click="removeCard(card)"
                      color="red"
                  >
                    <v-icon
                        start
                        icon="mdi-close-thick"
                    ></v-icon>
                    remove
                  </v-btn>
                  <v-btn
                      @click="setCommander(card.card)"
                      color="cyan"
                      width="175"
                  >
                    Set as Commander
                  </v-btn>
                  <v-text-field
                      v-model="card.quantity"
                      class="ml-3 w-0"
                      hide-details
                      single-line
                      label="Quantity"
                      type="number"
                      min=1
                      density="compact"

                  />
                </v-row>
              </v-col>
            </td>
          </tr>
          <v-col
              cols="12"
          >
            <v-select
                label="Owner" v-model="this.newOwner"
                :items="userList"
                variant="solo"
            >
            </v-select>
          </v-col>
          </tbody>
        </v-table>

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
import DeckService from "@/services/DeckService";
import CardService from "@/services/CardService";
import UserService from "@/services/UserService";

export default {
  name: "NewDeck",
  data(){
    return {
      currentDeck: {
        id: 0,
        name:'',
        deckType:'',
        cards:[],
        owner: 0
      },
      newOwner:'',
      cardToAdd:'',
      deckList:[],
      userList:[],
      allCards:[],
      allUsers:[],
      commander:'',
      message: '',
    };
  },

  methods: {
    submitForm() {
      this.create();
    },
    setCommander(card){
      if(this.currentDeck.deckType == 'COMMANDER') {
        this.commander = card
          this.message = ''
      } else{
        this.message = 'This is not a COMMANDER deck, therefore cannot have a commander'
      }
    },
    removeCard(card){
      console.log(this.currentDeck)
      this.currentDeck.cards = this.currentDeck.cards.filter(function(item){
        return item !== card;
      })
      console.log(this.currentDeck.cards)
    },
    addCard() {
      if (this.cardToAdd == ''){
        this.message = 'No card to add'
        return;
      }
      for(var c=0; c< this.currentDeck.cards.length;c++){
        if(this.cardToAdd == this.currentDeck.cards[c].card.name){
          this.currentDeck.cards[c].quantity += 1
          return;
        }
      }
      this.findCard(this.cardToAdd)
      console.log("after")
      console.log(this.currentDeck)
    },
    getAllCards(){
      CardService.getAsList()
          .then(response => {
            this.allCards = response.data
            for(var card = 0;card < this.allCards.length;card++){
              this.deckList.push(response.data[card].name)
            }
          })
          .catch(e => {
            console.log(e);
          });
    },
    getAllUsers(){
      UserService.getAsList()
          .then(response => {
            for(var user = 0;user < response.data.length;user++){
              console.log(response.data[user])
              this.allUsers.push(response.data[user])
              this.userList.push(response.data[user].fullName)
            }
          })
          .catch(e => {
            console.log(e);
          });
      console.log(this.allUsers)
      console.log(this.userList)
    },
    create() {
      var data = this.createData()
      var cardInDeck = {}
      data.name = this.currentDeck.name
      data.deckType = this.currentDeck.deckType
      data.commander = this.commander.id
      data.owner = this.findOwner(this.newOwner)
      console.log(data)
      for(var card =0; card < this.currentDeck.cards.length; card++){
        cardInDeck = this.createCardsInDeck()
        cardInDeck.cardId = this.currentDeck.cards[card].card.id;
        cardInDeck.qtd = this.currentDeck.cards[card].quantity;
        console.log(cardInDeck)
        data.cards.push(cardInDeck)
      }
      DeckService.create(data)
          .then(response => {
            this.message = 'The Deck was created successfully!';
            console.log(response.data);
          })
          .catch(e => {
            console.log(data);
            this.message = e.response.data.message;
          });
    },
    createNewCard(){
      return{
        card:{},
        id:{},
        quantity: 1
      }
    },
    createData(){
      return{
        id: 0,
        name:'',
        deckType:'',
        commander:0,
        cards:[],
        owner: 0
      }
    },
    createCardsInDeck(){
      return{
        cardId: 0,
        qtd:1
      }
    },
    findCard(name){
      var card = this.createNewCard();
      for(var c=0;c < this.allCards.length;c++){
        if(this.allCards[c].name == name){
          card.card = this.allCards[c]
          this.currentDeck.cards.push(card)
          console.log("found")
          console.log(card)
          break;
        }
      }
    },
    findOwner(name){
      for(var user=0;user < this.allUsers.length;user++){
        if(this.allUsers[user].fullName == name){
          console.log("found")
          console.log(this.allUsers[user])
          return this.allUsers[user].id
        }
      }
    }
  },
  mounted() {
    this.message = '';
    this.getAllCards();
    this.getAllUsers();
  },


};
</script>

<style scoped>

</style>