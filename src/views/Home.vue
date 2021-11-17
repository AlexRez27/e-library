<template>
  <div class="home">
    <div
      class="home__banner"
      :style="{
        backgroundImage: `url('${getBanner().url}?auto=webp ')`,
      }"
    >
      <h1 class="home__title">{{ all_home.items[0].title }}</h1>
    </div>
    <BookItem
      class="home__bookitem"
      @click.prevent="toSingleBook({ uid: book.system.uid, limit, skip })"
      v-for="book of all_book.items"
      :key="book.title"
      :book="getBook(book)"
    />
    <Pagination
      @get-data="getData"
      :size="limit"
      :totalpages="all_book.total"
      :initialPageNumber="skip / limit"
    />
  </div>
</template>

<script>
import { ALL_BOOK, ALL_HOME } from '@/apollo/queries';
import BookItem from '@/components/BookItem.vue';
import Pagination from '@/components/Pagination.vue';
import { getImage, getBookInfo } from '@/common';

export default {
  components: {
    BookItem,
    Pagination,
  },
  data() {
    return {
      // Default values for graphql
      all_book: {
        items: [
          {
            title: '',
            cover_imageConnection: {
              edges: [
                {
                  node: {
                    url: null,
                    title: '',
                  },
                },
              ],
            },
          },
        ],
        total: 0,
      },
      all_home: {
        items: [
          {
            title: '',
            hero_bannerConnection: {
              edges: [
                {
                  node: {
                    title: '',
                    url: '',
                  },
                },
              ],
            },
          },
        ],
      },
      // take limit and skip parameters from router, if not, then 3 and 0
      limit: +this.$route.params.limit || 3,
      skip: +this.$route.params.skip || 0,
    };
  },
  // if home page loaded after visiting book lending page,
  // then mount home page from the same pagination page
  async mounted() {
    if (this.$route.params.limit) {
      await this.getData({
        limit: this.limit,
        skip: this.skip,
      });
    }
  },
  methods: {
    // function for passing graphql query to pagination component
    // and for updating skip and limit properties from pagination component
    async getData(params) {
      this.limit = params.limit;
      this.skip = params.skip;
      await this.$apollo.queries.all_book.refetch(params);
    },
    // go to book lending page
    toSingleBook(param) {
      this.$router.push({ name: 'Book', params: param });
    },
    getBook(obj) {
      return getBookInfo(obj);
    },
    getBanner() {
      return getImage(this.all_home.items[0].hero_bannerConnection);
    },
  },
  // apollo graphql query
  apollo: {
    all_book: {
      query: ALL_BOOK,
      // variables function to make skip and limit reactive
      variables() {
        return {
          limit: this.limit,
          skip: this.skip,
        };
      },
    },
    all_home: {
      query: ALL_HOME,
    },
  },
};
</script>

<style lang='scss' scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  &__title {
    color: #fff;
  }
  &__banner {
    height: 200px;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  &__bookitem {
    width: 100%;
  }
}
</style>
