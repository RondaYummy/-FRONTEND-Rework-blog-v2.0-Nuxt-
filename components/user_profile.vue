<template>
  <v-card v-if="userData" class="overflow-hidden">
    <v-app-bar
      pp-bar
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
      <template #img="{ props }">
        <v-img
          v-bind="props"
          gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
        ></v-img>
      </template>

      <!-- Для малих розмірів екрана можна використати замість нижніж -->
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon> -->

      <v-app-bar-title class="ml-7 text-h3">
        {{ userData.firstName }} {{ userData.lastName }}
      </v-app-bar-title>

      <v-spacer></v-spacer>

      <v-tooltip
        v-if="
          $store.state.user.user && $store.state.user.user._id !== userData._id
        "
        bottom
      >
        <template
          v-if="
            $store.state.user.user &&
            $store.state.user.user._id !== userData._id
          "
          #activator="{ on, attrs }"
        >
          <v-btn
            icon
            bottom
            left
            :disabled="!$store.state.user.user._id"
            @click="addToFavorites"
          >
            <v-icon
              :color="isFavorited ? 'red' : 'white'"
              large
              v-bind="attrs"
              v-on="on"
              >mdi-heart</v-icon
            >
          </v-btn>
        </template>
        <span> {{ isFavorited ? delFav : addFav }} </span>
      </v-tooltip>

      <v-tooltip
        v-if="
          $store.state.user.user && $store.state.user.user._id !== userData._id
        "
        bottom
      >
        <template #activator="{ on, attrs }">
          <v-btn
            icon
            bottom
            left
            :disabled="!$store.state.user.user._id"
            @click="addToFriends"
          >
            <v-icon large v-bind="attrs" v-on="on">
              {{ isFriend ? 'mdi-account-remove' : 'mdi-account-plus' }}
            </v-icon>
          </v-btn>
        </template>
        <span> {{ isFriend ? delFriend : addFriend }}</span>
      </v-tooltip>

      <v-snackbar v-model="friendAdded" :timeout="4000">
        {{ friendAddedText }}
        <template #action="{ attrs }">
          <v-btn color="green" text v-bind="attrs" @click="friendAdded = false">
            Ok
          </v-btn>
        </template>
      </v-snackbar>

      <template #extension>
        <v-tabs v-model="tab" align-with-title>
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
                <template #default="{ open }">
                  <v-row no-gutters>
                    <v-col cols="4"> Write a post? </v-col>
                    <v-col cols="8" class="text--secondary">
                      <e-transitionv-fad leave-absolute>
                        <span v-if="open && $store.state.user.user._id" key="0">
                          To add press "Enter"
                        </span>
                        <span
                          v-if="open && !$store.state.user.user._id"
                          key="0"
                        >
                          <v-icon class="mdi-18px"> mdi-login </v-icon>
                          To write a post, you need to log in.
                        </span>
                        <span v-else key="1">
                          {{ descriptionPost }}
                        </span>
                      </e-transitionv-fad>
                    </v-col>
                  </v-row>
                </template>
              </v-expansion-panel-header>
              <v-expansion-panel-content>
                <v-text-field
                  v-model="descriptionPost"
                  :disabled="!$store.state.user.user._id"
                  placeholder="Write a post here..."
                  @keydown.enter="addPost"
                >
                </v-text-field>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>

          <v-card flat>
            <v-card class="mx-auto" max-width="800" :elevation="0">
              <posts-list
                v-for="user in user_posts"
                :key="user._id"
                class="main_post_block"
                :user_posts="user_posts"
                :user="user"
              />
            </v-card>
          </v-card>
        </v-tab-item>

        <v-tab-item>
          <v-card flat class="d-flex flex-wrap justify-space-around">
            <friend-list
              v-for="friend in userData.friends"
              :key="friend._id"
              :friend="friend"
            />
          </v-card>
        </v-tab-item>

        <v-tab-item v-if="$store.state.user.user._id === $route.params.id">
          <v-card>
            <h1>Надіслані</h1>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              >
              </v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :search="search" :items="sentBy">
              <template #[`item.actions`]="{ item }">
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <v-icon
                      class="mr-2"
                      v-bind="attrs"
                      color="red"
                      v-on="on"
                      @click="cancelFriendRequest(item)"
                    >
                      mdi-cancel
                    </v-icon>
                  </template>
                  <span>Відмінити</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>

        <v-tab-item v-if="$store.state.user.user._id === $route.params.id">
          <h1>Отримані</h1>
          <v-card>
            <v-card-title>
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              >
              </v-text-field>
            </v-card-title>
            <v-data-table
              :headers="headers2"
              :search="search2"
              :items="acceptedBy"
              item-key="acceptedBy.email"
            >
              <template #[`item.actions`]="{ item }">
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <v-icon
                      class="mr-2"
                      color="green"
                      v-bind="attrs"
                      v-on="on"
                      @click="acceptsFriend(item)"
                    >
                      mdi-account-multiple-plus
                    </v-icon>
                  </template>
                  <span>Підтвердити</span>
                </v-tooltip>
                <v-tooltip bottom>
                  <template #activator="{ on, attrs }">
                    <v-icon
                      v-bind="attrs"
                      color="red"
                      @click="rejectFriendRequest(item)"
                      v-on="on"
                    >
                      mdi-account-multiple-minus
                    </v-icon>
                  </template>
                  <span>Відхилити</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </v-card>
        </v-tab-item>
        <!-- // TODO добавити відображення настройок тільки на власному профілі, в created провіряти чи профіль є користувача 
        і якщо користуваа то пушити в масив itemsMenu.push('Settings') і відображати це меню а при переході на цей пункт робити запит по АПІ і на бекенді тоже профіряти чи профіль є користувача. -->
        <v-tab-item v-if="$store.state.user.user._id === $route.params.id">
          <v-card flat class="d-flex flex-wrap justify-space-around">
            <h1>Settings page</h1>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-sheet>
  </v-card>
