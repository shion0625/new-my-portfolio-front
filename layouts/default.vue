<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      fixed
      class="hidden-md-and-up"
      temporary
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon
        @click.stop="drawer = !drawer"
        class="hidden-md-and-up"
      />
      <v-toolbar-title v-text="title" />
      <v-tabs class="hidden-md-and-down" right>
        <v-tab
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          nuxt
        >
          {{ item.title }}
        </v-tab>
      </v-tabs>
    </v-app-bar>

    <v-main>
      <Nuxt />
    </v-main>
    <v-footer :absolute="!fixed" dark app>
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

type Item = {
  icon: string
  title: string
  to: string
}

export default defineComponent({
  setup() {
    const clipped = ref(false)
    const drawer = ref(false)
    const fixed = ref(false)
    const items = ref<Item[]>([
      {
        icon: 'mdi-home',
        title: 'Home',
        to: '/',
      },
      {
        icon: 'mdi-work',
        title: 'work',
        to: '/works',
      },
      {
        icon: 'mdi-list_alt',
        title: 'profile',
        to: '/profile',
      },
      {
        icon: 'mdi-list_alt',
        title: 'article',
        to: '/articles',
      },
      {
        icon: 'mdi-list_alt',
        title: 'contact',
        to: '/contact',
      },
    ])
    const miniVariant = ref(false)
    const title = ref('Kaito Yodogawa')
    return {
      clipped,
      drawer,
      fixed,
      items,
      miniVariant,
      title,
    }
  },
})
</script>

<style lang="scss" scoped>
.v-toolbar__title {
  overflow: visible !important;
  margin-right: 50px !important;
}

.v-overlay {
  @include display_pc {
    content-visibility: hidden;
  }
}
</style>
