<template>
  <section class="home-main">
    <v-container fluid fill-height class="home-main__content">
      <v-row align="center" justify="center" class="home-main__content-text">
        <vue-typed-js
          :strings="[
            '<p>Welcome to My Portfolio. </p>',
            '<b>I\'m a Kaito Yodogawa.<b>',
          ]"
          :type-speed="100"
          :contentType="'html'"
          :smartBackspace="true"
        >
          <h1 class="typing"></h1>
        </vue-typed-js>
      </v-row>
    </v-container>
  </section>
</template>

<script>
export default {
  name: 'main',
}
</script>

<style lang="scss" scoped>
.home-main__content {
  background-image: url('~@/assets/img/portfolio-bg.jpg');
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 50vh;
  @include display_pc {
    height: 100vh;
  }
  &-text {
    color: white;
    text-align: center;
    font-size: 28px;
    font-weight: bold;
    @include display_pc {
      font-size: 40px;
    }
  }
}
</style>
