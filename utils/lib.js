export function toPascalCaseForm(name) {
  const base = name
    .replace(/[-_]/g, " ")
    .replace(/\w+/g, (w) => w[0].toUpperCase() + w.slice(1))
    .replace(/\s/g, "");

  return `${base}Form`;
}

export function toCamelCaseForm(str) {
  return str
    .replace(/\s(.)/g, (_, c) => c.toUpperCase())
    .replace(/\s/g, "")
    .replace(/^(.)/, (_, c) => c.toLowerCase());
}

export function toKebabCaseForm(str) {
  return str
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .replace(/[\s_]+/g, "-")
    .toLowerCase();
}
