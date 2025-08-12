// Product data
const products = [
  {
    title: "Orthopedic Clothes",
    description: "Comfortable, supportive belts and splints designed for optimal relief.",
    img: "images/catalogue_ortholife.jpg",
    pdf: "pdfs/catalogue_ortholife.pdf"
  },
  {
    title: "Compression Clothes",
    description: "High-quality compression wear to enhance circulation and recovery.",
    img: "images/lipoline.jpg",
    pdf: "pdfs/lipoline.pdf"
  },
  {
    title: "Orthopedic Slippers",
    description: "Ergonomic slippers designed to support foot health and comfort.",
    img: "images/brochure_geyosoft.jpg",
    pdf: "pdfs/brochure_geyosoft.pdf"
  }
];

// Render products if container exists
const productsList = document.getElementById("products-list");
if (productsList) {
  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <img src="${product.img}" alt="${product.title}">
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <a href="${product.pdf}" target="_blank" class="pdf-download">
        <img src="images/pdf-icon.png" alt="PDF icon">
        Download
      </a>
    `;

    productsList.appendChild(card);
  });
}