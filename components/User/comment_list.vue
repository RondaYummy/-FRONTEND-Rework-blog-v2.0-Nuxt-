<template v-for="comment in comments" :key="comment._id">
  <v-card class="mx-auto main_block_comment" max-width="700" outlined>
    <v-card-text>
      <div class="text-h6">basrers@ukr.net {{ comments.whoPosted }}</div>
      <p class="text-h6 text--primary">
        Halevych Andrii {{ comments.whoPosted }}
      </p>
      <div class="text--primary">
        {{ comments.description }}
      </div>
    </v-card-text>
    <v-card-actions>
      <v-btn text color="deep-purple accent-4"> Edit </v-btn>
      <v-btn text color="deep-purple accent-4"> Delete </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['comments'],
};
</script>

<style>
.main_block_comment {
  margin-top: 0.5rem;
}
</style>
