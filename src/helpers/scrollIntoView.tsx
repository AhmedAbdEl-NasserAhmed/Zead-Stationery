function scrollIntoView(container: string) {
  const scrollViewContainer = document.getElementById(container);

  setTimeout(() => {
    scrollViewContainer.scrollIntoView({
      behavior: "smooth",
      block: "end",
      inline: "end",
    });
  }, 100);
}

export default scrollIntoView;
