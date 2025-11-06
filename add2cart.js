function addToCart(itemData) {
    const cart = JSON.parse(localStorage.getItem('travelCart') || '[]');
    cart.push(itemData);
    localStorage.setItem('travelCart', JSON.stringify(cart));
    alert('Item added to cart!');
    window.location.href = 'cart.html';
}