<template>
  <section>
    <v-card
      class="mx-auto"
      max-width="800"
      outlined
      v-for="user in user_posts"
      :key="user._id"
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
        :comments="user.comments"
        v-for="comment in user.comments"
        :key="comment._id"
      />
      <comment-field />
    </v-card>
  </section>
</template>

<script>
import commentField from "./comment_field.vue";
import commentList from "./comment_list.vue";

export default {
  props: ["user_posts"],
  components: {
    commentField,
    commentList,
  },
  data: () => ({}),
};
</script>