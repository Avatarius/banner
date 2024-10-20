const cabinetContainer = document.querySelector(".cabinet__container");
const basket = document.querySelector(".basket");
const basketContainer = document.querySelector(".basket__container");
const basketButton = document.querySelector(".basket__button");
let basketSize = 0;
const productList = document.querySelectorAll(".product");
let currentDroppable = null;
let targetCopy;

let inlineOffset = 0;
let previousWidth = 0;
let overallWidth = 0;

function setListeners(item) {
  item.addEventListener("mousedown", handleDnd);
  item.ondragstart = () => false;
}

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

  function reset(node) {
    node.style = "";
  }

  function moveCopy() {
    const width = targetCopy.getBoundingClientRect().width;
    const containerWidth = basketContainer.getBoundingClientRect().width;
    const itemCount = basketContainer.querySelectorAll(".product").length;

    overallWidth += width;
    if (itemCount > 1) {
      inlineOffset += previousWidth;
    }
    if (overallWidth >= containerWidth + width / 2) {
      inlineOffset = 0;
      overallWidth = width;
    }
    console.log(overallWidth);

    reset(targetCopy);

    targetCopy.style.insetInlineStart = `${inlineOffset}px`;
    targetCopy.style.insetBlockEnd = 0;
    previousWidth = width;
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
      currentTarget.classList.add(`product__${targetCopy.dataset.name}`);
      currentTarget.classList.remove('product_in-basket');
    } else {
      targetCopy = currentTarget.cloneNode(true);
      currentTarget.classList.add("product_hidden");
      targetCopy.classList.remove(`product__${targetCopy.dataset.name}`);
      targetCopy.classList.add("product_in-basket");
      setListeners(targetCopy);
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
  setListeners(item);
});
