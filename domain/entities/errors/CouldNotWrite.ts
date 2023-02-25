export class CouldNotWrite extends Error {
  constructor() {
    super("Could not write");
    this.name = "CouldNotWrite";
  }
}
