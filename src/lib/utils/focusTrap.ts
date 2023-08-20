// TODO: handle SHIFT + TAB and keep the trap active in this case

export const trapFocus = (
  element: HTMLElement,
  prevFocusableElement = document.activeElement as HTMLElement | null
) => {
  const focusableEls: HTMLElement[] = Array.from(
    element.querySelectorAll(
      'a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), input[type="search"]:not([disabled]), select:not([disabled])'
    )
  );

  const firstFocusableEl = focusableEls[0];
  const lastFocusableEl = focusableEls[focusableEls.length - 1];
  let currentFocus: HTMLElement | null = null;

  firstFocusableEl.focus();
  currentFocus = firstFocusableEl;

  const handleFocus = (e: FocusEvent) => {
    e.preventDefault();
    // if the focused element "lives" in your modal container then just focus it
    if (focusableEls.includes(e.target as HTMLElement)) {
      currentFocus = e.target as HTMLElement;
    } else {
      // you're out of the container
      // if previously the focused element was the first element then focus the last
      // element - means you were using the shift key
      if (currentFocus === firstFocusableEl) {
        lastFocusableEl.focus();
      } else {
        // you previously were focused on the last element so just focus the first one
        firstFocusableEl.focus();
      }
      // update the current focus var
      currentFocus = document.activeElement as HTMLElement | null;
    }
  };

  document.addEventListener("focus", handleFocus, true);

  return {
    onClose: () => {
      console.log("TRAP CLOSE!");
      document.removeEventListener("focus", handleFocus, true);
      (prevFocusableElement as HTMLElement).focus();
    },
  };
};
