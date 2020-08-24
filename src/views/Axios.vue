<template>
  <div class="axios">
    <h1>Axios Page</h1>
    <b-container>
      <form v-on:submit.prevent="addProduct">
        <input
          type="text"
          v-model="form.product_name"
          placeholder="Product Name"
        /><br />
        <input
          type="text"
          v-model="form.product_price"
          placeholder="Product Harga"
        /><br />
        <input
          type="text"
          v-model="form.product_category_id"
          placeholder="Category ID"
        /><br />
        <input
          type="text"
          v-model="form.product_status"
          placeholder="Product Status"
        /><br />
        <button type="submit">Save</button>
      </form>
    </b-container>
    <hr />
    <b-container class="bv-example-row">
      <b-row>
        <b-col cols="4" v-for="(item, index) in products" :key="index">
          <b-card
            v-bind:title="item.product_name"
            img-src="https://picsum.photos/600/300/?image=25"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 20rem;"
            class="mb-2"
          >
            <b-card-text>{{ item.product_price }}</b-card-text>
            <b-button variant="primary" @click="addToCart(item)"
              >Add To Cart</b-button
            >
            <b-button variant="success" @click="updateProduct()"
              >Update</b-button
            >
            <b-button variant="danger" @click="deleteProduct(item)"
              >Delete</b-button
            >
          </b-card>
        </b-col>
      </b-row>
    </b-container>

    <Card nama="Kopi" harga="2000" @increment="incrementCount" />
    <Card nama="Susu" harga="3000" />
    <p>{{ count }}</p>
  </div>
</template>
<script>
import axios from 'axios'
import Card from '../components/_base/Card'

export default {
  name: 'Axios',
  components: {
    Card
  },
  data() {
    return {
      count: 0,
      cart: [],
      page: 1,
      limit: 3,
      sort: '',
      products: [],
      form: {
        category_id: '',
        product_name: '',
        product_price: '',
        product_status: ''
      }
    }
  },
  created() {
    this.get_product()
  },
  methods: {
    incrementCount(data) {
      this.count += data
    },
    addToCart(data) {
      const setCart = {
        product_id: data.product_id,
        qty: 1
      }
      // spread operator
      this.cart = [...this.cart, setCart]
      console.log(this.cart)
    },
    get_product() {
      axios
        .get(
          `http://127.0.0.1:3001/product?page=${this.page}&limit=${this.limit}`
        )
        .then(response => {
          this.products = response.data.data
          console.log(this.products)
        })
        .catch(error => {
          console.log(error)
        })
    },
    addProduct() {
      console.log(this.form)
      axios
        .post('http://127.0.0.1:3001/product', this.form)
        .then(response => {
          this.products = response.data.data
          console.log(this.products)
        })
        .catch(error => {
          console.log(error)
        })
    },
    deleteProduct(data) {
      console.log(data.product_id)
    }
  }
}
</script>
