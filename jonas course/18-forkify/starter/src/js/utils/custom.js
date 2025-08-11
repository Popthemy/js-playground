export class Fraction {
  constructor(numerator, denominator) {
    if (denominator) {
      this.numerator = numerator;
      this.denominator = denominator;
    } else {
      const value =
        typeof numerator === 'number' ? numerator : parseFloat(numerator);
      const tolerance = 1.0e-6;
      let h1 = 1,
        h2 = 0,
        k1 = 0,
        k2 = 1,
        b = value;
      do {
        const a = Math.floor(b);
        let aux = h1;
        h1 = a * h1 + h2;
        h2 = aux;
        aux = k1;
        k1 = a * k1 + k2;
        k2 = aux;
        b = 1 / (b - a);
      } while (Math.abs(value - h1 / k1) > value * tolerance);

      this.numerator = h1;
      this.denominator = k1;
    }
  }

  toString() {
    return this.denominator === 1
      ? `${this.numerator}`
      : `${this.numerator}/${this.denominator}`;
  }

  valueOf() {
    return this.numerator / this.denominator;
  }
}
