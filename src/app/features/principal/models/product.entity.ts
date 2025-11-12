export class Product {

  /** ACA VAN LOS ATRIBUTOS DE LA CLASE*/
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;

  constructor(product: {id?: number, name?: string, description?: string, price?: number, category?: string}) {
    this.id=product.id ||0;
    this.name=product.name||'';
    this.description=product.description||'';
    this.price=product.price||0;
    this.category=product.category||'';
  }
}
