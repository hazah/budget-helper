export interface Product {
  id: string;
  name: string;
};

export class Product implements Product {
  public name: string;

  constructor(public id: string, props: Partial<Omit<Product, 'id'>>) {
    const { name = "" } = props;
    
    this.name = name;
  }
}
