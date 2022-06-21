<template>
  <div>
    <div class="col-md-12">
      <ul class="list-group d-none">
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
    <GmapMap
        :center="{lat:46.793048, lng:7.942120}"
        :zoom="9"
        :clickable="true"
        :draggable="true"
        :options="options"
        map-type-id="roadmap"
        style="width: 100%; height: 750px"
    >
      <GmapMarker
          :key="index"
          v-for="(order, index) in orders"
          :position="{lat: order.locationLat, lng: order.locationLng}"
          :icon=order.shopIcon
          :clickable="true"
          :draggable="true"
          @click="center=order.position"
      />
    </GmapMap>
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
      currentIndex: -1,
      options: {
        styles: [
          {
            featureType: "poi.business",
            stylers: [{visibility: "off"}],
          },
          {
            featureType: "transit",
            stylers: [{visibility: "off"}],
          },
          {
            'featureType': 'poi',
            'stylers': [{'visibility': 'off'}]
          },
          {
            'featureType': 'road',
            'stylers': [{'visibility': 'off'}]
          },
          {
            'featureType': 'transit',
            'stylers': [{'visibility': 'off'}]
          },
          {
            'featureType': 'landscape.natural',
            'stylers': [{'visibility': 'off'}]
          },
          {
            'featureType': 'administrative.country',
            'stylers': [{'color': '#efefef', 'visibility': 'off'}]
          },
          {
            "featureType": "administrative.country",
            "elementType": "geometry.stroke",
            "stylers": [
              {
                "color": "#426748"
              },
              {
                "visibility": "on"
              },
              {
                "weight": 3
              }
            ]
          },
        ],
      },

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
          locationLat: data.locationLat,
          locationLng: data.locationLng,
          shopIcon: data.shopIcon
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
