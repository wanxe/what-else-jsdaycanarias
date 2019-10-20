<script>
// import { DogsRepository } from '@/repositories/dogsRepository';
import { isAFunction } from '@/utils/helpers';

export default {
  name: 'DogsDataProvider',
  props: {
    transformItems: {
      type: Function,
      default: undefined
    },
    immediate: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      data: null,
      error: null,
      isLoading: false
    };
  },
  created () {
    if (this.immediate) {
      this.fetch();
    }
  },
  computed: {
    computedData () {
      if (isAFunction(this.transformItems)) {
        return this.transformItems(this.data);
      }

      return this.data;
    }
  },
  methods: {
    async fetch () {
      try {
        this.isLoading = true;
        // TODO Task-9: write the API call (use the dogsRepository) and
        // don't forget to set the data with the API response (JSON)
      } catch (error) {
        this.error = error;
      } finally {
        this.isLoading = false;
      }
    }
  },
  // eslint-disable-next-line vue/require-render-return
  render () {
    // TODO Task-10: render the data that we need to expose to scopedSlots and check if our
    // <search-dogs /> component is rendering the fetched data 😉
  }
};
</script>
