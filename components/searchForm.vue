<template>
  <section>
    <v-autocomplete
      v-model="select"
      :loading="loading"
      :items="people"
      :search-input.sync="search"
      :item-text="(item) => `${item.lastName} ${item.firstName}`"
      item-value="_id"
      suffix="lastName"
      cache-items
      class="mx-4"
      auto-select-first
      hide-no-data
      label="Search users?"
      clearable
    >
    </v-autocomplete>
  </section>
</template>

<script>
import debounce from 'lodash/debounce';
import api from '../plugins/api';

export default {
  data() {
    return {
      loading: false,
      people: [],
      search: null,
      select: null,
    };
  },
  watch: {
    search(val) {
      val && val !== this.select && this.querySelections(val);
    },
  },
  methods: {
    //  onClick(user) {
    //    this.$router.push(`/user/${user._id}`);
    //  },
    querySelections: debounce(function (name) {
      this.loading = true;
      // String update
      if (this.name !== name) {
        this.name = name;
        this.data = [];
      }
      // String cleared
      if (!name.length) {
        this.data = [];
        return;
      }
      api
        .search(name)
        .then(({ data }) => {
          this.people = data.users;
          console.log(this.people);
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          this.loading = false;
        });
    }, 500),
  },
};
</script>
