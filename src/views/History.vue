<template>
  <b-container fluid>
    <b-row>
      <b-col sm="12">
        <!-----wrap icon navbar-->
        <b-row class="text-center container-nav">
          <div class="nav1">
            <img src="../assets/hamburger.png" alt />
          </div>
          <div class="nav2">History</div>
        </b-row>
        <b-container fluid class="px-0">
          <!-- wrap row-2 start-->
          <b-row class="text-center">
            <!-- wrap side -->
            <b-col sm="1" class="px-0 container-side">
              <div class="side mt-2">
                <router-link to="/">
                  <img src="../assets/fork.png" alt />
                </router-link>
              </div>
              <div class="side">
                <a href="history.html">
                  <img src="../assets/clipboard.png" alt />
                </a>
              </div>
              <div class="side">
                <a href="#add" data-toggle="modal" data-target="#add">
                  <img src="../assets/add.png" alt />
                </a>
              </div>
            </b-col>

            <!-- wrap Main start -->
            <b-col sm="11" class="mt-3">
              <b-row>
                <!-- wrap Card Start -->
                <b-col sm class="container-card">
                  <div class="rect1">
                    <p>Today's Income</p>
                    <h3>Rp.1000.000</h3>
                    <p>+2% Yesterday</p>
                    <div class="decor">
                      <img src="../assets/circle.png" class="circle1" />
                      <img src="../assets/circle.png" class="circle2" />
                      <img src="../assets/circle.png" class="circle3" />
                    </div>
                  </div>
                  <div class="rect2">
                    <p>Orders</p>
                    <h3>3.270</h3>
                    <p>+5% Last Week</p>
                    <div class="decor">
                      <img src="../assets/circle.png" class="circle1" />
                      <img src="../assets/circle.png" class="circle2" />
                      <img src="../assets/circle.png" class="circle3" />
                    </div>
                  </div>
                  <div class="rect3">
                    <p>This Year Income</p>
                    <h4>Rp. {{ yearIncome }}</h4>
                    <p>+10% Last Year</p>
                    <div class="decor">
                      <img src="../assets/circle.png" class="circle1" />
                      <img src="../assets/circle.png" class="circle2" />
                      <img src="../assets/circle.png" class="circle3" />
                    </div>
                  </div>
                </b-col>
                <!-- wrap Card End -->
              </b-row>
              <!-- Revenue start-->
              <b-row>
                <b-col sm="12" class="mt-5">
                  <div class="revenue">
                    <b-row class="p-4">
                      <b-col sm="10" class="text-left">
                        <h3>Revenue</h3>
                      </b-col>
                      <b-col sm="2" class="text-center">
                        <b-dropdown text="Filter By">
                          <b-dropdown-item @click="getHistory()"
                            >Month</b-dropdown-item
                          >
                          <b-dropdown-item @click="getHistoryYear()"
                            >Year</b-dropdown-item
                          >
                        </b-dropdown>
                      </b-col>
                    </b-row>

                    <line-chart
                      v-show="popM"
                      xtitle="Date"
                      ytitle="Total"
                      :data="chartMonth"
                    ></line-chart>
                    <line-chart
                      v-show="popY"
                      xtitle="Month"
                      ytitle="Total"
                      :data="chartYear"
                    ></line-chart>
                  </div>
                </b-col>
              </b-row>
              <!-- Revenue end-->
              <!-- Recent Order start-->
              <b-row class="mt5">
                <b-col xl="12" class="mt-5">
                  <div class="recent">
                    <b-row class="p-4">
                      <b-col sm="10" class="text-left">
                        <h3>Recent Order</h3>
                      </b-col>
                      <b-col sm="2" class="text-center">
                        <div>
                          <b-dropdown
                            id="dropdown-1"
                            text="Select"
                            class="m-md-2"
                          >
                            <b-dropdown-item>Today</b-dropdown-item>
                            <b-dropdown-item>Yesterday</b-dropdown-item>
                          </b-dropdown>
                        </div>
                      </b-col>
                    </b-row>

                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">INVOICE</th>
                          <th scope="col">CASHIER</th>
                          <th scope="col">DATE</th>
                          <th scope="col">ORDERS</th>
                          <th scope="col">AMOUNT</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="(value, index) in recent" :key="index">
                          <!-- <th scope="row">1</th> -->
                          <td>{{ value.invoice }}</td>
                          <td>Pevita Pearce</td>
                          <td>{{ history_created_at }}</td>
                          <td>Ice Tea, Salad with Peanut Sauce</td>
                          <td>{{ value.history_subtotal }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </b-col>
              </b-row>
              <!-- Recent Order end-->
            </b-col>
            <!-- wrap Main end -->
          </b-row>
          <!-- wrap row-2 end-->
        </b-container>
      </b-col>
    </b-row>
    <b-button @click="getHistory()">TESTING</b-button>
  </b-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'history',
  data() {
    return {
      recent: {},
      chartYear: [],
      chartMonth: [],
      popM: true,
      popY: false,
      yearIncome: null
    }
  },
  created() {
    this.getHistory()
  },
  methods: {
    getHistory() {
      this.popM = true
      this.popY = false
      axios
        .get(
          'http://127.0.0.1:3001/history?sort=history_id&limit=5&page=1&ascdsc=DESC'
        )
        .then(response => {
          const month = response.data.pagination.getMonth
          month.map(item => this.chartMonth.push([item.date, item.subtotal]))
          // console.log(response.data.pagination.getYear[0].subtotal)
          this.yearIncome = response.data.pagination.getYear[0].subtotal
          console.log(this.yearIncome)
        })
        .catch(error => {
          console.log(error)
        })
    },
    getHistoryYear() {
      this.popM = false
      this.popY = true
      axios
        .get(
          'http://127.0.0.1:3001/history?sort=history_id&limit=5&page=1&ascdsc=DESC'
        )
        .then(response => {
          const year = response.data.pagination.getYear
          year.map(item => this.chartYear.push([item.month, item.subtotal]))
          console.log(this.chartYear)
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>

<style scoped>
.container-nav {
  width: auto;
  height: 100px;
  display: flex;
  flex-flow: row wrap;
  font-size: 30px;
  font-family: 'Montaga', serif, sans-serif;
  text-align: center;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
}

.nav1 {
  padding: 5px;
  margin: auto;
  flex: 1;
}

.nav2 {
  margin: auto;
  flex: 11;
}

.nav2 a {
  color: black;
  text-decoration: none;
}

.nav2 a:hover {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.container-side {
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: row wrap;
  background: #ffffff;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.25);
  align-content: flex-start;
}

.side {
  margin: auto;
  padding: 15px;
  flex: 1;
}

.container-card {
  height: auto;
  display: flex;
  flex-flow: row wrap;
  align-content: center;
  font-family: 'Montaga', serif, sans-serif;
  text-align: left;
}

.rect1 {
  margin: 4px;
  padding: 20px;

  min-width: 200px;
  max-height: 213px;
  flex: 1;
  background: linear-gradient(
    278.29deg,
    #fbb2b4 30.05%,
    rgba(255, 143, 178, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(255, 143, 178, 0.25));
  border-radius: 10px;
}

.rect2 {
  margin: 4px;
  padding: 20px;

  min-width: 200px;
  max-height: 213px;
  flex: 1;
  background: linear-gradient(
    278.29deg,
    #29dfff 30.05%,
    rgba(41, 223, 255, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(41, 223, 255, 0.25));
  border-radius: 10px;
}

.rect3 {
  margin: 4px;
  padding: 20px;

  min-width: 200px;
  max-height: 213px;
  flex: 1;
  background: linear-gradient(
    278.29deg,
    #ab84c8 30.05%,
    rgba(241, 201, 236, 0) 133.19%
  );
  filter: drop-shadow(10px 15px 10px rgba(241, 201, 236, 0.25));
  border-radius: 10px;
}

.decor {
  position: absolute;
  width: 178px;
  height: 141px;
  left: 50%;
  top: 0px;
}

.circle1 {
  width: 75px;
  position: relative;
  top: 30%;
}

.circle2 {
  width: 75px;
  position: relative;
  top: 10%;
  right: 30%;
}

.circle3 {
  width: 75px;
  position: relative;
  top: -5%;
  right: 10%;
}

img {
  width: auto;
}

.revenue {
  min-width: auto;
  height: auto;

  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

.recent {
  height: auto;
  background: #ffffff;
  box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
}

table {
  width: 100%;
}
</style>
