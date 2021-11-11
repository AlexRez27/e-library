<template>
  <div class="home">
    <h1>E-library App</h1>
    <BookList />
  </div>
</template>

<script>
import BookList from '@/components/BookList.vue';

export default {
  components: {
    BookList,
  },
};
</script>
