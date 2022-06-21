<template>
  <div v-if="currentOrder" class="edit-form">
    <h4>Order</h4>
    <form>
      <div class="form-group">
        <label for="title">Title</label>
        <input
            type="text"
            class="form-control"
            id="title"
            v-model="currentOrder.shopName"
        />
      </div>

      <div class="form-group">
        <label for="description">Order Amount</label>
        <input
            type="text"
            class="form-control"
            id="description"
            v-model="currentOrder.orderAmount"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentOrder.published ? "Published" : "Pending" }}
      </div>
    </form>

    <button
        class="badge badge-primary mr-2"
        v-if="currentOrder.published"
        @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
        v-else
        class="badge badge-primary mr-2"
        @click="updatePublished(true)"
    >
      Publish
    </button>

    <button class="badge badge-danger mr-2" @click="deleteOrder">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateOrder">
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br/>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "order",
  props: ["order"],
  data() {
    return {
      currentOrder: null,
      message: "",
    };
  },
  watch: {
    order: function (order) {
      this.currentOrder = {...order};
      this.message = "";
    },
  },
  methods: {
    updatePublished(status) {
      DataService.update(this.currentOrder.key, {
        published: status,
      })
          .then(() => {
            this.currentOrder.published = status;
            this.message = "The status was updated successfully!";
          })
          .catch((e) => {
            console.log(e);
          });
    },

    updateOrder() {
      const data = {
        title: this.currentOrder.title,
        description: this.currentOrder.description,
      };

      DataService.update(this.currentOrder.key, data)
          .then(() => {
            this.message = "The order was updated successfully!";
          })
          .catch((e) => {
            console.log(e);
          });
    },

    deleteOrder() {
      DataService.delete(this.currentOrder.key)
          .then(() => {
            this.$emit("refreshList");
          })
          .catch((e) => {
            console.log(e);
          });
    },
  },
  mounted() {
    this.message = "";
    this.currentOrder = {...this.order}
  },
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
