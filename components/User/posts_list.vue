<template>
  <section>
    <v-card
      v-for="user in user_posts"
      :key="user._id"
      class="mx-auto post_item"
      max-width="800"
      outlined
      shaped
    >
      <v-card-text>
        <div class="text-h6 d-flex justify-space-between">
          <span class="text-h5 text--primary">
            {{ user.whoPosted.firstName }} {{ user.whoPosted.lastName }}
            <v-list-item-action>
              <v-icon v-if="user.whoPosted.gender === 'Male'"
                >mdi-human-male</v-icon
              >
              <v-icon v-else-if="user.whoPosted.gender === 'Female'"
                >mdi-human-female</v-icon
              >
            </v-list-item-action>
          </span>
          {{ user.whoPosted.email }}
        </div>

        <div class="text--primary">
          {{ user.description }}
        </div>
      </v-card-text>
      <v-card-actions class="mt-n4 mb-n4 ml-n2">
        <v-btn text color="deep-purple accent-4"> Edit </v-btn>
        <v-btn text color="deep-purple accent-4"> Delete </v-btn>
      </v-card-actions>
      <commentList
        v-for="comment in user.comments"
        :key="comment._id"
        :comments="user.comments"
      />
      <comment-field />
    </v-card>
  </section>
</template>

<script>
import commentField from './comment_field.vue';
import commentList from './comment_list.vue';

export default {
  props: ['user_posts'],
  components: {
    commentField,
    commentList,
  },
  data: () => ({}),
};
</script>

<style lang="scss" scoped>
.post_item {
  margin-bottom: 1rem;
  max-height: 400px;
}
</style>