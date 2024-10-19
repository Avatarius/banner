const cabinetContainer = document.querySelector(".cabinet__container");
const basket = document.querySelector(".basket");
const basketContainer = document.querySelector(".basket__container");
const basketButton = document.querySelector(".basket__button");
let basketSize = 0;
const productList = document.querySelectorAll(".product");
let currentDroppable = null;


let inlineOffset = 0;
let previousWidth = 0;

function handleDnd(e) {
  const { currentTarget, pageX, pageY, clientX, clientY } = e;
  let targetCopy;
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

  function reset(node) {
    node.style = "";
  }


  function moveCopy() {

    const width = targetCopy.getBoundingClientRect().width;
    const height = targetCopy.getBoundingClientRect().height;

    const itemCount = basketContainer.querySelectorAll(".product").length;

    if (itemCount > 1) {
      inlineOffset += previousWidth;
    }

    if (inlineOffset >= (basketContainer.getBoundingClientRect().width - width)) {
      inlineOffset = 0;
    }
    console.log(basketContainer.getBoundingClientRect().width);


    reset(targetCopy);

    targetCopy.style.insetInlineStart = `${inlineOffset}px`;
    targetCopy.style.insetBlockEnd = 0;
    targetCopy.style.zIndex = -1;
    previousWidth = width;

    /* targetCopy.style.insetInlineStart = `${0}px`;
    targetCopy.style.insetBlockStart = 'unset';
    targetCopy.style.insetBlockEnd = 0; */
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
    if (!currentDroppable) {
      reset(currentTarget);
      // currentTarget.setAttribute('data-in-basket', false);
    } else {
      // currentTarget.setAttribute('data-in-basket', true);
      targetCopy = currentTarget.cloneNode(true);
      currentTarget.classList.add("product_hidden");
      targetCopy.classList.remove(`product__${targetCopy.dataset.name}`);
      basketContainer.append(targetCopy);

      moveCopy();
    }

    /* if (basket.length >= 3) {
      basketButton.classList.remove('basket__button_hidden');
    } else {
      basketButton.classList.add('basket__button_hidden');
    } */
  };
}

productList.forEach((item) => {
  item.addEventListener("mousedown", handleDnd);
  item.ondragstart = () => false;
});
