<template>
  <div class="container" v-if="results">
    <ul class="grid">
      <li v-for="({id, snippet : { title }, contentDetails: {duration}}, i) of results" :key="i">
        <article-item :id="id" :title="title.substring(0, 40)" :duration="duration" />
      </li>
    </ul>
  </div>
  <div key="empty" class="container loader" v-else-if="results && results.length < 1">
      Aucune vidéo disponible.
  </div>
  <loader v-else />
</template>

<script>
import Article from '@/components/Article';
import Loader from '@/components/Loader';

export default {
  components: {
    'article-item': Article,
    Loader,
  },
  data() {
    return {
      results: null,
    };
  },
  async mounted() {
    if (this.$route.params.query) {
      this.results = await this.getVideosByQuery(this.$route.params.query);
    }
  },
};
</script>

<style>

</style>
