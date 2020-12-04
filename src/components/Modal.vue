<template>
  <teleport to="#modal">
    <div id="center" v-show="isOpen">
      <h2><slot>this is a modal</slot></h2>
      <button @click="buttonClick">Close</button>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    isOpen: Boolean
  },
  emits: {
    "close-modal": null
  },
  setup(props, context) {
    const buttonClick = () => {
      context.emit("close-modal");
    };
    return {
      buttonClick
    };
  }
});
</script>

<style>
#center {
  width: 200px;
  height: 200px;
  border: 2px solid #ddd;
  background-color: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
