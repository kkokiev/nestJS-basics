import { Injectable, NotFoundException } from '@nestjs/common';

import { Product } from './product.module';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  addProduct(title: string, description: string, price: number) {
    // dummy id
    const id = (this.products.length + 1).toString();
    const newProduct = new Product(id, title, description, price);
    this.products.push(newProduct);
    return id;
  }

  getProducts() {
    return [...this.products];
  }

  getSingleProduct(id: string) {
    const { product } = this.findProduct(id);
    return { ...product };
  }

  updateProduct(id: string, title: string, description: string, price: number) {
    const { product, productIndex } = this.findProduct(id);
    const updatedProduct = { ...product };
    if (title) {
      updatedProduct.title = title;
    }
    if (description) {
      updatedProduct.description = description;
    }
    if (price) {
      updatedProduct.price = price;
    }
    this.products[productIndex] = updatedProduct;

    return updatedProduct;
  }

  removeProduct(id: string) {
    const { productIndex } = this.findProduct(id);
    this.products.splice(productIndex, 1);
    return null;
  }

  private findProduct(id: string) {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products[productIndex];
    if (!product) {
      throw new NotFoundException('Could not find product.');
    }
    return { product, productIndex };
  }
}
