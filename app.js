(function () {
'use strict';

angular.module('ShoppingListCheckOff',[])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBuyController', AlreadyBuyController)
.service('ShoppingListCheckOffService',ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];

function ToBuyController(ShoppingListCheckOffService) {
  var buylist = this;

  buylist.items = ShoppingListCheckOffService.getBuyItems();

  buylist.buyItem = function (itemIndex) {
    try {
      ShoppingListCheckOffService.buyItem(itemIndex);
    } catch (error) {
      buylist.errorMessage = error.message;
    }
  };
}

AlreadyBuyController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBuyController(ShoppingListCheckOffService) {
  var boughtlist = this;

  boughtlist.items = ShoppingListCheckOffService.getBoughtItems();

  boughtlist.empty = function() {
    if(ShoppingListCheckOffService.getBoughtItems().length > 0) {
      return false;
    } else {
      return true;
    }
  };

}

function ShoppingListCheckOffService(){
  var service = this;

  var buy_items = [
    {
      name : "cookies",
      quantity : 10
    },
    {
      name : "meat",
      quantity : 2
    },
    {
      name : "chicken",
      quantity : 3
    },
    {
      name : "beer",
      quantity : 5
    },
    {
      name : "rice",
      quantity : 2
    },
    {
      name : "vegetable",
      quantity : 2
    },
  ];
  var bought_items = [];

  service.buyItem = function (itemIndex) {
    if(buy_items.length > 0) {
      var item = buy_items[itemIndex];
      bought_items.push(item);
      buy_items.splice(itemIndex,1);
    }

    if(buy_items.length === 0) {
      throw new Error("No Item");
    }
  };

  service.getBuyItems = function() {
    return buy_items;
  };

  service.getBoughtItems = function() {
    return bought_items;
  };


}

})();
