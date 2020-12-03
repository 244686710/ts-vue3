import {
  // ref,
  onMounted,
  onUnmounted,
  reactive,
  toRefs
} from "vue";
function useMousePosition() {
  // const x = ref(0);
  // const y = ref(0);
  const data = reactive({
    x: 0,
    y: 0,
    updateMouse: (e: MouseEvent) => {
      data.x = e.pageX;
      data.y = e.pageY;
    }
  });
  // const updateMouse = (e: MouseEvent) => {
  //   x.value = e.pageX;
  //   y.value = e.pageY;
  // };
  onMounted(() => {
    console.log("mounted");
    document.addEventListener("click", data.updateMouse);
  });
  onUnmounted(() => {
    document.removeEventListener("click", data.updateMouse);
  });
  const refData = toRefs(data);
  return { x: refData.x, y: refData.y };
}

export default useMousePosition;
