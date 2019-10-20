<template>
  <div class="dogs-search w-full flex flex-col md:flex-row"/>
</template>

<script>
import { DogsRepository } from '@/repositories/dogsRepository';

const dogModel = {
  breed: '',
  pictures: []
};

export default {
  name: 'DogsSearch',
  components: {
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
