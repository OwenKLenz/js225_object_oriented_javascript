// Mini Inventory Management System

const ItemManager = {
  items: [],

  create(itemName, category, quantity) {
    let item = new ItemCreator(itemName, category, quantity);
    if (item.notValid) {
      return false;
    } else {
      this.items.push(item);
    }
  },

  update(SKU, object) {
    let itemSearchResult = this.items.find(item => item.SKUCode === SKU);

    if (itemSearchResult) {
      Object.getOwnPropertyNames(object).forEach((propertyName) => {
        itemSearchResult[propertyName] = object[propertyName];
      });
    }
  },

  delete(SKU) {
    let itemIndex = this.items.findIndex(item => item.SKUCode === SKU);
    if (itemIndex !== -1) {
      this.items.splice(itemIndex, 1);
    }
  },

  inStock() {
    return this.items.filter(item => item.quantity > 0);
  },
  
  itemsInCategory(category) {
    return this.items.filter(item => item.category === category);
  },
}

const ReportManager = {
  init(itemManager) {
    this.items = itemManager; 
  },

  createReporter(SKU) {
    let item = this.items.items.find(item => item.SKUCode === SKU);
    return {
      itemInfo() {
        Object.keys(item).forEach(key => {
          console.log(`${key}: ${item[key]}`);
        });
      },
    }
  },

  reportInStock() {
    console.log(this.items.inStock().map(item => item.itemName).join(', '));
  }
}

ItemManager.itemExists

function ItemCreator(itemName, category, quantity) {
  function isValidName(name) {
    return name.match(/\w/g).length >= 5;
  }

  function isValidCategory(category) {
    return category.length >= 5 && !/\s/.test(category);
  }

  function createSKUCode(itemName, category) {
    return (itemName.replace(' ', '').slice(0, 3) + category.slice(0, 2)).toUpperCase();
  }

  if (!(isValidName(itemName) && isValidCategory(category) && (quantity || quantity === 0))) {
    return { notValid: true };
  }

  this.SKUCode = createSKUCode(itemName, category);
  this.itemName = itemName;
  this.category = category;
  this.quantity = quantity;
}

ItemManager.create('basket ball', 'sports', 0);           // valid item
ItemManager.create('asd', 'sports', 0);
ItemManager.create('soccer ball', 'sports', 5);           // valid item
ItemManager.create('football', 'sports');
ItemManager.create('football', 'sports', 3);              // valid item
ItemManager.create('kitchen pot', 'cooking items', 0);
ItemManager.create('kitchen pot', 'cooking', 3);          // valid item

console.log(ItemManager.items);       
// returns list with the 4 valid items

ReportManager.init(ItemManager);
ReportManager.reportInStock();
// // logs soccer ball,football,kitchen pot

ItemManager.update('SOCSP', { quantity: 0 });
console.log(ItemManager.items);
console.log(ItemManager.inStock());
// returns list with the item objects for football and kitchen pot
ReportManager.reportInStock();
// logs football,kitchen pot
console.log(ItemManager.itemsInCategory('sports'));
// returns list with the item objects for basket ball, soccer ball, and football
ItemManager.delete('SOCSP');
console.log(ItemManager.items);
// returns list with the remaining 3 valid items (soccer ball is removed from the list)

const kitchenPotReporter = ReportManager.createReporter('KITCO');
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 3

ItemManager.update('KITCO', { quantity: 10 });
kitchenPotReporter.itemInfo();
// logs
// skuCode: KITCO
// itemName: kitchen pot
// category: cooking
// quantity: 10

