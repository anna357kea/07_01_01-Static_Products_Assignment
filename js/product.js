const url = "https://kea-alt-del.dk/t7/api/products/2801";
//fetch the data
fetch(url)
    .then((response) => response.json())
    .then((data) => showProduct(data));

//populate the page
function showProduct(product) {
    console.log(product);
    document.querySelector(".breadcrumbs .brand").textContent =
        product.brandname;
    document.querySelector(".breadcrumbs .productname").textContent =
        product.productdisplayname;

    /* <article class="bigProduct">
      <img src="https://kea-alt-del.dk/t7/images/webp/640/1163.webp"
        alt="Sahara Team India Fanwear Round Neck Jersey" />
    </article> */

    document.querySelector(
        "img.productImage"
    ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
    document.querySelector("img.productImage").alt = product.productdisplayname;
}
