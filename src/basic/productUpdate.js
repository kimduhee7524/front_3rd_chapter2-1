import { productList } from './product';

export function setupProductUpdate($productSelection) {
  updateProductSelection($productSelection);
}

function updateProductSelection($productSelection) {
  $productSelection.innerHTML = '';
  productList.forEach(function (item) {
    const $option = document.createElement('option');
    $option.value = item.id;
    $option.textContent = item.name + ' - ' + item.val + '원';
    if (item.quantity === 0) $option.disabled = true;
    $productSelection.appendChild($option);
  });
}

export function findProductById(productId) {
  return productList.find((item) => item.id === productId);
}
