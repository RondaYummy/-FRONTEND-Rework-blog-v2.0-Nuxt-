<template>
  <v-expansion-panels class="comments_field_main">
    <v-expansion-panel>
      <v-expansion-panel-header>
        <template v-slot:default="{ open }">
          <v-row no-gutters>
            <v-col cols="4"> Write a comment? </v-col>
            <v-col cols="8" class="text--secondary">
              <v-fade-transition leave-absolute>
                <span v-if="open" key="0"> Enter a name for the trip </span>
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
          @keydown.enter="addComment"
          placeholder="Write a comment here..."
        ></v-text-field>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
import api from '../../plugins/api';

export default {
  data: () => ({
    descriptionComment: '',
  }),
  methods: {
    async addComment() {
      const postId = 123;
      await api.addComment(postId, {
        description: this.descriptionComment,
        // user, // користувач якому постять коммент
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
