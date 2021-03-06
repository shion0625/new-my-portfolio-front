<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col
        v-for="work in allWorks"
        :key="work.data.id"
        cols="12"
        sm="6"
        md="6"
        lg="4"
        xl="3"
        align-self="center"
      >
        <v-card class="pa-2" outlined tile>
          <v-card-title>{{ work.data.attribute.title }}</v-card-title>
          <v-card-subtitle>{{ work.data.genre }}</v-card-subtitle>
          <v-divider></v-divider>
          <div v-if="work.data.image.length">
            <v-carousel cycle height="125" hide-delimiters :show-arrows="false">
              <v-carousel-item v-for="(image, i) in work.data.image" :key="i">
                <v-img
                  v-if="$webp"
                  height="125"
                  :src="'data:image/webp;base64,' + image.image_webp"
                  class="grey darken-4"
                  loading="lazy"
                ></v-img>
                <v-img
                  v-else
                  :src="'data:image/jpeg;base64,' + image.image_jpg"
                  height="125"
                  class="grey darken-4"
                  loading="lazy"
                ></v-img>
              </v-carousel-item>
            </v-carousel>
          </div>
          <v-btn
            variant="text"
            color="teal-accent-4"
            @click.stop="onClickMore(work.data)"
          >
            Learn More
          </v-btn>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog v-model="dialog" v-if="currentWork" max-width="600px">
      <v-card max-width="600" class="pa-5">
        <v-card-title>{{ currentWork.attribute.title }}</v-card-title>
        <v-card-subtitle>{{ currentWork.genre }}</v-card-subtitle>
        <v-list three-line>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo accent-2">
                mdi-desktop-mac-dashboard
              </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>概要</v-list-item-title>
              <div class="list-item-content-body">
                {{ currentWork.attribute.summary }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo accent-2">mdi-message-text</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>コメント</v-list-item-title>
              <div class="list-item-content-body">
                {{ currentWork.attribute.comment }}
              </div>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo accent-2">mdi-earth</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>言語</v-list-item-title>
              <div class="list-item-content-body">
                <v-chip
                  v-for="(lang, i) in currentWork.attribute.language"
                  :key="i"
                >
                  {{ lang }}
                </v-chip>
              </div>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-row>
          <v-card-actions>
            <v-btn :href="currentWork.attribute.url" rounded target="_blank">
              {{ currentWork.attribute.title }}のサイトへ
            </v-btn>
          </v-card-actions>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn
              :href="currentWork.attribute.source_code_url"
              rounded
              target="_blank"
            >
              githubのソースコードへ
            </v-btn>
          </v-card-actions>
        </v-row>
        <v-row>
          <v-card-actions>
            <v-btn @click="dialog = false" color="error">
              Close
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-actions>
          <v-spacer></v-spacer>
          <v-chip label color="indigo" text-color="white">
            <v-avatar left>
              <v-icon>mdi-account-circle</v-icon>
            </v-avatar>
            人数:
            {{ currentWork.attribute.number }}
            人
          </v-chip>
          <v-spacer></v-spacer>
          <v-chip label color="green" text-color="white">
            <v-avatar left size="70">
              <v-icon>mdi-clock-time-four-outline</v-icon>
            </v-avatar>
            期間:
            {{ currentWork.attribute.period }}
            ヶ月
          </v-chip>
          <v-spacer></v-spacer>
          <v-chip label color="teal" text-color="white">
            <v-avatar left size="70">
              <v-icon>mdi-calendar-month-outline</v-icon>
            </v-avatar>
            公開日:
            {{ currentWork.attribute.created.split('T')[0] }}
          </v-chip>
        </v-row>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script script lang="ts">
import axios from 'axios'

import {
  defineComponent,
  ref,
  onBeforeMount,
  useFetch,
} from '@nuxtjs/composition-api'

export default defineComponent({
  setup() {
    interface Work {
      attribute: object
    }
    interface Works {
      data: []
    }

    const dialog = ref(false)
    let currentWork = ref<Work>()
    let allWorks = ref<Works>()

    async function getWorks() {
      await axios
        .get('http://localhost/sanctum/csrf-cookie')
        .then(async (res) => {
          await axios
            .get('http://localhost/api/works')
            .then((response) => {
              allWorks.value = response.data[0]
              // console.log(allWorks)
            })
            .catch((err) => {
              console.log('error')
              console.log(err)
            })
        })
    }

    const onClickMore = (work: Work) => {
      currentWork.value = work
      dialog.value = true
    }

    const work_post = useFetch(()=>getWorks());


    return {
      dialog,
      currentWork,
      allWorks,
      getWorks,
      onClickMore,
      work_post
    }
  },
})
</script>
>
