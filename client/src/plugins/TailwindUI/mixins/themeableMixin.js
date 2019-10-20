export default function () {
  return {
    props: {
      variant: {
        type: String,
        // default, primary...
        default: 'default'
      },
      size: {
        type: String,
        // sm, md, xl...
        default: 'default'
      }
    }
  };
};
