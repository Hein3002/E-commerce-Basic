const backendDomain = "http://localhost:8000/api"

const SummaryApi ={
    signUp : {
        url: `${backendDomain}/signup`,
        method : "post"
    },
    signIn: {
        url: `${backendDomain}/signin`,
        method : "post"
    },
    current_user: {
        url: `${backendDomain}/user-details`,
        method : "get"
    },
    logout_user: {
        url: `${backendDomain}/user-logout`,
        method : "get"
    },
    allUser: {
        url: `${backendDomain}/all-user`,
        method : "get"
    },
    updateUser: {
        url: `${backendDomain}/update-user`,
        method : "post"
    },
    uploadProduct: {
        url: `${backendDomain}/upload-product`,
        method : "post"
    },
    allProduct: {
        url: `${backendDomain}/get-product`,
        method : "get"
    },
    updateProduct: {
        url: `${backendDomain}/update-product`,
        method : "post"
    },
    categoryProduct: {
        url: `${backendDomain}/get-categoryProduct`,
        method : "get"
    },
    categoryWiseProduct: {
        url: `${backendDomain}/category-product`,
        method : "post"
    },
    productDetails: {
        url: `${backendDomain}/product-details`,
        method : "post"
    },
    addToCartProduct: {
        url: `${backendDomain}/addtocart`,
        method : "post"
    },
    addToCartProductCount: {
        url: `${backendDomain}/countAddToCartProduct`,
        method : "get"
    },
    addToCartProductView: {
        url: `${backendDomain}/viewCartProduct`,
        method : "get"
    },
    updateQuantity: {
        url: `${backendDomain}/updateQuantity`,
        method : "post"
    },
    deleteCartProduct: {
        url: `${backendDomain}/deleteCartProduct`,
        method : "post"
    },
    searchProduct: {
        url: `${backendDomain}/search-product`,
        method : "get"
    },
    fillterProduct: {
        url: `${backendDomain}/fillter-product`,
        method : "post"
    },
}

export default SummaryApi