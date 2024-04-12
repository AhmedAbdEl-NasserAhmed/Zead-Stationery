function addingClasses(targetElements, className) {
  const inputs = document.getElementsByClassName(targetElements);

  Array.from(inputs).map((input) => input.classList.add(className));
}

export default addingClasses;
