<template>
  <div>
    <img alt="Vue logo" src="./assets/logo.png" />
    <h1>{{ count }}</h1>
    <h1>{{ double }}</h1>
    <Suspense>
      <template #default>
        <div>
          <async-show></async-show>
          <dog-show />
        </div>
      </template>
      <template #fallback>
        <h1>Loading...</h1>
      </template>
    </Suspense>
    <ul>
      <li v-for="number in numbers" :key="number">
        <h1>{{ number }}</h1>
      </li>
    </ul>
    <h1>{{ person.name }}</h1>
    <h1 v-if="loading">Loading!...</h1>
    <img v-if="loaded" :src="result[0].url" alt="" />
    <h1>X:{{ x }} Y: {{ y }}</h1>
    <button @click="increase">点击+1</button>
    <h1>{{ greetings }}</h1>
    <button @click="updateGreeting">update</button>
    <button @click="openModal">打开弹窗</button>
    <Modal :isOpen="modalIsOpen" @close-modal="onModalClose"
      >My Modal !!!</Modal
    >
  </div>
</template>

<script lang="ts">
import {
  ref,
  defineComponent,
  computed,
  reactive,
  toRefs,
  // onMounted,
  onUpdated,
  // onUnmounted,
  watch
  // onErrorCaptured
} from "vue";
import useMousePosition from "./hooks/useMousePosition";
import useURLLoader from "./hooks/useURLLoader";
import Modal from "./components/Modal.vue";
import AsyncShow from "./components/AsyncShow.vue";
import DogShow from "./components/DogShow.vue";
interface DataProps {
  count: number;
  double: number;
  increase: () => void;
  numbers: number[];
  person: { name?: string };
}
interface DogResult {
  message: string;
  status: string;
}
interface CatResult {
  id: string;
  url: string;
  width: number;
  height: number;
}
export default defineComponent({
  name: "App",
  components: {
    Modal,
    AsyncShow,
    DogShow
  },
  setup() {
    onUpdated(() => {
      console.log("updated");
    });
    const greetings = ref("");
    const updateGreeting = () => {
      greetings.value += "hello! ";
    };

    const data: DataProps = reactive({
      count: 0,
      increase: () => data.count++,
      double: computed(() => data.count * 2),
      numbers: [0, 1, 2],
      person: {}
    });
    const { x, y } = useMousePosition();
    // const { result, loading, loaded, error } = useURLLoader<DogResult>(
    //   "https://dog.ceo/api/breeds/image/random"
    // );
    const { result, loading, loaded, error } = useURLLoader<CatResult[]>(
      "https://api.thecatapi.com/v1/images/search?limit=1"
    );
    watch(result, () => {
      if (result.value) {
        console.log("value:", result.value);
      }
    });
    data.numbers[0] = 5;
    data.person.name = "Yuyd";

    watch([greetings, () => data.count], (newValue, oldValue) => {
      console.log({ newValue, oldValue });
      document.title = "updated" + greetings.value + data.count;
    });
    const refData = toRefs(data);
    const modalIsOpen = ref(false);
    const openModal = () => {
      modalIsOpen.value = true;
    };
    const onModalClose = () => {
      modalIsOpen.value = false;
    };
    // const error = ref(null);
    // onErrorCaptured((e: any) => {
    //   console.log("err:", e);
    //   error.value = e;
    // });
    return {
      ...refData,
      updateGreeting,
      greetings,
      x,
      y,
      result,
      loading,
      loaded,
      error,
      modalIsOpen,
      openModal,
      onModalClose
    };
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
