<template>
  <div class="dogs-search-gallery w-full rounded overflow-hidden shadow-lg bg-white mr-5 mb-4 md:mb-0">
    <div
      class="w-full bg-gray-600 flex justify-center"
      style="min-height: 220px;"
    >
      <transition
        name="slide-top"
        mode="out-in"
      >
        <img
          v-if="pictures.length"
          :alt="breed"
          :src="currentImage"
        >
      </transition>
    </div>

    <div class="px-6 py-4 flex justify-between items-center">
      <div class="font-bold text-xl uppercase">
        {{ breedCopy }}
      </div>

      <div>
        <tw-button
          v-if="pictures.length"
          @click="prevImage"
          variant="primary"
          :disabled="currentIndex === 0"
          class="mr-3"
        >
          <template v-if="!loading">
            Prev
          </template>
          <template v-else>
            loading...
          </template>
        </tw-button>

        <tw-button
          v-if="pictures.length"
          @click="nextImage"
          variant="primary"
          :disabled="!inRange"
        >
          <template v-if="!loading">
            Next
          </template>
          <template v-else>
            loading...
          </template>
        </tw-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DogsSearchGallery',
  props: {
    breed: {
      type: String,
      default: ''
    },
    pictures: {
      type: Array,
      required: true
    },
    loading: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    breed (newValue, oldValue) {
      // Resets the current index when breed changes
      if (newValue !== oldValue) {
        this.currentIndex = 0;
      }
    }
  },
  data () {
    return {
      currentIndex: 0
    };
  },
  computed: {
    currentImage () {
      return this.pictures[this.currentIndex];
    },
    inRange () {
      return this.currentIndex < this.pictures.length - 1;
    },
    breedCopy () {
      if (this.breed && this.breed.length) {
        return this.breed;
      }

      return 'Select a breed...';
    }
  },
  methods: {
    nextImage () {
      if (this.inRange) {
        this.currentIndex++;
      }
    },
    prevImage () {
      if (this.currentIndex > 0) {
        this.currentIndex--;
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.dogs-search-gallery {
  img {
    height: 220px;
    object-fit: cover;
    width: 100%;
  }
}
</style>
