<template>
  <section class="select">
    <v-row class="pa-4" justify="space-between">
      <v-col cols="6">
        <v-treeview
          :active.sync="active"
          :items="items"
          :load-children="fetchUsers"
          :open.sync="open"
          activatable
          color="warning"
          open-on-click
          transition
        >
          <template #prepend="{ item }">
            <v-icon v-if="!item.children"> mdi-account </v-icon>
          </template>
        </v-treeview>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col class="d-flex text-center" cols="6">
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!selected"
            class="text-h6 grey--text text--lighten-1 font-weight-light"
            style="align-self: center"
          >
            Select a User
          </div>
          <v-card
            v-else
            :key="selected._id"
            class="pt-6 mx-auto"
            flat
            max-width="400"
          >
            <v-card-text>
              <v-avatar v-if="avatar" size="88">
                <v-img
                  :src="`https://avataaars.io/${avatar}`"
                  class="mb-6"
                ></v-img>
              </v-avatar>
              <div class="blue--text subheading font-weight-bold">
                {{ selected.firstName }}
              </div>
              <h3 class="text-h5 mb-2">
                {{ selected.lastName }}
              </h3>
              <div class="blue--text mb-2">
                {{ selected.email }}
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-row class="text-left" tag="v-card-text">
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                Gender:
              </v-col>
              <v-col>{{ selected.gender }}</v-col>
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                Created:
              </v-col>
              <v-col>
                {{ selected.createdAt | formatDate }}
              </v-col>
              <v-col class="text-right mr-4 mb-2" tag="strong" cols="5">
                Phone:
              </v-col>
              <v-col>{{ selected.phone }}</v-col>
            </v-row>
          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>
  </section>
</template>

<script>
const avatars = [
  '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
  '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly',
];

export default {
  props: ['friends'],
  data: () => ({
    active: [],
    avatar: null,
    open: [],
    users: [],
  }),
  computed: {
    items() {
      return [
        {
          name: 'Friends',
          children: this.users,
        },
      ];
    },
    selected() {
      if (!this.active.length) return undefined;

      const id = this.active[0];

      return this.users.find((user) => user.id === id);
    },
  },

  watch: {
    selected: 'randomAvatar',
  },

  methods: {
    fetchUsers(item) {
      return item.children.push(...this.friends);
    },
    randomAvatar() {
      this.avatar = this.selected.gender === 'Female' ? avatars[1] : avatars[0];
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  min-width: 90%;
}
</style>