<template>
<div>
    <table class="highlight">
      <thead>
        <tr>
            <th>Image</th>
            <th>title</th>
            <th>Description</th>
            <th>Author</th>
            <th>Number of pages</th>
            <th>Link to Amazon</th>
        </tr>
      </thead>

    <tbody>
      <tr v-for="book of books" :key="book.title">
        <td>
          <img :src="`${book.cover_image.url}/?width=100&height=150`" :alt="book.cover_image.title">
        </td>
        <td>{{ book.title }} </td>
        <td>{{ book.description }} </td>
        <td>{{ book.author }} </td>
        <td>{{ book.number_of_pages }} </td>
        <td>
          <a :href="book.link_on_amazon.href" target="_blank">
            {{ book.link_on_amazon.title }}
          </a>
        </td>
      </tr>
    </tbody>
  </table>

<Pagination :list-data="books" @get-data="getData" :size="pageSize" :totalpages="totalPages"/>

</div>

</template>

<script>
import Pagination from '@/components/Pagination.vue';
import Stack from '../plugins/contentstack';

export default {
  name: 'BookList',
  components: {
  // ...
    // eslint-disable-next-line vue/no-unused-components
    Pagination,
  },
  data() {
    return {
      books: [],
      pageSize: 2,
      totalPages: 0,
    };
  },
  mounted() {
    this.getData({
      contentTypeUid: 'book',
      referencedFieldPath: '',
      limit: this.pageSize,
      skip: 0,
    });
  },
  methods: {
    async getData(params) {
      const response = await Stack.getEntries(params);
      [this.books, this.totalPages] = [...response];
    },
  },
};
</script>

<style>

</style>
