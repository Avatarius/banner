const cabinetContainer = document.querySelector(".cabinet__container");

const productList = document.querySelectorAll(".cabinet__item");

function moveAt(target, x, y) {
  const resultX = ( (x) - (target.offsetWidth / 2));
  const resultY = ( (y) - (target.offsetHeight / 2));
  target.style.insetInlineStart = `${ resultX - cabinetContainer.getBoundingClientRect().left}px`;
  target.style.insetBlockStart= `${resultY - cabinetContainer.getBoundingClientRect().top}px` ;
}

function handleDnd(e) {
  const { currentTarget, pageX, pageY } = e;
  cabinetContainer.append(currentTarget);
  moveAt(currentTarget, pageX, pageY);
  function handleMouseMove(e) {
    const { pageX, pageY } = e;
    moveAt(currentTarget, pageX, pageY);
  }

  document.addEventListener("mousemove", handleMouseMove);
  currentTarget.onmouseup = () => {
    console.log("remove");

    document.removeEventListener("mousemove", handleMouseMove);
    currentTarget.onmouseup = null;
  };
}

productList.forEach((item) => {
  item.addEventListener("mousedown", handleDnd);
  item.ondragstart = () => false;
});
