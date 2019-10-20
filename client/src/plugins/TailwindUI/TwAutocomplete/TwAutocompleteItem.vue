<template>
  <div class="tw-autocomplete--item rounded-lg text-xl text-gray-500 px-4 py-3 outline-none bg-white mb-3">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'TwAutocompleteItem'
};
</script>

<style lang="scss" scoped>
.tw-autocomplete--item {
  transition: all .3s ease;
}
</style>
