export class Product {
  // short form for this.id = id etc
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number,
  ) {}
}
