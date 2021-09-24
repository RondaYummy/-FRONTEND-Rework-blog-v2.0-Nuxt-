<template>
  <section>
    <v-card
      v-for="user in userPosts"
      :key="user._id"
      class="mx-auto"
      max-width="800"
      outlined
    >
      <v-card-text>
        <div class="text-h6">{{ user.whoPosted.email }}</div>
        <p class="text-h5 text--primary">
          {{ user.whoPosted.firstName }} {{ user.whoPosted.lastName }}
        </p>
        <div class="text--primary">
          {{ user.description }}
        </div>
      </v-card-text>
      <v-card-actions>
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
  props: ['userPosts'],
  components: {
    commentField,
    commentList,
  },
  data: () => ({}),
};
</script>
