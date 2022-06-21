<template>
  <div class="list row">
    <div class="col-md-6">
      <h4>Orders List</h4>
      <ul class="list-group">
        <li
            class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(order, index) in orders"
            :key="index"
            @click="setActiveOrder(order, index)"
        >
          {{ order.shopName }} - {{ order.orderAmount }} €
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllOrders">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentOrder">
        <order-details
            :order="currentOrder"
            @refreshList="refreshList"
        />
      </div>
      <div v-else>
        <br/>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";
import OrderDetails from "./Order";

export default {
  name: "orders-list",
  components: {OrderDetails},
  data() {
    return {
      orders: [],
      currentOrder: null,
      currentIndex: -1
    };
  },
  methods: {
    onDataChange(items) {
      let _orders = [];

      items.forEach((item) => {
        let key = item.key;
        let data = item.val();
        _orders.push({
          key: key,
          shopName: data.shopName,
          orderAmount: data.orderAmount,
          published: data.published,
        });
      });

      this.orders = _orders;
    },

    refreshList() {
      this.currentOrder = null;
      this.currentIndex = -1;
    },

    setActiveOrder(order, index) {
      this.currentOrder = order;
      this.currentIndex = index;
    },

    removeAllOrders() {
      DataService.deleteAll()
          .then(() => {
            this.refreshList();
          })
          .catch((e) => {
            console.log(e);
          });
    },
  },
  mounted() {
    DataService.getAll().on("value", this.onDataChange);
  },
  beforeDestroy() {
    DataService.getAll().off("value", this.onDataChange);
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
