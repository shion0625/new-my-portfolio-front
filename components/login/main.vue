<template>
  <v-container fluid fill-height>
    <v-row align-content="center" justify="center">
      <v-form>
        <v-card width="400px">
          <v-card-title class="headline">ログイン</v-card-title>
          <v-card-text>
            <loginEmailField :email.sync="email" />
            <loginPasswordField :password.sync="password" />
          </v-card-text>
          <v-card-actions>
            <v-btn>ログイン</v-btn>
          </v-card-actions>
        </v-card>
      </v-form>
    </v-row>
  </v-container>
</template>
<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const email = ref('')
    const password = ref('')
    return {
      email,
      password,
    }
  },
})
</script>
