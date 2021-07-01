const scrollNavigation = (path, offset) => {
  window.scroll(
    0,
    document.querySelector("a[name='" + path + "']").offsetTop - offset
  );
};
export default scrollNavigation;
