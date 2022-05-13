<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col
        v-for="work in state.works"
        :key="work.data.id"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="3"
        align-self="center"
      >
        <v-card
          class="pa-2"
          outlined
          tile
        >
        <v-card-title>{{ work.data.attribute.title }} ({{work.data.genre}})</v-card-title>
          <v-divider></v-divider>
            <v-img
              src=""
              height="125"
              class="grey darken-4"
            ></v-img>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>

import axios from 'axios'
import { defineComponent, reactive,ref, onBeforeMount, onMounted} from '@vue/composition-api'

export default defineComponent({
  setup() {
    const dialog = ref(false);
    const state = reactive({
      data: {},
      works: {},
    })

    async function getWorks(){
      await axios.get('http://localhost/sanctum/csrf-cookie').then( async (res) =>{
        await axios.get('http://localhost/api/works').then(response => {
          state.data = response;
          state.works = state.data.data[0];
          console.log(response);
        }).catch((err) => {
          console.log('error')
          console.log(err);
        })
      })
    }
    onBeforeMount(() => {
      getWorks()
    })
    return {
      dialog,
      state,
      getWorks
    }
  },
})
</script>
>
