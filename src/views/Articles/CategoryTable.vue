<template>
  <b-table :data="data" :columns="columns"></b-table>
</template>

<script>
  export default {
    name: "CategoryTable",
    props: {
      category: {type: Object}
    },
    data: () => ({
      data: [],
      columns: [
        {field: 'id', label: 'ID', width: '40', numeric: true},
        {field: 'name', label: 'Article',},
        {field: 'description', label: 'Description',},
        {field: 'price', label: 'Prix', centered: true},
      ]
    }),
    methods: {
      tableData() {
        this.category.articles.forEach(i => {
          this.data.push({
            id: i.id,
            name: i.name.data,
            description: i.description.data,
            price: i.price.data
          });
        });
      }
    },
    mounted() {
      this.tableData();
    }
  };
</script>

<style scoped>

</style>
