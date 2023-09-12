export const ERRORS = {
  MISSING_ELEMENT_PARAM:
    "Missing `element` property in SupaMenu options. Property is required.",
  MISSING_ID_ATTRIBUTE_ON_ELEMENT: `menu root element must have an "id" attribute, please add a unique id attribute on menu HTML element. ie : <nav id="my-menu">...</nav>`,
};

export const CSS_CLASSNAME = "supamenu";
export const CLASSNAMES = {
  rootElement: CSS_CLASSNAME,
  visible: `${CSS_CLASSNAME}--visible`,
};

export const CLOSE_MENU_SELECTOR = ".spm__close-menu-button";

export const BODY_CLICK_LISTENER_TIMEOUT_BEFORE_ADD_MS = 500;
