<template>
  <v-hover>
    <template #default="{ hover }">
      <v-card max-width="310" class="mx-auto ma-3" :elevation="hover ? 24 : 6">
        <v-img
          src="https://cdn.vuetifyjs.com/images/lists/ali.png"
          height="200px"
          dark
        >
          <v-row class="fill-height">
            <v-card-title>
              <v-btn dark icon>
                <v-icon>mdi-chevron-left</v-icon>
              </v-btn>

              <v-spacer></v-spacer>

              <v-btn dark icon class="mr-4">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>

              <v-btn dark icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-card-title>
            <v-spacer></v-spacer>

            <v-card-title class="white--text pl-12 pt-12">
              <div class="text-h4 pl-12 pt-12">
                <!-- {{ friend.firstName }} {{ friend.lastName }} -->
              </div>
            </v-card-title>
          </v-row>
        </v-img>

        <v-list-item>
          <v-list-item-icon>
            <v-icon color="indigo"> mdi-card-account-details-outline </v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>
              {{ friend.firstName }} {{ friend.lastName }}
            </v-list-item-title>
            <v-list-item-subtitle
              >Created: {{ friend.createdAt | normalizeDate }}
            </v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-icon v-if="friend.gender === 'Male'">mdi-human-male</v-icon>
            <v-icon v-else-if="friend.gender === 'Female'">
              mdi-human-female
            </v-icon>
          </v-list-item-action>
        </v-list-item>
        <v-list two-line>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-phone </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ friend.phone }}</v-list-item-title>
              <v-list-item-subtitle>Mobile</v-list-item-subtitle>
            </v-list-item-content>

            <v-list-item-icon>
              <v-icon>mdi-message-text</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-divider inset></v-divider>

          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-email </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ friend.email }}</v-list-item-title>
              <v-list-item-subtitle>Personal</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-divider inset></v-divider>
          <v-list-item>
            <v-list-item-icon>
              <v-icon color="indigo"> mdi-map-marker </v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{
                friend.age | formatDate
              }}</v-list-item-title>
              <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-card>
    </template>
  </v-hover>
</template>

<script>
export default {
  props: ['friend'],
};
</script>