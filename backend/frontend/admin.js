document.addEventListener("DOMContentLoaded", loadProducts);

/* LOAD PRODUCTS */
function loadProducts() {
  fetch("http://127.0.0.1:3000/products")
    .then(res => res.json())
    .then(products => {
      const list = document.getElementById("admin-product-list");
      list.innerHTML = "";

      products.forEach(p => {
        const div = document.createElement("div");
        div.className = "admin-product";

        div.innerHTML = `
          <h3>${p.name}</h3>
          <p>₹${p.price}</p>
          <img src="${p.image}" width="100" />
          <br>
          <button onclick="deleteProduct(${p.id})">Delete</button>
        `;

        list.appendChild(div);
      });
    })
    .catch(err => console.error(err));
}

/* DELETE PRODUCT */
function deleteProduct(id) {
  if (!confirm("Are you sure you want to delete this product?")) return;

  fetch(`http://127.0.0.1:3000/products/${id}`, {
    method: "DELETE"
  })
    .then(res => res.json())
    .then(() => {
      alert("Product deleted");
      loadProducts(); // reload list
    })
    .catch(err => console.error(err));
}