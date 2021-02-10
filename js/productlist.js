const url = "https://kea-alt-del.dk/t7/api/products/";

fetch(url)
    .then(function (res) {
        return res.json();
    })
    .then(function (data) {
        handleProductList(data);
    });

function handleProductList(data) {
    console.log(data);
    data.forEach(showProduct);
}

function showProduct(product) {
    //grab the template
    console.log(product);
    const template = document.querySelector("#smallProductTemplateFull")
        .content;
    //clone it
    const myCopy = template.cloneNode(true);
    //change content
    myCopy.querySelector("span.category").textContent = product.category;
    myCopy.querySelector("span.brandname").textContent = product.brandname;
    myCopy.querySelector("h3").textContent = product.productdisplayname;
    myCopy.querySelector("img").alt = product.productdisplayname;
    // myCopy.querySelector("img").src = product.brandimage;
    myCopy.querySelector(
        "img"
    ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
    //changing content when sale, sold out etc
    if (product.soldout == 0) {
        myCopy.querySelector("img").classList.remove("img_sold_out");

        myCopy.querySelector("span.sold_out-ticket").remove();
    }
    if (product.discount) {
        myCopy.querySelector("p.prev-price").textContent =
            "DKK " + product.price;
        myCopy.querySelector("span.discounted").textContent =
            "DKK " + product.relid;
        myCopy.querySelector("span.discount").textContent =
            product.discount + "%";
    } else {
        toRemove = myCopy
            .querySelector("span.id1")
            .classList.remove("discounted");

        myCopy.querySelector("span.id1").classList.add("price");
        myCopy.querySelector("span.id1").textContent = "DKK " + product.price;

        myCopy.querySelector("span.discount").remove();
    }

    //grab parent
    const parent = document.querySelector("main");
    //append
    parent.appendChild(myCopy);
}
