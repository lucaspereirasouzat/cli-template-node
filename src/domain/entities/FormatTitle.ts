const REGEX_SPLITED_CAMEL_CASE = /([a-z])([A-Z])/g;

export class FormatTitle {
  constructor(
    private readonly title: string
  ) { }

  public getFormattedTitle(): string {
    return this.title
      .replace(REGEX_SPLITED_CAMEL_CASE, "$1 $2")
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  public splitNameToWords(): string[] {
    let base = this.title;
    base = base.replace(/[-_]/g, ' ');
    base = base.replace(REGEX_SPLITED_CAMEL_CASE, '$1 $2');
    return base.split(' ').filter(Boolean);
  }

  public normalizeFormats() {
    const words = this.splitNameToWords();
    return {
      camelCase: words
        .map((w, i) => i === 0 ? w.charAt(0).toLowerCase() + w.slice(1) : w.charAt(0).toUpperCase() + w.slice(1))
        .join(''),
      PascalCase: words
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(''),
      snake_case: words
        .map(w => w.toLowerCase())
        .join('_'),
      'kebab-case': words
        .map(w => w.toLowerCase())
        .join('-'),
    };
  }

  public getFormat(format: 'camelCase' | 'snake_case' | 'kebab-case' | 'PascalCase' | 'kebab_case'): string {
    const formats = this.normalizeFormats();
    return formats[format] || '';
  }
}
