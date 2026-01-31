
// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  loader.style.display = "none";

  // Show products with fade-up animation
  document.querySelectorAll(".product").forEach((product, index) => {
    setTimeout(() => product.classList.add("show"), index * 50);
  });
});
// Cart System (simple frontend)
let cartCount = 0;
const cartCountElem = document.getElementById("cart-count");

document.querySelectorAll(".add-cart").forEach(btn => {
  btn.addEventListener("click", (e) => {
    cartCount++;
    cartCountElem.textContent = cartCount;

    // Button feedback animation
    e.target.textContent = "Added ✅";
    setTimeout(() => e.target.textContent = "Add to Cart", 800);
  });
});
fetch("http://localhost:3000/products")
    .then(response=>response.json())
    .then(products=> {
      console.log("products from backend:",products);
    })
    .catch(error=> {
      console.error("error fetching products:",error);
    });