<template>
  <section>
    <section v-for="user in user_posts" :key="user._id">
      <v-card class="mx-auto post_item" max-width="800" outlined shaped>
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
        <v-card-actions class="mt-n4 mb-n1 ml-n1 d-flex justify-space-between">
          <section>
            <v-btn text color="orange darken-1"> Edit </v-btn>
            <v-btn text color="red  accent-4"> Delete </v-btn>
          </section>
          <div>
            <span>{{ $moment(user.createdAt).format('DD/MM/YY HH:mm') }}</span>
          </div>
        </v-card-actions>
      </v-card>
      {{ user.comments }}
      <!-- updatedAt whoPosted createdAt -->
      <commentList
        v-for="comment in user.comments"
        :key="comment._id"
        :description="comment.description"
        :updated-at="comment.updatedAt"
        :created-at="comment.createdAt"
        :who-posted="comment.whoPosted"
      />
      <comment-field :idPost="user._id" />
    </section>
  </section>
</template>

<script>
import commentField from './comment_field.vue';
import commentList from './comment_list.vue';

export default {
  components: {
    commentField,
    commentList,
  },
  props: ['user_posts'],
};
</script>

<style lang="scss" scoped>
.post_item {
  margin-bottom: 1rem;
  max-height: 400px;
}
</style>