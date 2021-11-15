<template>
  <div class="bookpage">
    <div class="poster">
      <Loader v-if="loading" />
      <img
        v-else
        height="600"
        width="500"
        :src="poster.url"
        :alt="poster.title"
      />
    </div>
    <div class="info">
      <h5>{{ book.title }}</h5>
      <span> {{ book.number_of_pages }} pages </span>
      <p class="flow-text">{{ book.description_new }}</p>
    </div>
    <button @click="toHomePage" class="waves-effect waves-light btn-large">
      Home
    </button>
  </div>
</template>

<script>
import Stack from '../plugins/contentstack';

export default {
  name: 'Book',
  data() {
    return {
      poster: {},
      book: {},
      loading: true,
    };
  },
  async mounted() {
    this.book = await Stack.getEntrie('book', this.$route.params.title); // get single book entrie
    this.poster = await Stack.getAsset(this.book.cover_image.uid); // get poster photo
    this.loading = false;
  },
  methods: {
    // back to home page function.
    // Passing limit and skip properties in order to come back to
    // the same pagination number page
    toHomePage() {
      const parameters = {
        limit: +this.$route.params.limit,
        skip: +this.$route.params.skip,
      };
      this.$router.push({ name: 'Home', params: parameters });
    },
  },
};
</script>

<style scoped>
.bookpage {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 20px;
}
</style>
