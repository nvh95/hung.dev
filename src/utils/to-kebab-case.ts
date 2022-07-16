const toKebabCase = (str: string = ""): string =>
  str.toLowerCase().split(" ").join("-").split("_").join("-");

export default toKebabCase;
