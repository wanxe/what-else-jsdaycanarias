<template>
  <div class="dogs-search w-full flex flex-col md:flex-row">

    <dogs-search-gallery
      :breed="dog.breed"
      :pictures="dog.pictures"
      :loading="isLoading"
    />

    <dogs-data-provider
      :transform-items="transformItems"
      #default="{ data, loading, fetch }"
    >
      <tw-autocomplete
        :items="data"
        :loading="loading"
        :filter-items="filterItems"
        placeholder="Start to type..."
        @hook:created="fetch"
        @selected="onSelected"
      >
        <template #result="{ item, isSelected, highlight }">

          <tw-autocomplete-item
            :class="{ 'border-solid border-2 border-gray-600': isSelected }"
            class="border-solid border-2 hover:border-gray-600 cursor-pointer"
          >
            <div class="flex items-center">
              <div class="text-sm flex-grow">
                <p class="text-gray-600">Breed:</p>
                <p class="text-gray-900 text-xl leading-none" v-html="highlight(item)"/>
              </div>
              <tw-button type="button">
                See pictures
              </tw-button>
            </div>
          </tw-autocomplete-item>

        </template>

        <template #no-result>
          <empty-state />
        </template>
      </tw-autocomplete>
    </dogs-data-provider>
  </div>
</template>

<script>
import DogsDataProvider from '@/components/DogsDataProvider.vue';
import EmptyState from './DogsSearchEmptyState.vue';
import { DogsRepository } from '@/repositories/dogsRepository';
import DogsSearchGallery from './DogsSearchGallery.vue';

const dogModel = {
  breed: '',
  pictures: []
};

export default {
  name: 'DogsSearch',
  components: {
    DogsDataProvider,
    DogsSearchGallery,
    EmptyState
  },
  data () {
    return {
      dog: Object.assign({}, dogModel),
      isLoading: false
    };
  },
  methods: {
    transformItems (data) {
      if (data) {
        return Object.keys(data);
      }
    },
    filterItems (breeds, input) {
      const result = breeds.filter(breed => {
        const regex = new RegExp(input, 'ig');
        const isAMatch = regex.test(breed);

        return isAMatch;
      });

      return result;
    },
    async onSelected (breed) {
      if (!breed) {
        this.dog = Object.assign({}, dogModel);

        return;
      }

      try {
        this.isLoading = true;
        const response = await DogsRepository.getDogPicturesByBreed(breed);
        const data = await response.json();

        this.dog = {
          breed,
          pictures: data.pictures
        };
      } catch (error) {
        console.log(error);
      } finally {
        this.isLoading = false;
      }
    }
  }
};
</script>
