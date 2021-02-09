const url = `https://kea-alt-del.dk/t7/api/products/1164`; //example 2801(discount: null, sold out: 0), 1525(discount: 55, sold out:0), 1164(discount: 28, sold out: 1), 1165, 2585, 2485, 2385, 2285, 2185
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

    //description

    document.querySelector("h4 span.category").textContent = product.category;
    document.querySelector("h4 span.brandname").textContent = product.brandname;
    document.querySelector("h3").textContent = product.productdisplayname;

    if (product.discount) {
        document.querySelector("p.prev-price").textContent =
            "DKK " + product.price;
        document.querySelector("span.discounted").textContent =
            "DKK " + product.relid;
        document.querySelector("span.discount").textContent =
            product.discount + "%";
    } else {
        document
            .querySelector("span#discounted")
            .classList.remove("discounted");
        document.querySelector("span#discounted").classList.add("price");
        document.querySelector("span#discounted").textContent =
            "DKK " + product.price;

        document.querySelector("span.discount").remove();
    }

    //image sold out or not

    document.querySelector(".bigProduct img").src = product.brandimage;
    // "img.productImage"
    // ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
    document.querySelector(".bigProduct img").alt = product.productdisplayname;

    if (product.soldout == 0) {
        document
            .querySelector(".bigProduct img")
            .classList.remove("img_sold_out");

        document.querySelector("span.sold_out-ticket").remove();
    }
}
// 2801, 1165

/* WHAT THIS JS REFERS TO IN HTML:
/* <ol class="breadcrumbs">
<li><a href="index.html">Home</a></li>
<li><span class="breadcrumbsLine">/</span></li>
<li><a href="category.html">Brands</a></li>
<li><span class="breadcrumbsLine">/</span></li>
<li class="brand"><a href="productlist.html">Brand</a></li>
<li><span class="breadcrumbsLine">/</span></li>
<li class="productname">Name of the product</li>
</ol>


<main id="product-list">

<article class="bigProduct">
  <img src="https://kea-alt-del.dk/t7/images/webp/640/1163.webp"
    alt="Sahara Team India Fanwear Round Neck Jersey" class="img_sold_out"/>
</article>

<article class="description">
  <div>
  <!-- <h5>Inventory number <span class="inventoryNumber">XXX</span></h5> -->
  <h4><span class="category">Category</span><span> | </span><span class="brandname">Company</span></h4>
  <h3>XXX</h3>
  <p class="prev-price">DKK 9999</p>

  <p><span class="discounted">DKK 9999</span>
    <span class="discount">-99%</span>
    <span class="sold_out-ticket">SOLD OUT</span></p>
  </p> */
