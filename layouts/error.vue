<template>
  <v-app dark>
    <div class="fo" v-if="error.statusCode === 404">
      <p class="p1">Ця сторінка недоступна</p>
      <p class="p2">Ми обшукали весь Всесвіт, але не змогли її знайти.</p>
      <p class="p2 p3">
        Можливо, це посилання недійсне, або сторінку могли видалити.
        Переконайтеся, що ви намагаєтеся відкрити правильне посилання.
      </p>
      <form>
        <NuxtLink to="/">
          <button class="homeButton">Go back to home screen</button></NuxtLink
        >
      </form>
    </div>
    <div v-else-if="error.statusCode === 401" class="unauthBlock">
      <NuxtLink to="/">
        <button class="homeButton unauthButton">
          Go back to home screen
        </button></NuxtLink
      >
      <h1 class="unauth">{{ unauthorized }}</h1>
    </div>
    <h1 v-else>{{ otherError }} ({{ error.statusCode }})</h1>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: '404 Not Founds',
      otherError: 'An error occurred',
      unauthorized: 'Access allowed only for registered users',
    };
  },
  head() {
    const title =
      this.error.statusCode === 404
        ? this.pageNotFound
        : this.otherError || this.error.statusCode === 401
        ? this.unauthorized
        : this.otherError;
    return {
      title,
    };
  },
};
</script>

<style lang="scss" scoped>
.homeButton {
  color: black;
}
.homeButton:hover {
  color: white;
}
.unauthBlock {
  width: 80%;
  height: 80%;
  background-repeat: no-repeat;
  background-position: center;
  margin: 0 auto;
  background-image: url('../assets/images/401 Error Unauthorized-amico.svg');
  position: relative;
  .unauthButton {
    position: absolute;
    bottom: 5.5rem;
    left: 40%;
  }
  .unauth {
    position: absolute;
    bottom: 2.5rem;
    font-size: 0.9rem;
    left: 39.1%;
  }
}
.fo {
  background-image: url('../assets/404-img.png');
  background-repeat: no-repeat;
  background-size: 40%;
  background-position: top;
}
button {
  font-family: 'Varela Round', sans-serif;
  background-color: transparent;
  border: 2px solid #eb6db4;
  color: #fff;
  border-radius: 10px;
  padding: 10px 30px;
  margin-top: 10px;
  transition: 0.3s;
  text-align: center;
  transform: translate(0%, 50%);
  outline: none;
  cursor: pointer;
  &:hover {
    background-color: #6e81e3;
    border: 2px solid #6e81e3;
    border-radius: 25px;
  }
}
form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  vertical-align: middle;
}
.p1 {
  color: #eb6db4;
  font-size: 24px;
  font-family: 'Dosis', sans-serif;
  vertical-align: middle;
  text-align: center;
  margin-top: 15rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-weight: bold;
}
.p2 {
  color: #eb6db4;
  font-size: 18px;
  font-family: 'Dosis', sans-serif;
  vertical-align: middle;
  text-align: center;
  margin-top: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