</template>

<script>
import friendList from './User/friend_list.vue';
import postsList from './User/posts_list.vue';
import api from '../plugins/api';

export default {
  components: {
    friendList,
    postsList,
  },
  data: () => ({
    title: `User`,
    userData: {},
    user_posts: [],
    descriptionPost: '',
    delFav: 'Delete user from favorites',
    delFriend: 'Delete user from friends',
    addFav: 'Add user to "favorites"',
    addFriend: 'Add user to friends',
    isFavorited: null,
    isFriend: null,
    acceptedBy: null,
    sentBy: null,
    friendAdded: false,
    friendAddedText: '',
    items: [
      { title: 'Click Me' },
      { title: 'Click Me' },
      { title: 'Click Me' },
    ],
    tab: null,
    itemsMenu: ['Main', 'Friends'],
    length: 5,

    search: '',
    headers: [
      {
        text: 'Email',
        align: 'start',
        filterable: false,
        value: 'acceptedBy.email',
      },
      { text: "Ім'я", value: 'acceptedBy.firstName' },
      { text: 'Прізвище', value: 'acceptedBy.lastName' },
      { text: 'Коли', value: 'createdAt' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],

    search2: '',
    headers2: [
      {
        text: 'Email',
        align: 'start',
        filterable: false,
        value: 'sentBy.email',
      },
      { text: "Ім'я", value: 'sentBy.firstName' },
      { text: 'Прізвище', value: 'sentBy.lastName' },
      { text: 'Коли', value: 'createdAt' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
  }),
  head() {
    return {
      title: this.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: 'user',
          name: 'user',
          content: 'My custom user',
        },
      ],
    };
  },
  async created() {
    if (this.$route.params.id) {
      this.userData = await api
        .getCurrentUser(this.$route.params.id)
        .then((res) => res.data.user);

      this.title = `${this.userData.firstName} ${this.userData.lastName}`;
      this.user_posts = await api
        .getUserPosts(this.$route.params.id)
        .then((res) => res.data.data);
      this.user_posts.reverse();
    }
    if (this.$store.state.user.user && this.$store.state.user.user._id) {
      this.thisUser = await api
        .getCurrentUser(this.$store.state.user.user._id)
        .then((res) => res.data.user);
      this.isFavorited = this.thisUser.favorites.includes(this.userData._id, 0);
    }

    if (
      this.$route.params.id &&
      this.$store.state.user.user &&
      this.$store.state.user.user._id &&
      this.$store.state.user.user._id === this.$route.params.id
    ) {
      this.itemsMenu.push('Requests', 'Sent', 'Settings');
      this.acceptedBy = await api
        .applicationsToFriends(`acceptedBy=${this.$store.state.user.user._id}`)
        .then((data) => data.data.arrayApplicationsToFriends);
      this.sentBy = await api
        .applicationsToFriends(`sentBy=${this.$store.state.user.user._id}`)
        .then((data) => data.data.arrayApplicationsToFriends);
    }
  },
  methods: {
    async addPost() {
      const post = await api.addpost(this.$route.params.id, {
        description: this.descriptionPost,
        whoPosted: this.$store.state.user.user._id,
      });

      this.user_posts.unshift(post.data.data);
      this.descriptionPost = '';
    },

    async addToFavorites() {
      if (this.isFavorited) {
        await api.deleteFromFavorite(this.$route.params.id);
        this.isFavorited = false;
      } else {
        await api.addToFavorite(this.$route.params.id);
        this.isFavorited = true;
      }
    },
    async addToFriends() {
      if (this.isFriend) {
        await api.deleteFriend(this.$route.params.id).catch((error) => {
          if (error.response.status === 404) {
            this.friendAdded = true;
            this.friendAddedText =
              'Користувач ще не прийняв ваше запрошення у друзі.';
          }
        });
        this.isFriend = false;
      } else {
        await api.addToFriends(this.$route.params.id).catch((error) => {
          if (error.response.status === 403) {
            this.friendAdded = true;
            this.friendAddedText = 'Ви уже надіслали заявку користувачу.';
          }
        });
        this.isFriend = true;
      }
    },
    async rejectFriendRequest(user) {
      await api.rejectFriendRequest(user._id);
      this.acceptedBy.splice(
        this.acceptedBy.findIndex((el) => el._id === user._id),
        1
      );
    },
    async acceptsFriend(user) {
      await api.AcceptFriend(user._id);
      this.acceptedBy.splice(
        this.acceptedBy.findIndex((el) => el._id === user._id),
        1
      );
    },
    async cancelFriendRequest(user) {
      await api.cancelFriendRequest(user._id);
      this.sentBy.splice(
        this.sentBy.findIndex((el) => el._id === user._id),
        1
      );
    },
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
