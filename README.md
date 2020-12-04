# vue3-basic

## Project setup

```
yarn install
```

### Compiles and hot-reloads for development

```
yarn serve
```

### Compiles and minifies for production

```
yarn build
```

### Lints and fixes files

```
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### mapping vue2 to vue3

- beforeCreate -> use setup()
- created -> use setup()
- beforeMount -> onBeforeMount
- mounted -> onMounted
- beforeUpdate -> onBeforeUpdate
- updated -> onUpdated
- beforeDestory -> onBeforeUnmount
- destoryed -> onUnmounted
- activated -> onActivated
- deactivated -> onDeactivated

- errorCaptured -> onErrorCaptured

### added

onRenderTracked
onRenderTriggerd

Teleport
瞬间移动

### Suspense

- 异步请求的困境
- Suspense 是 Vue3 推出的一个内置的特殊组件
- 如果使用 Suspense， 要返回一个 promise
