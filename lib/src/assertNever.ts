/**
 * Use assertNever at the end of exhaustive checks of discriminated unions.
 * TypeScript will error if it becomes non-exhaustive.
 *
 * For example, you can it at the end of a switch statement:
 *
 * switch (type) {
 *   case "good":
 *     ...
 *   case "bad":
 *     ...
 *   default:
 *     assertNever(type);
 * }
 */
export const assertNever = (value: never): never => {
  throw new Error(`Unhandled value: ${JSON.stringify(value)}`);
};
