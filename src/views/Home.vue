<template>
  <div class="home">
    <b-container fluid>
      <b-row>
        <b-col cols="12" lg="8" class="home-header">
          <b-row>
            <b-col cols="2" class="header-icon">
              <img
                src="@/assets/img/menu.png"
                alt="toggle-menu"
                v-b-toggle.sidebar-backdrop
              />
            </b-col>
            <b-col cols="8" class="header-text">
              <h1>Menu</h1>
            </b-col>
            <b-col cols="2" class="header-icon"></b-col>
          </b-row>
        </b-col>

        <b-col cols="12" lg="4" class="cart-header">
          <h2>
            Cart
            <b-badge>{{ cart }}</b-badge>
          </h2>
        </b-col>
      </b-row>

      <b-row>
        <b-col cols="12" lg="8" class="container-menu">
          <b-row class="menu-row">
            <b-col
              cols="12"
              lg="4"
              md="6"
              v-for="(value, index) in product"
              :key="index"
              class="product-list"
            >
              <b-img :src="img" fluid />
              <p>{{ value.product_name }}</p>
              <p>
                <strong>
                  Rp.
                  {{
                    value.product_price
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
                  }}
                </strong>
              </p>
              <b-button>Add to cart</b-button>
            </b-col>

            <div class="mt-3"></div>
          </b-row>
        </b-col>

        <b-col cols="12" lg="4" class="cart-list-empty">
          <img src="@/assets/img/empty-cart.png" alt />
          <p>
            Your cart is empty
            <br />
            <span class="text-muted">Please add some items from the menu</span>
          </p>
        </b-col>
      </b-row>

      <b-sidebar
        id="sidebar-backdrop"
        :title="msg"
        backdrop-variant="dark"
        backdrop
        shadow
      >
        <Sidebar />
      </b-sidebar>
    </b-container>
  </div>
</template>

<style scoped src="@/assets/css/style.css"></style>
