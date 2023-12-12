export const getFooterHeight = () => {
  const footer = document.querySelector('footer');
  if (footer) {
    return footer.offsetHeight;
  }

  return 0;
};
