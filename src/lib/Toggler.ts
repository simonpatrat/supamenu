export interface TogglerSettings {
  visibleClassName: string;
  onShow?: () => void;
  onHide?: () => void;
}

const togglerDefaults = {
  visibleClassName: "t-visible",
};

export class Toggler {
  isVisible = false;
  settings: TogglerSettings;
  element: HTMLElement;
  constructor(el: HTMLElement, options?: Partial<TogglerSettings>) {
    this.element = el;
    this.settings = {
      ...togglerDefaults,
      ...options,
    };
  }

  getState = () => {
    return {
      element: this.element,
      isVisible: this.isVisible,
    };
  };

  show = () => {
    const { element } = this;
    const { visibleClassName, onShow } = this.settings;
    element.classList.add(visibleClassName);

    this.isVisible = true;
    if (typeof onShow === "function") {
      onShow();
    }

    return this.getState();
  };

  hide = () => {
    const { element } = this;
    const { visibleClassName, onHide } = this.settings;
    element.classList.remove(visibleClassName);

    this.isVisible = false;
    if (typeof onHide === "function") {
      onHide();
    }
    return this.getState();
  };

  getIsVisible = () => {
    return this.isVisible;
  };

  toggle = () => {
    const isVisible = this.getIsVisible();
    if (!isVisible) {
      this.show();
    } else {
      this.hide();
    }
    return this.getState();
  };
}
