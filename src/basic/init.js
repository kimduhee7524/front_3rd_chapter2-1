export function initializeApp($root) {
  const $container = document.createElement('div');
  const $wrapper = document.createElement('div');
  const $headerText = document.createElement('h1');
  const $cartItemsDisplay = document.createElement('div');
  const $cartTotal = document.createElement('div');
  const $productSelection = document.createElement('select');
  const $cartAddBtn = document.createElement('button');
  const $soldOutInfo = document.createElement('div');

  $cartItemsDisplay.id = 'cart-items';
  $cartTotal.id = 'cart-total';
  $productSelection.id = 'product-select';
  $cartAddBtn.id = 'add-to-cart';
  $soldOutInfo.id = 'stock-status';

  $container.className = 'bg-gray-100 p-8';
  $wrapper.className =
    'max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl p-8';
  $headerText.className = 'text-2xl font-bold mb-4';
  $cartTotal.className = 'text-xl font-bold my-4';
  $productSelection.className = 'border rounded p-2 mr-2';
  $cartAddBtn.className = 'bg-blue-500 text-white px-4 py-2 rounded';
  $soldOutInfo.className = 'text-sm text-gray-500 mt-2';

  $headerText.textContent = '장바구니';
  $cartAddBtn.textContent = '추가';

  $wrapper.appendChild($headerText);
  $wrapper.appendChild($cartItemsDisplay);
  $wrapper.appendChild($cartTotal);
  $wrapper.appendChild($productSelection);
  $wrapper.appendChild($cartAddBtn);
  $wrapper.appendChild($soldOutInfo);
  $container.appendChild($wrapper);
  $root.appendChild($container);

  return {
    $productSelection,
    $cartItemsDisplay,
    $cartTotal,
    $cartAddBtn,
    $soldOutInfo,
  };
}
