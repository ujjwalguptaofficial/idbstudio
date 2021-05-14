<template>
  <div class="row content-center">
    <div class="row col-md-6">
      <v-text-field v-model="name" label="Db Name" solo></v-text-field>
      <v-text-field
        style="margin-left: 10px"
        label="version"
        type="number"
        solo
        v-model="version"
      ></v-text-field>
      <v-btn color="info" @click="openDb">OpenDb</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      temp: true,
      name: "",
      version: 1,
    };
  },
  methods: {
    openDb() {
      this.$emit("selectDb", {
        name: this.name,
        version: this.version,
      });
    },
  },
};
</script>

<style>
</style>