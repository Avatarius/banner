const cabinetContainer = document.querySelector(".cabinet__container");

const productList = document.querySelectorAll(".cabinet__item");

function moveAt(target, x, y) {
  // const resultX = (cabinetContainer.getBoundingClientRect().left + x) - target.offsetWidth / 2;
  console.log(target.getBoundingClientRect().top);
  const resultY = ( (y) - (target.offsetHeight / 2) - 28);

  // target.style.insetInlineEnd= `${resultX}px` ;
  target.style.insetBlockStart= `${resultY}px` ;
}

function handleDnd(e) {
  const { currentTarget, pageX, pageY } = e;
  cabinetContainer.append(currentTarget);
  moveAt(currentTarget, pageX, pageY);
  function handleMouseMove(e) {
    // const { pageX, pageY } = e;
    // moveAt(currentTarget, e.pageX, e.pageY);
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
});
