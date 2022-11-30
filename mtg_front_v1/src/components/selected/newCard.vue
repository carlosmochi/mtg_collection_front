<template>
  <v-container>
    <div v-if="currentCard" class="edit-form">
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
                v-model="currentCard.name"
                :rules="[v => !!v || 'Item is required']"
                label="Name"
                required

                clearable
            ></v-text-field>
            <v-text-field
                v-model="currentCard.cost"
                label="Cost"
                clearable
            >
            </v-text-field>
          </v-row>
        </v-col>
        <v-col
            cols="12"
        >
          <v-row>
            <v-select
                label="type" v-model="currentCard.type"
                :items="['CREATURE', 'Enchantment', 'Artifact', 'Land', 'Planeswalker', 'Instant', 'Sorcery', 'Basic_Land']"
                variant="solo"
            >
            </v-select>
            <v-text-field
                v-model="currentCard.powerToughness"
                :rules="[v => !!v || 'Item is required']"
                label="Power/Toughtness"
                clearable
            ></v-text-field>
          </v-row>
        </v-col>
        <v-col
            cols="12"
        >
          <v-textarea
              v-model="currentCard.description"
              label="Description"
              clearable
          >
          </v-textarea>
          <v-text-field
              v-model="currentCard.year"
              :rules="[v => !!v || 'Item is required']"
              label="Year"
              required
              clearable
          ></v-text-field>
        </v-col>
        <v-col
            cols="12"
        >
          <v-label> Banned Formats</v-label>
          <v-row>
            <v-checkbox
                label="STANDARD" v-model="currentCard.bannedFormats"
                value="STANDARD"
            >
            </v-checkbox>
            <v-checkbox
                label="MODERN" v-model="currentCard.bannedFormats"
                value="MODERN"
            >
            </v-checkbox>
            <v-checkbox
                label="LEGACY" v-model="currentCard.bannedFormats"
                value="LEGACY"
            >
            </v-checkbox>
            <v-checkbox
                label="COMMANDER" v-model="currentCard.bannedFormats"
                value="COMMANDER"
            >
            </v-checkbox>
          </v-row>
          <v-label>Restricted Formats</v-label>
          <v-row>
            <v-checkbox
                label="STANDARD" v-model="currentCard.restrictedFormats"
                value="STANDARD"
            >
            </v-checkbox>
            <v-checkbox
                label="MODERN" v-model="currentCard.restrictedFormats"
                value="MODERN"
            >
            </v-checkbox>
            <v-checkbox
                label="LEGACY" v-model="currentCard.restrictedFormats"
                value="LEGACY"
            >
            </v-checkbox>
            <v-checkbox
                label="COMMANDER" v-model="currentCard.restrictedFormats"
                value="COMMANDER"
            >
            </v-checkbox>
          </v-row>
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
import CardService from "@/services/CardService";

export default {
  name: "NewCard",
  data(){
    return {
      currentCard: {
        name: '',
        cost: '',
        type: '',
        powerToughness: '',
        description: '',
        year: 0,
        bannedFormats: [],
        restrictedFormats: []
      },
      message: '',
    };
  },

  methods: {
    submitForm() {
      this.create();
    },
    create() {
      CardService.create(this.currentCard)
          .then(response => {
            this.message = 'The card was created successfully!';
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