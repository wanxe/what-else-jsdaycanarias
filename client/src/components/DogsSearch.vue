<template>
  <div class="dogs-search w-full flex flex-col md:flex-row">
    <dogs-data-provider
      :transform-items="transformItems"
      #default="{ data, loading, fetch }"
    >
      <!-- // TODO Task-11: add the <tw-autocomplete /> component and use the @hook:create to call the fetch function -->
      <!-- // TODO Task-12: add the <tw-autocomplete-item /> into the #result slot -->
      <!-- // TODO Task-13: add the <empty-state /> into the #no-result slot  -->
    </dogs-data-provider>
  </div>
</template>

<script>
import { DogsRepository } from '@/repositories/dogsRepository';
import DogsDataProvider from '@/components/DogsDataProvider.vue';

const dogModel = {
  breed: '',
  pictures: []
};

export default {
  name: 'DogsSearch',
  components: {
    DogsDataProvider
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
