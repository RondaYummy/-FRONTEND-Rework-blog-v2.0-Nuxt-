<template >
  <v-card class="mx-auto main_block_comment" max-width="700" outlined>
    <v-card-text>
      <span class="text-h6"> {{ whoPosted }}</span>

      <div>{{ createdAt }}</div>
      <p class="text-h6 text--primary d-flex justify-space-between">
        {{ description }}
      </p>
      <div class="text--primary">
        <!-- {{ comments }} -->
      </div>
    </v-card-text>
    <v-card-actions class="mt-n4 mb-n4 ml-n2">
      <v-btn text color="deep-purple accent-4"> Edit </v-btn>
      <v-btn text color="deep-purple accent-4"> Delete </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: ['description', 'updated-at', 'who-posted', 'created-at'],
};
</script>

<style>
.main_block_comment {
  margin-top: 0.5rem;
}
</style>
