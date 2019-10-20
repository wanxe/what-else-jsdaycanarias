<template>
  <div id="app">
    <app-header />

    <div class="gradient-1 py-20 px-4">
      <div class="container mx-auto flex justify-center">
        <div class="text-6xl mr-6">
          🐶
        </div>
        <div>
          <h2 class="text-4xl font-bold text-white">
            Welcome to our super breed searcher
          </h2>
          <h3 class="text-2xl text-gray-200">
            Type to search and select to see their pictures
          </h3>
        </div>
      </div>
    </div>

    <div class="container mt-20 mx-auto flex justify-center w-full px-4">
      <dogs-search class="w-full" />
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader';
import DogsSearch from '@/components/DogsSearch';

export default {
  name: 'App',
  components: {
    AppHeader,
    DogsSearch
  }
};
</script>

<style lang="scss">
html, body {
  height: 100%;
}

.gradient-1 {
  background: linear-gradient(90deg, rgb(246, 111, 136) 0%, rgb(113, 128, 150) 100%);
}
</style>
