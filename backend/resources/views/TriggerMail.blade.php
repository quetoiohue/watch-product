<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h2 class="text-center">Tracking Product</h2>
    <h4> Product made changes:</h4>
    <p class="bio">
       <span>Product name: </span>  {{ $product->name }}
    </p>
    <p class="bio">
        <span>Price change: </span> from <span class="price"> {{ $product->actual_price }} {{ $product->currency }} </span>  to <span class="price"> {{ $product->lastCheckedPrice}} {{ $product->currency }} </span> 
    </p>
    <p class="bio">
        <span>Discount: </span> {{ $product->discount }}
    </p>
    <div class="bio">
        <a href={{ $product->link }} class="btn-link">
            Get product
        </a> 
    </div>
</body>
<style>
    .text-center {
        text-align: center;
    }
    .bio {
        display: block;

        text-align: left;
        font-weight: 500;
        font-size: 16px;
    }
    .bio .price {
        color: blue;
        font-weight: 600;
    }
    .btn-link {
        display: inline-block;
        text-decoration: none;
        padding: 6px 26px;
        background: #00b08c;
        color: #fff;
        border: none;
        outline: none;
        border-radius: 17px;
        height: 34px;
    }
</style>
</html>