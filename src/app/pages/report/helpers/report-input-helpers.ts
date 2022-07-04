import { KeyCodeAllowedChars } from '@pages/report/enums/enum';

export function isInputOnlyNumber(event: KeyboardEvent): boolean {
  const isNumber =
    (event.keyCode >= KeyCodeAllowedChars.KeyCodeZero &&
      event.keyCode <= KeyCodeAllowedChars.KeyCodeNine) ||
    (event.keyCode >= KeyCodeAllowedChars.KeyCodeZeroNumlock &&
      event.keyCode <= KeyCodeAllowedChars.KeyCodeNineNumlock);
  const isArrow =
    event.keyCode === KeyCodeAllowedChars.KeyCodeArrowLeft ||
    event.keyCode === KeyCodeAllowedChars.KeyCodeArrowRight;

  const isOtherAllowedSymbol =
    event.keyCode === KeyCodeAllowedChars.KeyCodeBackspace ||
    event.keyCode === KeyCodeAllowedChars.KeyCodeDelete ||
    event.keyCode === KeyCodeAllowedChars.KeyCodeComma ||
    event.keyCode === KeyCodeAllowedChars.KeyCodeDot;

  if (isNumber || isArrow || isOtherAllowedSymbol) {
    return true;
  }
  return false;
}

export const onRightIndex = (index: number): number => index + 1;
