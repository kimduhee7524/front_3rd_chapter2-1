import { initializeApp } from './init';
import { setupProductUpdate } from './productUpdate';
import { setupCartEvents } from './cartCalculation';
import { runSchedulers } from './scheduler';

function main() {
  const $root = document.getElementById('app');
  const {
    $productSelection,
    $cartItemsDisplay,
    $cartTotal,
    $cartAddBtn,
    $soldOutInfo,
  } = initializeApp($root);

  setupProductUpdate($productSelection);
  setupCartEvents(
    $productSelection,
    $cartItemsDisplay,
    $cartTotal,
    $cartAddBtn,
    $soldOutInfo
  );
  runSchedulers($productSelection);
}

main();
