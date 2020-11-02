
export class Category {

  private id: string;
  private name: string;
  private code: string;

  get Id() {
    return this.id;
  }
  set Id(id: string) {
    this.id = id;
  }

  get Name() {
    return this.name;
  }
  set Name(name: string) {
    this.name = name;
  }

  get Code() {
    return this.code;
  }
  set Code(code: string) {
    this.code = code;
  }
}
