const cabinetContainer = document.querySelector(".cabinet__container");

const productList = document.querySelectorAll(".cabinet__item");



function handleDnd(e) {
  const { currentTarget, pageX, pageY, clientX, clientY } = e;
  const offsetX = currentTarget.getBoundingClientRect().left;
  const offsetY = currentTarget.getBoundingClientRect().top;
  const shiftX = clientX - offsetX;
  const shiftY = clientY - offsetY;
  cabinetContainer.append(currentTarget);
  function moveAt(x, y) {
    const resultX = x - cabinetContainer.getBoundingClientRect().left;
    const resultY = y - cabinetContainer.getBoundingClientRect().top;
    currentTarget.style.insetInlineStart = `${resultX - shiftX}px`
    currentTarget.style.insetBlockStart = `${resultY - shiftY}px`
  }
  moveAt(pageX, pageY);window
  function handleMouseMove(e) {
    const { pageX, pageY } = e;
    moveAt(pageX, pageY);
  }

  document.addEventListener("mousemove", handleMouseMove);
  currentTarget.onmouseup = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    currentTarget.onmouseup = null;
  };
}

productList.forEach((item) => {
  item.addEventListener("mousedown", handleDnd);
  item.ondragstart = () => false;
});
