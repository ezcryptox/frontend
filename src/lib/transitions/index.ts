function slideFade(node, { duration = 300, height = 10 }) {
  return {
    duration,
    css: (t) => {
      const fadeValue = t;
      const slideValue = -height * (1 - t); // Adjust slide effect
      return `
        opacity: ${fadeValue};
        transform: translateY(${slideValue}px);
      `;
    }
  };
}
export {
  slideFade
}