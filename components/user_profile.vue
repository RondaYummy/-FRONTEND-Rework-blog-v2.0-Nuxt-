<template>
  <v-card class="overflow-hidden">
    <v-app-bar
      absolute
      color="#6A76AB"
      dark
      shrink-on-scroll
      prominent
      src="https://picsum.photos/1920/1080?random"
      fade-img-on-scroll
      height="200px"
      scroll-target="#scrolling-techniques-3"
    >
      <template v-slot:img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <!-- Для малих розмірів екрана можна використати замість нижніж -->
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-app-bar-title
        >{{ user_data.firstName }} {{ user_data.lastName }}</v-app-bar-title
      >

      <v-spacer></v-spacer>
      <div class="text-center d-flex">
        <span class="font-weight-bold pt-2">
          {{ rating }}
        </span>
        <div class="text-center">
          <v-rating
            v-model="rating"
            color="yellow darken-3"
            background-color="grey darken-1"
            empty-icon="$ratingFull"
            half-increments
            hover
            large
          ></v-rating>
        </div>
      </div>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon color="yellow" v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item v-for="(item, i) in items" :key="i">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <template v-slot:extension>
        <v-tabs align-with-title v-model="tab">
          <v-tab v-for="item in itemsMenu" :key="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <v-sheet
      id="scrolling-techniques-3"
      class="overflow-y-auto"
      max-height="700"
    >
      <v-container style="height: 310px">Lorem100</v-container>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-expansion-panels :value="0" class="exp_panel_block">
            <v-expansion-panel>
              <v-expansion-panel-header>
                <template v-slot:default="{ open }">
                  <v-row no-gutters>
                    <v-col cols="4"> Write a post? </v-col>
                    <v-col cols="8" class="text--secondary">
                      <v-fade-transition leave-absolute>
                        <span v-if="open" key="0"> To add press "Enter" </span>
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
                  v-model="descriptionPost"
                  @keydown.enter="addPost"
                  placeholder="Write a post here..."
                ></v-text-field>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-card flat>
            <v-card class="mx-auto" max-width="800" :elevation="0">
              <posts-list class="main_post_block" :user_posts="user_posts" />
            </v-card>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat class="d-flex flex-wrap justify-space-around">
            <friend-list />
            <friend-list />
            <friend-list />
            <friend-list />
            <friend-list />
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat class="d-flex flex-wrap justify-space-around">
            <h1>Services page</h1>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-sheet>
  </v-card>
</template>

<script>
import friendList from "./User/friend_list.vue";
import postsList from "./User/posts_list.vue";
import api from "../plugins/api";

export default {
  components: {
    friendList,
    postsList,
  },
  created: async function () {
    if (this.$store.state.user.user) {
      this.user_data = await api
        .getCurrentUser(this.$store.state.user.user._id)
        .then((res) => res.data.user);
      this.title = `${this.user_data.firstName} ${this.user_data.lastName}`;
      this.user_posts = await api
        .getUserPosts(this.$store.state.user.user._id)
        .then((res) => res.data.data);
      this.user_posts.reverse();
    }
  },
  data: () => ({
    title: `User`,
    user_data: {},
    user_posts: [],
    descriptionPost: "",
    items: [
      { title: "Click Me" },
      { title: "Click Me" },
      { title: "Click Me" },
    ],
    tab: null,
    itemsMenu: ["Main", "Friends", "Settings"],
    length: 5,
    rating: 3.5,
  }),
  methods: {
    async addPost() {
      const post = await api.addpost(this.$store.state.user.user._id, {
        description: this.descriptionPost,
      });

      this.user_posts.unshift(post.data.data); // TODO коли добавляєш пост не появляються дані користувача бо не підтягується попуулейт, треба робити запит знову?
      this.descriptionPost = "";
    },
  },
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "user",
          name: "user",
          content: "My custom user",
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
.exp_panel_block {
  margin: 0 auto;
  max-width: 800px;
  margin-bottom: 1rem;
  margin-top: 1rem;
}
.main_post_block {
  padding: 1.5rem;
  background-color: #f0f2f5;
  margin-bottom: 2rem;
}
</style>