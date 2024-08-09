function loadOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const orderCartTable = document.querySelector('#order-cart tbody');
    orderCartTable.innerHTML = '';
    let totalPrice = 0;
    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        orderCartTable.appendChild(row);
        totalPrice += item.price * item.quantity;
    });
    document.getElementById('order-total-price').textContent = `$${totalPrice.toFixed(2)}`;
}

function validateForm() {
    const formFields = document.querySelectorAll('#order-form input');
    let valid = true;
    formFields.forEach(field => {
        if (field.value.trim() === '') {
            valid = false;
            field.style.borderColor = 'red'; // Highlight empty fields
        } else {
            field.style.borderColor = ''; // Reset border color for non-empty fields
        }
    });
    return valid;
}

document.querySelector('.submit-btn').addEventListener('click', function(event) {
    event.preventDefault();
    if (validateForm()) {
        alert(`Thank you for your purchase! Your order will be delivered on ${new Date().toLocaleDateString()}`);
        // You might want to add further functionality here, like form submission
    } else {
        alert('Please fill out all fields.');
    }
});

// Initial load
loadOrder();


