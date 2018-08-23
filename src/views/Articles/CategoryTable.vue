<template>
  <b-table :data="data"
           hoverable>
    <template slot-scope="props">
      <b-table-column field="id" label="ID" width="40" numeric>
      <div class="hover" @mouseleave="mouseOut()" @mouseenter="mouseIn(props.row.data)">{{ props.row.id }}</div>
      </b-table-column>
      <b-table-column field="name" label="NOM" width="40">
        <div class="hover" @mouseleave="mouseOut()" @mouseenter="mouseIn(props.row.data)">{{ props.row.name }}</div>
      </b-table-column>
      <b-table-column field="description" label="DESCRIPTION" width="40">
        <div class="hover" @mouseleave="mouseOut()" @mouseenter="mouseIn(props.row.data)">{{ props.row.description }}</div>
      </b-table-column>
      <b-table-column field="price" label="Prix" width="40" numeric>
        <div class="hover" @mouseleave="mouseOut()" @mouseenter="mouseIn(props.row.data)">{{ props.row.price }}</div>
      </b-table-column>
    </template>

  </b-table>
</template>

<script>
  import CategoriesStore from '../../components/Edit/Articles/CategoriesStore';

  export default {
    name: "CategoryTable",
    props: {
      category: {type: Object}
    },
    data: () => ({
      data: [],
      columns: [
        {field: 'data'},
        {field: 'id', label: 'ID', width: '40', numeric: true},
        {field: 'name', label: 'Article',},
        {field: 'description', label: 'Description',},
        {field: 'price', label: 'Prix', centered: true},
      ]
    }),
    methods: {
      mouseIn(data) {
        CategoriesStore.state.selectedArticle = data.image;
      },
      mouseOut() {
        CategoriesStore.state.selectedArticle = null
      },
      tableData() {
        this.category.articles.forEach(i => {
          this.data.push({
            data: i,
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

  .hover {
    padding: 5px;
    height: 100%;
    width: 100%;
    /*background-color: #45a875;*/
  }
</style>
