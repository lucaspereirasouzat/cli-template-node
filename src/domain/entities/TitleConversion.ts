import { FormatTitle } from "./FormatTitle";

const REGEX_SPLITED_CAMEL_CASE = /([a-z])([A-Z])/g;
const FIRST_INDEX = 0;
const SECOND_INDEX = 1;
const NOT_FOUND_INDEX = -1;
export class TitleConversion {
	path = "";
	constructor(private readonly name: string) {}


  private getClassNameFromPath(): string {
    const segments = this.name.split('/').slice(-2);
    return segments
      .map(segment =>
        segment
          .replace(REGEX_SPLITED_CAMEL_CASE, "$1 $2")
          .split(" ")
          .map(word => word.charAt(FIRST_INDEX).toUpperCase() + word.slice(SECOND_INDEX))
          .join("")
      )
      .join("");
  }

	public getPathFromTitle(): string {
		const lastIndexPath = this.name.lastIndexOf("/");

		if (lastIndexPath === NOT_FOUND_INDEX) {
			return "";
		}

		if (this.name.indexOf("/") === FIRST_INDEX) {
			return this.name.substring(SECOND_INDEX, lastIndexPath + SECOND_INDEX);
		}

		return this.name.slice(FIRST_INDEX, lastIndexPath + SECOND_INDEX);
	}

	private separateTitle(): string {
		const lastIndex = this.name.lastIndexOf("/");

		if (lastIndex === NOT_FOUND_INDEX) {
			return this.name;
		}

		return this.name.substring(lastIndex + SECOND_INDEX);
	}

	public getSplitedArray(): string[] {
		return this.separateTitle().replace(REGEX_SPLITED_CAMEL_CASE, "$1 $2").split(" ");
	}

	public GetCamelCaseName(): string {
		return this.getSplitedArray()
			.map((item) => `${item.charAt(FIRST_INDEX).toUpperCase()}${item.slice(SECOND_INDEX)}`)
			.join("");
	}

	public GetTranformToKebabCase() {
		return new FormatTitle(this.getSplitedArray()
			.map((item) => `${item.charAt(FIRST_INDEX).toLowerCase()}${item.slice(SECOND_INDEX).toLowerCase()}`)
			.join("-")).getFormat('kebab-case');
	}

	public GetTranformToSnakeCase() {
		return new FormatTitle(this.getSplitedArray()
			.map((item) => `${item.charAt(FIRST_INDEX).toLowerCase()}${item.slice(SECOND_INDEX).toLowerCase()}`)
			.join("_")).getFormat('snake_case');
	}

	public GetFormatedTitleFileName(): string {
		return `${this.GetTranformToKebabCase()}.ts`;
	}


  public getFormatedFields(): FormatedFields {
    const UpperCase = new FormatTitle(this.getClassNameFromPath()).getFormat('camelCase');
    const titleFormated = this.GetFormatedTitleFileName();
    const path = this.getPathFromTitle();

    return {
      UpperCase,
      titleFormated,
      path
    }
  }
}

interface FormatedFields {
  UpperCase: string
  titleFormated: string
  path: string
}
