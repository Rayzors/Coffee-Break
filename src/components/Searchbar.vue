<template>
  <div class="searchbar" >
    <input type="search" v-model="query" @keyup.enter="search" placeholder="Rechercher une vidéo...">
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: '',
    };
  },
  mounted() {
    this.query = this.$route.params.query || this.query;
  },
  watch: {
    $route(val) {
      if (val.path === '/') {
        this.query = '';
      } else if (val.path.includes('/search/') || val.path.includes('/category/')) {
        this.query = val.params.query;
      }
    },
  },
  methods: {
    search() {
      const isQueryValid = !!this.query && this.query.trim();

      if (isQueryValid) {
        this.$router.push(`/search/${this.query}`);
      }
    },
  },
};
</script>

<style>

</style>
