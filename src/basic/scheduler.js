import { productList } from './product';
import { setupProductUpdate } from './productUpdate';

export function runSchedulers() {
  setTimeout(function () {
    setInterval(function () {
      const luckyItem =
        productList[Math.floor(Math.random() * productList.length)];
      if (Math.random() < 0.3 && luckyItem.quantity > 0) {
        luckyItem.val = Math.round(luckyItem.val * 0.8);
        alert('번개세일! ' + luckyItem.name + '이(가) 20% 할인 중입니다!');
        setupProductUpdate();
      }
    }, 30000);
  }, Math.random() * 10000);

  setTimeout(function () {
    setInterval(function () {
      const SelectedProductId = null;
      if (SelectedProductId) {
        const suggest = productList.find(function (item) {
          return item.id !== SelectedProductId && item.quantity > 0;
        });
        if (suggest) {
          alert(
            suggest.name + '은(는) 어떠세요? 지금 구매하시면 5% 추가 할인!'
          );
          suggest.val = Math.round(suggest.val * 0.95);
          setupProductUpdate();
        }
      }
    }, 60000);
  }, Math.random() * 20000);
}
