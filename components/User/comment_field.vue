<template>
  <v-expansion-panels class="comments_field_main">
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template #default="{ open }">
          <v-row no-gutters>
            <v-col cols="4"> Write a comment? </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open && $store.state.user.user._id" key="0">
                  To add press "Enter"
                </span>
                <span v-else-if="open && !$store.state.user.user._id" key="0">
                  <v-icon class="mdi-18px"> mdi-login </v-icon>
                  To write a comment, you need to log in.
                </span>
                <span v-else key="1">
                  {{ descriptionComment }}
                </span>
              </v-fade-transition>
            </v-col>
          </v-row>
        </template>
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <v-text-field
          v-model="descriptionComment"
          placeholder="Write a comment here..."
          :disabled="!$store.state.user.user._id"
          @keydown.enter="addComment"
        />
      </v-expansion-panel-content>
    </v-expansion-panel>
    <v-snackbar v-model="snackbar">
      {{ text }}
      <template #action="{ attrs }">
        <v-btn color="green" text v-bind="attrs" @click="snackbar = false">
          Ok
        </v-btn>
      </template>
    </v-snackbar>

    <v-snackbar v-model="snackbarDontAdded">
      {{ textNoAdd }}
      <template #action="{ attrs }">
        <v-btn
          color="red"
          text
          v-bind="attrs"
          @click="snackbarDontAdded = false"
        >
          Ok
        </v-btn>
      </template>
    </v-snackbar>
  </v-expansion-panels>
</template>

<script>
import api from '../../plugins/api';

export default {
  props: {
    idPost: String,
  },
  data: () => ({
    descriptionComment: '',
    snackbar: false,
    snackbarDontAdded: false,
    text: `Comment successfully added.`,
    textNoAdd: `Error. No comment added..`,
  }),
  methods: {
    async addComment() {
      await api
        .addComment(this.idPost, {
          description: this.descriptionComment,
          user: this.$route.params.id, // користувач якому постять коммент
          whoPosted: this.$store.state.user.user._id,
        })
        .then(() => {
          this.snackbar = true;
          this.descriptionComment = '';
        })
        .catch(() => {
          this.snackbarDontAdded = true;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.comments_field_main {
  margin-top: 1rem;
}
</style>
