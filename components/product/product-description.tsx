import { AddToCart } from "components/cart/add-to-cart";
import { getSalePrice, type Product } from "lib/products";

type ProductDescriptionProps = {
  product: Product;
};

export function ProductDescription({
  product,
}: ProductDescriptionProps) {
  return (
    <div>
      {/* PRODUCT NAME AND PRICE */}
      <div className="mb-6 flex flex-col border-b border-[#e5ded6] pb-6">
        <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#8b7355]">
          {product.category}
        </p>

        <h1 className="mb-4 font-serif text-4xl font-medium text-[#292522] md:text-5xl">
          {product.name}
        </h1>

        <div className="flex flex-wrap items-center gap-3">
          {product.discount > 0 && (
            <span className="text-base text-[#8b8178] line-through">
              ₹{product.mrp.toLocaleString("en-IN")}
            </span>
          )}

          <span className="text-lg font-medium text-[#292522]">
            ₹{getSalePrice(product).toLocaleString("en-IN")}
          </span>

          {product.discount > 0 && (
            <span className="text-xs font-medium text-[#8b7355]">
              {product.discount}% OFF
            </span>
          )}
        </div>
      </div>

      {/* PRODUCT DESCRIPTION */}
      {product.description && (
        <p className="mb-6 text-sm leading-7 text-[#625a53]">
          {product.description}
        </p>
      )}

      {/* ADD TO CART */}
      <AddToCart
        id={product.id}
        name={product.name}
        price={getSalePrice(product)}
        mrp={product.mrp}
        discount={product.discount}
        image={product.image}
        sizes={product.sizes}
      />
    </div>
  );
}
