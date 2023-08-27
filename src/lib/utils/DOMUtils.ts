export const areSiblings = (elm1: Element, elm2: Element) =>
  elm1 != elm2 && elm1.parentNode === elm2.parentNode;
