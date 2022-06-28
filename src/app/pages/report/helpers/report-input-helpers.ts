import {
  KEY_CODE_ARROW_DOWN,
  KEY_CODE_ARROW_LEFT,
  KEY_CODE_BACKSPACE,
  KEY_CODE_COMMA,
  KEY_CODE_DELETE,
  KEY_CODE_DOT,
  KEY_CODE_NINE,
  KEY_CODE_NINE_NUMLOCK,
  KEY_CODE_ZERO,
  KEY_CODE_ZERO_NUMLOCK,
} from '../constants/report-input-constans';

export function isInputOnlyNumber(event: KeyboardEvent): boolean {
  if (
    (event.keyCode >= KEY_CODE_ZERO && event.keyCode <= KEY_CODE_NINE) ||
    (event.keyCode >= KEY_CODE_ZERO_NUMLOCK &&
      event.keyCode <= KEY_CODE_NINE_NUMLOCK) ||
    event.keyCode === KEY_CODE_BACKSPACE ||
    event.keyCode === KEY_CODE_DELETE ||
    event.keyCode === KEY_CODE_COMMA ||
    event.keyCode === KEY_CODE_DOT ||
    (event.keyCode >= KEY_CODE_ARROW_LEFT &&
      event.keyCode <= KEY_CODE_ARROW_DOWN)
  ) {
    return true;
  } else {
    return false;
  }
}

export function onRightIndex(index: number): number {
  return index + 1;
}

export function isIncludes(str: string, nameSearch: string): boolean {
  return str.includes(nameSearch);
}
