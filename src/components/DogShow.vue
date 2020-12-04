<template>
  <div>
    {{ reslut.message }}
    <img :src="result && reslut.message" alt="" />
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { defineComponent } from "vue";

export default defineComponent({
  async setup() {
    const { data } = await axios.get("https://dog.ceo/api/breeds/image/random");
    return {
      reslut: data
    };
  }
});
</script>

<style></style>
