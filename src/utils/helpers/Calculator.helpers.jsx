export function isDigit(value) {
  return Number.parseInt(value) >= 0 && Number.parseInt(value) <= 9;
}
export function isOperator(value) {
  return value === "add" || value === "remove" || value === "close" || value === "/";
}
export function isDot(value) {
  return value === ".";
}
export function isBackspace(value) {
  return value === "backspace";
}
export function isEqualButton(value) {
  return value === "=";
}
export function screenHasDot(screen) {
  return screen.indexOf(".") !== -1;
}
function screenHasOperator(screen) {
  const hasPlus = screen.indexOf("+") !== -1;
  const hasMinus = screen.indexOf("-") !== -1;
  const hasMulti = screen.indexOf("*") !== -1;
  const hasDevide = screen.indexOf("/") !== -1;

  return hasPlus || hasMinus || hasMulti || hasDevide;
}
export function serializeString(screen, operator) {
  const result = screen.split(operator);
  return {
    first: Number.parseFloat(result[0]),
    second: Number.parseFloat(result[1]),
  };
}
export function calculateResult(first, second, operator) {
  switch (operator) {
    case "+":
      return Number((first + second).toFixed(7));
    case "-":
      return Number((first - second).toFixed(7));
    case "*":
      return Number((first * second).toFixed(7));
    case "/":
      return Number((first / second).toFixed(7));

    default:
      return;
  }
}
