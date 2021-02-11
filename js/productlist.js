// const urlParams = new URLSearchParams(window.location.search);
// const query = url.Params.get("q");
// const start = url.Params.get("start");
// const brand = url.Params.get("brand");
const url = "https://kea-alt-del.dk/t7/api/products?limit=120";
// const url = "https://kea-alt-del.dk/t7/api/products?brandname=" + brand;

// const url = "https://kea-alt-del.dk/t7/api/products/";

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
        let price1 = "100" - product.discount;
        let priceAfterDiscount = (price1 * product.price) / 100;
        console.log(price1);
        myCopy.querySelector("span.discounted").textContent =
            "DKK " + priceAfterDiscount;
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
    const aEl = myCopy.querySelector("a");
    aEl.href = "product.html?id=" + product.id;
    //grab parent
    const parent = document.querySelector("main");
    //append
    parent.appendChild(myCopy);
}
