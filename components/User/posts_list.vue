<template>
  <section>
    <section>
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

          <div
            v-if="!arrEditedposts.find((e) => e._id === user._id)"
            class="text--primary"
          >
            {{ user.description }}
          </div>
          <v-text-field
            v-if="arrEditedposts.find((e) => e._id === user._id)"
            :value="user.description"
            label="Edit here..."
            v-model="desc"
          >
          </v-text-field>
        </v-card-text>
        <v-card-actions class="mt-n4 mb-n1 ml-n1 d-flex justify-space-between">
          <section>
            <v-btn
              v-if="
                user.whoPosted._id === $store.state.user.user._id &&
                !arrEditedposts.find((e) => e._id === user._id)
              "
              text
              color="orange darken-1"
              @click="editPost(user)"
            >
              Edit
            </v-btn>

            <v-btn
              v-if="
                user.whoPosted._id === $store.state.user.user._id &&
                arrEditedposts.find((e) => e._id === user._id)
              "
              text
              color="green darken-1"
              @click="saveEditPost(desc, user._id)"
            >
              SAVE
            </v-btn>

            <v-btn
              v-if="user.whoPosted._id === $store.state.user.user._id"
              text
              color="red  accent-4"
              @click="deletePost(user._id)"
            >
              Delete
            </v-btn>
          </section>
          <div>
            <span class="mr-2">{{
              $moment(user.createdAt).format('DD/MM/YY HH:mm')
            }}</span>
          </div>
        </v-card-actions>
      </v-card>

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
import api from '../../plugins/api';

export default {
  components: {
    commentField,
    commentList,
  },
  props: ['user_posts', 'user'],
  data() {
    return {
      arrEditedposts: [],
      desc: '',
    };
  },
  methods: {
    /* eslint vue/no-mutating-props: 0 */
    async deletePost(id) {
      this.user_posts.splice(
        this.user_posts.findIndex((el) => el._id === id),
        1
      );
      await api.deletePost(id);
    },
    editPost(post) {
      this.arrEditedposts.push(post);
    },
    async saveEditPost(description, postId) {
      const currentPost = await api.editPost(description, postId);
      this.arrEditedposts.splice(
        this.arrEditedposts.findIndex((el) => el._id === postId),
        1
      );
      const index = this.user_posts.findIndex((el) => el._id === postId);
      this.user_posts.splice(index, 1, currentPost.data.data);
    },
  },
};
</script>

<style lang="scss" scoped>
.post_item {
  margin-bottom: 1rem;
  max-height: 400px;
}
</style>