//Intersection observer polyfill
export const onClientEntry = async () => {
  if (typeof IntersectionObserver === `undefined`) {
    await import(`intersection-observer`);
  }
};

export const onInitialClientRender = () => {
  console.log('ReactDOM.render has executed');
};