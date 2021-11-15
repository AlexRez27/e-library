<template>
  <div class="home">
    <h1>E-library App</h1>
      <BookItem
        class="bookitem"
        @click.prevent="toSingleBook({ title: book.title, limit, skip })"
        v-for="book of all_book_list.items"
        :key="book.title"
        :book="{
          title: book.title,
          url: book.posterConnection.edges[0].node.url,
          urlTitle: book.posterConnection.edges[0].node.title,
        }"
      />
    <Pagination
      @get-data="getData"
      :size="limit"
      :totalpages="all_book_list.total"
      :initialPageNumber="skip / limit"
    />
  </div>
</template>

<script>
import gql from 'graphql-tag';
import BookItem from '@/components/BookItem.vue';
import Pagination from '@/components/Pagination.vue';

export default {
  components: {
    BookItem,
    Pagination,
  },
  data() {
    return {
      // Default values for graphql
      all_book_list: {
        items: [
          {
            title: '',
            posterConnection: {
              edges: [
                {
                  node: {
                    url: null,
                  },
                },
              ],
            },
          },
        ],
        total: 0,
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
      await this.$apollo.queries.all_book_list.refetch(params);
    },
    // go to book lending page
    toSingleBook(param) {
      this.$router.push({ name: 'Book', params: param });
    },
  },
  // apollo graphql query
  apollo: {
    all_book_list: {
      query: gql`
        query all_book_list($limit: Int!, $skip: Int!) {
          all_book_list(limit: $limit, skip: $skip) {
            total
            items {
              title
              posterConnection {
                edges {
                  node {
                    title
                    url(transform: { height: "150", width: "100" })
                  }
                }
              }
              system {
                uid
              }
            }
          }
        }
      `,
      // variables function to make skip and limit reactive
      variables() {
        return {
          limit: this.limit,
          skip: this.skip,
        };
      },
    },
  },
};
</script>

<style>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bookitem {
  width: 100%;
}
</style>
