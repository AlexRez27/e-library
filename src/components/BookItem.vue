<template>
  <div>
    <div class="collection list">
      <a class="collection-item">
        <img :src="book.url" :alt="book.title" />
        <h5>{{ book.title }}</h5>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BookItem',
  props: {
    book: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &__item {
    text-align: center;
  }
  & a {
    text-align: center;
    width: 100%;
  }
}
</style>
