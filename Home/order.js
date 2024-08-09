const products = {
  vegetables: [
    { name: 'Potatoes', price: 7.00, img: './images/vegetables/potatos.png' },
    { name: 'Beetroot', price: 4.00, img: './images/vegetables/beetroot.png' },
    { name: 'Onions', price: 5.00, img: './images/vegetables/Onions.jpg' },
    { name: 'Carrot', price: 3.00, img: './images/vegetables/carrots.png' },
    { name: 'Broccoli', price: 2.50, img: './images/vegetables/broccoli.png' },
    { name: 'Pumpkin', price: 3.50, img: './images/vegetables/pumpkin.png' },
    
  ], 
  fruits: [
    { name: 'Watermelon', price: 9.00, img: './images/fruits/watermelon.png' },
    { name: 'Promaganate', price: 14.99, img: './images/fruits/promaganate.png' },
    { name: 'Papaya', price: 9.99, img: './images/fruits/papaya.png' },
    { name: 'Green Grapes', price: 4.99, img: './images/fruits/grapes.png' },
    { name: 'Peach', price: 3.99, img: './images/fruits/peach.png' },
    { name: 'Strawberry', price: 7.00, img: './images/fruits/strawberry.png' },
    
  ],
  dairy: [
    { name: 'Anchor Newdale Yogurt', price: 2.50, img: './images/dairy/anchor-yogurt.png' },
    { name: 'Medowlee Butter', price: 4.00, img: './images/dairy/medowlee butter.png' },
    { name: 'Kotmale Cheese', price: 5.00, img: './images/dairy/kotmale-cheese.png' },
    { name: 'Nestle Malted Milk', price: 3.50, img: './images/dairy/malted-milk.png' },
    { name: 'Rich Life Kiripani', price: 2.00, img: './images/dairy/kiripani-yogurt.png' },
    { name: 'Ice Coffee', price: 6.00, img: './images/dairy/ice-coffee.png' },
    
  ],
  'meat-seafood': [
    { name: 'Chicken Breasts', price: 10.00, img: './images/meat/chicken breasts.png' },
    { name: 'Beef', price: 15.00, img: './images/meat/beef.png' },
    { name: 'Lamb Meat', price: 20.00, img: './images/meat/lamb.png' },
    { name: 'Salmon', price: 18.00, img: './images/meat/salmon.png' },
    { name: 'Shrimp', price: 12.00, img: './images/meat/shrimp.png' },
    { name: 'Tuna', price: 22.00, img: './images/meat/tuna.png' },
    
  ],
  'baking-cooking': [
    { name: 'Flour', price: 3.00, img: './images/baking andd cooking/flour.png' },
    { name: 'Sugar', price: 2.50, img: './images/baking andd cooking/brown sugar.png' },
    { name: 'Honey', price: 1.50, img: './images/baking andd cooking/honey.png' },
    { name: 'Salt', price: 1.00, img: './images/baking andd cooking/salt.png' },
    { name: 'Olive Oil', price: 5.00, img: './images/baking andd cooking/olive oil.png' },
    { name: 'Vanilla Extract', price: 1.00, img: './images/baking andd cooking/vanilla  extract.png' },
    
  ]
};

function showProducts() {
  const category = document.getElementById('category-select').value;
  const productsDiv = document.getElementById('products');
  productsDiv.innerHTML = '';

  if (products[category]) {
    products[category].forEach(product => {
      const isWeightBased = ['vegetables', 'fruits', 'meat-seafood'].includes(category);
      const inputLabel = isWeightBased ? 'Weight (kg)' : 'Quantity';
      const productDiv = document.createElement('div');
      productDiv.className = 'product';

      productDiv.innerHTML = `
        <img src="${product.img}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <label for="quantity-${product.name}">${inputLabel}:</label>
        <input type="number" min="0.1" step="0.1" value="1" id="quantity-${product.name}">
        <button onclick="addToCart('${product.name}', ${product.price}, '${category}', ${isWeightBased})">Add to Cart</button>
      `;

      productsDiv.appendChild(productDiv);
    });
  }
}

function addToCart(name, price, category, isWeightBased) {
  const quantity = parseFloat(document.getElementById(`quantity-${name}`).value);
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.name === name);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({ name, price, quantity, category, isWeightBased });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}

function buyNow() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  if (cart.length === 0) {
    alert('Your cart is empty! Please add items to the cart before proceeding.');
  } else {
    window.location.href = 'payment.html';
  }
}

function loadCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartTable = document.querySelector('#cart tbody');
  cartTable.innerHTML = '';
  let totalPrice = 0;
  cart.forEach((item, index) => {
    const unit = item.isWeightBased ? 'kg' : 'units';
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity.toFixed(2)} ${unit}</td>
      <td>$${(item.price * item.quantity).toFixed(2)}</td>
      <td><button class="remove-button" onclick="removeFromCart(${index})">Remove</button></td>
    `;
    cartTable.appendChild(row);
    totalPrice += item.price * item.quantity;
  });
  document.getElementById('total-price').textContent = `$${totalPrice.toFixed(2)}`;
  
  // Disable/enable the Buy Now button based on cart status
  const buyNowButton = document.getElementById('buy-now-button');
  if (cart.length === 0) {
    buyNowButton.disabled = true;
  } else {
    buyNowButton.disabled = false;
  }
}

// Initially load the products and cart
document.addEventListener('DOMContentLoaded', () => {
  showProducts();
  loadCart();
});

function removeFromCart(index) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
}



function saveFavorites() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  localStorage.setItem('favorites', JSON.stringify(cart));
  alert('Products are saved as favorites.');
}

function saveFavorites() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  localStorage.setItem('favorites', JSON.stringify(cart));
  alert('Favorites saved!');
}

function applyFavorites() {
  const favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  favorites.forEach(fav => {
    const existingItem = cart.find(item => item.name === fav.name);
    if (existingItem) {
      existingItem.quantity += fav.quantity;
    } else {
      cart.push(fav);
    }
  });
  localStorage.setItem('cart', JSON.stringify(cart));
  loadCart();
  alert('Favorites applied!');
}

// Initially load the products and cart
document.addEventListener('DOMContentLoaded', () => {
  showProducts();
  loadCart();
});

function setDefaultCategory() {
  const selectElement = document.getElementById('category-select');
  const defaultValue = 'vegetables'; // Set your default value here

  selectElement.value = defaultValue;

  // Display products for the default category
  showProducts();
}

// Event listener for category change
document.getElementById('category-select').addEventListener('change', showProducts);

// Initial load
document.addEventListener('DOMContentLoaded', () => {
  setDefaultCategory();
  loadCart();
});


