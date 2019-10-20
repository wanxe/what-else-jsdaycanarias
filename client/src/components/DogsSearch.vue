<template>
  <div class="dogs-search w-full flex flex-col md:flex-row">
    <!-- // TODO Task-8: declare the dogs-data-provider and check if it works -->
    <!-- hint: set the immediate prop to fetch the data automagically whe the component is created -->
  </div>
</template>

<script>
import { DogsRepository } from '@/repositories/dogsRepository';
// TODO Task-7: import the dogs data provider and declare into the components section

const dogModel = {
  breed: '',
  pictures: []
};

export default {
  name: 'DogsSearch',
  components: {
    // Your stuff
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
