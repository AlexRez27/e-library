<template>
<div>
  <button @click="prevPage" :disabled="pageNumber === 0">
    Previous
  </button>
  <button @click="nextPage" :disabled="pageNumber >= pageCount - 1" >
    Next
  </button>
</div>
</template>

<script>
export default {
  name: 'Pagination',
  data() {
    return { pageNumber: 0 };
  },
  props: {
    listData: {
      type: Array,
      required: true,
    },
    totalpages: {
      type: Number,
      required: true,
    },
    size: {
      type: Number,
      required: false,
      default: 5,
    },
  },
  methods: {
    changePage() {
      const l = this.totalpages;
      const s = this.size;
      console.log(Math.ceil(l / s));
      this.$emit('get-data',
        {
          contentTypeUid: 'book',
          referencedFieldPath: '',
          limit: this.size,
          skip: this.pageNumber * this.size,
        });
    },
    nextPage() {
      this.pageNumber += 1;
      this.changePage();
      // console.log('pageNumber:', this.pageNumber);
    },
    prevPage() {
      this.pageNumber -= 1;
      this.changePage();
    },
  },

  computed: {
    pageCount() {
      const l = this.totalpages;
      const s = this.size;
      console.log(Math.ceil(l, s, l / s));
      return Math.ceil(l / s);
    },
  },
};
</script>

<style scoped>
button{
  width:100px;
  height:40px;
  background-color:#eef;
}

button:hover{
  cursor:pointer;
}
button:hover:disabled{
  cursor:not-allowed;
}
</style>
