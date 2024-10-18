import { findProductById } from './productUpdate';
import { PRODUCT_DISCOUNTS } from './constants';
import { productList } from './product';

let totalAmt = 0;
let itemCnt = 0;
let points = 0;

export function setupCartEvents(
  $productSelection,
  $cartItemsDisplay,
  $cartTotal,
  $cartAddBtn,
  $soldOutInfo
) {
  $cartAddBtn.addEventListener('click', function () {
    const selectedItem = $productSelection.value;
    const itemToAddCart = findProductById(selectedItem);

    if (itemToAddCart && isInStock(itemToAddCart)) {
      const item = document.getElementById(itemToAddCart.id);

      if (item) {
        updateCartItemQuantity(
          item,
          itemToAddCart,
          $cartItemsDisplay,
          $cartTotal
        );
      } else {
        addNewCartItem(itemToAddCart, $cartItemsDisplay);
      }

      itemToAddCart.quantity--;
      calculateCartTotal($cartItemsDisplay, $cartTotal, $soldOutInfo);
    }
  });

  $cartItemsDisplay.addEventListener('click', function (event) {
    const $clickedElement = event.target;

    if (
      $clickedElement.classList.contains('quantity-change') ||
      $clickedElement.classList.contains('remove-item')
    ) {
      const productId = $clickedElement.dataset.productId;
      const $cartItemElement = document.getElementById(productId);
      const selectedProduct = findProductById(productId);

      if ($clickedElement.classList.contains('quantity-change')) {
        const quantityChange = parseInt($clickedElement.dataset.change);
        const newQuantity =
          parseInt(
            $cartItemElement.querySelector('span').textContent.split('x ')[1]
          ) + quantityChange;
        if (
          newQuantity > 0 &&
          newQuantity <=
            selectedProduct.quantity +
              parseInt(
                $cartItemElement
                  .querySelector('span')
                  .textContent.split('x ')[1]
              )
        ) {
          $cartItemElement.querySelector('span').textContent =
            $cartItemElement.querySelector('span').textContent.split('x ')[0] +
            'x ' +
            newQuantity;
          selectedProduct.quantity -= quantityChange;
        } else if (newQuantity <= 0) {
          $cartItemElement.remove();
          selectedProduct.quantity -= quantityChange;
        } else {
          alert('재고가 부족합니다.');
        }
      } else if ($clickedElement.classList.contains('remove-item')) {
        const remquantity = parseInt(
          $cartItemElement.querySelector('span').textContent.split('x ')[1]
        );
        selectedProduct.quantity += remquantity;
        $cartItemElement.remove();
      }
      calculateCartTotal($cartItemsDisplay, $cartTotal, $soldOutInfo);
    }
  });
}

function calculateCartTotal($cartItemsDisplay, $cartTotal, $soldOutInfo) {
  totalAmt = 0;
  itemCnt = 0;
  const cartItems = $cartItemsDisplay.children;
  let subTot = 0;

  for (let i = 0; i < cartItems.length; i++) {
    const curItem = findProductById(cartItems[i].id);
    const quantity = getItemQuantity(cartItems[i]);

    const itemTot = curItem.val * quantity;
    itemCnt += quantity;
    subTot += itemTot;

    const discountRate = getProductDiscount(curItem.id, quantity);
    totalAmt += itemTot * (1 - discountRate);
  }

  const finalDiscountRate = calculateFinalDiscountRate(subTot);
  totalAmt *= 1 - finalDiscountRate;

  $cartTotal.textContent = '총액: ' + Math.round(totalAmt) + '원';
  displayDiscount(finalDiscountRate, $cartTotal);
  renderpoints($cartTotal);
  updateSoldOutInfo($soldOutInfo);
}

function getItemQuantity(cartItem) {
  return parseInt(cartItem.querySelector('span').textContent.split('x ')[1]);
}

function getProductDiscount(productId, quantity) {
  if (quantity < 10) return 0;
  return PRODUCT_DISCOUNTS[productId] || 0;
}

function calculateFinalDiscountRate(subTot) {
  let discountRate = 0;

  if (itemCnt >= 30) {
    const bulkDiscount = totalAmt * 0.25;
    const itemDiscount = subTot - totalAmt;
    discountRate = Math.max(bulkDiscount, itemDiscount) / subTot;
  }

  if (new Date().getDay() === 5) {
    discountRate = Math.max(discountRate, 0.1);
  }

  return discountRate;
}

function displayDiscount(discountRate, $cartTotal) {
  if (discountRate > 0) {
    const span = document.createElement('span');
    span.className = 'text-green-500 ml-2';
    span.textContent = `(${(discountRate * 100).toFixed(1)}% 할인 적용)`;
    $cartTotal.appendChild(span);
  }
}

function renderpoints($cartTotal) {
  points += Math.floor(totalAmt / 1000);
  let pointsTag = document.getElementById('loyalty-points');
  if (!pointsTag) {
    pointsTag = document.createElement('span');
    pointsTag.id = 'loyalty-points';
    pointsTag.className = 'text-blue-500 ml-2';
    $cartTotal.appendChild(pointsTag);
  }
  pointsTag.textContent = '(포인트: ' + points + ')';
}

export function updateSoldOutInfo($soldOutInfo) {
  let infoMsg = '';
  productList.forEach(function (item) {
    if (item.quantity < 5) {
      infoMsg +=
        item.name +
        ': ' +
        (item.quantity > 0
          ? '재고 부족 (' + item.quantity + '개 남음)'
          : '품절') +
        '\n';
    }
  });
  $soldOutInfo.textContent = infoMsg;
}

function isInStock(item) {
  if (item.quantity > 0) {
    return true;
  } else {
    alert('재고가 부족합니다.');
    return false;
  }
}

function updateCartItemQuantity(item, product) {
  const currentQuantity = parseInt(
    item.querySelector('span').textContent.split('x ')[1]
  );
  const newQuantity = currentQuantity + 1;

  if (newQuantity <= product.quantity) {
    item.querySelector('span').textContent =
      `${product.name} - ${product.val}원 x ${newQuantity}`;
  } else {
    alert('재고가 부족합니다.');
  }
}

function addNewCartItem(product, $cartItemsDisplay) {
  const newItem = document.createElement('div');
  newItem.id = product.id;
  newItem.className = 'flex justify-between items-center mb-2';

  newItem.innerHTML = `
    <span>${product.name} - ${product.val}원 x 1</span>
    <div>
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="-1">-</button>
      <button class="quantity-change bg-blue-500 text-white px-2 py-1 rounded mr-1" data-product-id="${product.id}" data-change="1">+</button>
      <button class="remove-item bg-red-500 text-white px-2 py-1 rounded" data-product-id="${product.id}">삭제</button>
    </div>
  `;

  $cartItemsDisplay.appendChild(newItem);
}
