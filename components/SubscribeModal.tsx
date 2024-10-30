"use client";

import { Price, productWithPrice } from "@/types";
import Modal from "./modal";
import Button from "./button";

interface SubscribeModalProps {
  products: productWithPrice[];
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currency,
    minimumFractionDigits: 0,
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
};

export default function SubscribeModal({ products }: SubscribeModalProps) {
  let content = <div className="text-center">No Product available.</div>;

  if (products.length) {
    content = (
      <div>
        {products.map((product) => {
          if (!product.prices?.length) {
            return <div key={product.id}>No prices available</div>;
          }

          return product.prices.map((price) => (
            <Button key={price.id}>
              {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
            </Button>
          ));
        })}
      </div>
    );
  }

  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Beat Stream Premium"
      isOpen
      onChange={() => {}}
    >
      {content}
    </Modal>
  );
}
