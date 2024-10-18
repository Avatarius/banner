const cabinetContainer = document.querySelector(".cabinet__container");
const basket = document.querySelector(".basket");
const basketButton = document.querySelector('.basket__button');
let basketSize = 0;
const productList = document.querySelectorAll(".cabinet__item");

let currentDroppable = null;

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
    currentTarget.style.insetInlineStart = `${resultX - shiftX}px`;
    currentTarget.style.insetBlockStart = `${resultY - shiftY}px`;
  }

  function reset() {
    currentTarget.style = "";
  }

  moveAt(pageX, pageY);
  function handleMouseMove(e) {
    const { pageX, pageY, clientX, clientY } = e;
    moveAt(pageX, pageY);
    currentTarget.hidden = true;
    const elemBelow = document.elementFromPoint(clientX, clientY);
    currentTarget.hidden = false;
    if (!elemBelow) {
      return;
    }
    const droppableBelow = elemBelow.closest(".basket");
    if (currentDroppable !== droppableBelow) {
      currentDroppable = droppableBelow;
    }
  }

  document.addEventListener("mousemove", handleMouseMove);
  currentTarget.onmouseup = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    currentTarget.onmouseup = null;
    console.log(currentDroppable);
    if (!currentDroppable) {
      reset();
      currentTarget.setAttribute('data-in-basket', false);
    } else {
      currentTarget.setAttribute('data-in-basket', true);
    }
    const basket = document.querySelectorAll('.cabinet__item[data-in-basket=true]');;

    if (basket.length >= 3) {
      basketButton.classList.remove('basket__button_hidden');
    } else {
      basketButton.classList.add('basket__button_hidden');
    }

  };
}

productList.forEach((item) => {
  item.addEventListener("mousedown", handleDnd);
  item.ondragstart = () => false;
});
