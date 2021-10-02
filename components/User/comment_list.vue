<template >
  <section>
    <v-card
      v-for="(coment, index) of comments"
      :key="index"
      class="mx-auto main_block_comment"
      max-width="90%"
      outlined
      shaped
    >
      <v-card-text v-if="comments.length">
        <div class="d-flex justify-space-between">
          <span class="text-h6">
            {{ coment.whoPosted.firstName }}
            {{ coment.whoPosted.lastName }}
          </span>
          <span class="text-h6">
            {{ coment.whoPosted.email }}
          </span>
        </div>

        <p
          v-if="!arrEditedComments.find((e) => e._id === coment._id)"
          class="text-h6 text--primary d-flex justify-space-between"
        >
          {{ coment.description }}
        </p>
        <v-text-field
          v-if="arrEditedComments.find((e) => e._id === coment._id)"
          v-model="desc"
          label="Edit here..."
          @keydown.enter="saveEditPost(desc, coment._id)"
        >
        </v-text-field>
      </v-card-text>
      <v-card-actions class="mt-n4 mb-n1 ml-n1 d-flex justify-space-between">
        <section>
          <v-btn
            v-if="
              coment.whoPosted._id === $store.state.user.user._id &&
              !arrEditedComments.find((e) => e._id === coment._id)
            "
            text
            color="orange darken-1"
            @click="editComment(coment)"
          >
            Edit
          </v-btn>

          <v-btn
            v-if="
              coment.whoPosted._id === $store.state.user.user._id &&
              arrEditedComments.find((e) => e._id === coment._id)
            "
            text
            color="green darken-1"
            @click="saveEditComment(desc, coment._id)"
          >
            SAVE
          </v-btn>

          <v-btn
            v-if="coment.whoPosted._id === $store.state.user.user._id"
            text
            color="red  accent-4"
            @click="deleteComment(coment._id)"
          >
            Delete
          </v-btn>
        </section>
        <div>
          <span class="mr-2">{{
            $moment(coment.createdAt).format('DD/MM/YY HH:mm')
          }}</span>
        </div>
      </v-card-actions>
    </v-card>
  </section>
</template>


<script>
import api from '../../plugins/api';

export default {
  props: ['postId'],
  data() {
    return {
      comments: [],
      arrEditedComments: [],
      desc: '',
    };
  },
  async created() {
    this.comments = await api
      .getPostComments(this.postId)
      .then((comments) => comments.data.data);
  },
  methods: {
    editComment(coment) {
      this.arrEditedComments.push(coment);
    },
    saveEditComment(desc, id) {
      console.log('x');
    },
    async deleteComment(id) {
      await api.deleteComment(id);
      this.comments.splice(
        this.comments.findIndex((el) => el._id === id),
        1
      );
    },
  },
};
</script>

<style>
.main_block_comment {
  margin-top: 0.5rem;
}
</style>
