import "./styles/main.css";
import "./styles/skins/unstyled/unstyled.css";
import { CLASSNAMES, CLOSE_MENU_SELECTOR, ERRORS } from "./lib/constants";
import { Toggler } from "./lib/Toggler";
import { trapFocus } from "./lib/utils/focusTrap";

export interface SupaMenuSettings {
  fullWidth?: boolean;
  namespace?: string;
  additionalClassName?: string;
  defaultVisible?: boolean;
  autoDetectColorScheme?: boolean;
}

let supamenuInstances = 0;

export class SupaMenu {
  defaults: SupaMenuSettings = {
    namespace: CLASSNAMES.rootElement,
    autoDetectColorScheme: true,
  };
  settings: SupaMenuSettings;
  private isVisible: boolean = false;

  events: Record<"show" | "hide", Event> = {
    show: new Event(`${CLASSNAMES.rootElement}:show`),
    hide: new Event(`${CLASSNAMES.rootElement}:hide`),
  };
  blocks: HTMLElement[] = [];

  HTMLElement: HTMLElement | undefined;
  toggleMenu: Toggler | undefined;
  instanceId: number;
  togglers: Toggler[] = [];
  currentTrappedFocus: { onClose: () => void } | undefined;
  constructor(element: HTMLElement, options: SupaMenuSettings) {
    this.settings = {
      ...this.defaults,
      ...options,
    };

    if (!element) {
      throw new Error(ERRORS.MISSING_ELEMENT_PARAM);
    } else {
      supamenuInstances += 1;
      this.instanceId = supamenuInstances;
      this.init(element);
    }
  }

  getInstanceId = () => {
    return this.instanceId;
  };

  // TODO: is this necessary ?
  createEvents = () => {
    if (!this?.HTMLElement) {
      return;
    }

    if (!this?.HTMLElement?.id) {
      throw new Error(ERRORS.MISSING_ID_ATTRIBUTE_ON_ELEMENT);
    }

    const { namespace } = this.settings;

    const showEvent = new Event(`${namespace}:${this.HTMLElement.id}:show`);
    this.events.show = showEvent;

    const hideEvent = new Event(`${namespace}:${this.HTMLElement.id}:hide`);
    this.events.hide = hideEvent;
  };

  setTabIndex = () => {
    this.HTMLElement?.setAttribute("tabindex", "-1");
  };

  handleShow = () => {
    if (!this.toggleMenu) return;
    this.isVisible = this.toggleMenu.getState().isVisible;

    document
      .querySelector("#supamenu-page")
      ?.classList.add("supamenu--menu-visible");

    this.currentTrappedFocus = trapFocus(this.getElement() as HTMLElement);

    // finally dispatch event
    this.HTMLElement?.dispatchEvent(this.events.show);
  };

  handleHide = () => {
    if (!this.toggleMenu) return;
    this.isVisible = this.toggleMenu.getState().isVisible;

    document
      .querySelector("#supamenu-page")
      ?.classList.remove("supamenu--menu-visible");

    if (this.currentTrappedFocus) {
      this.currentTrappedFocus?.onClose();
    }

    // finally dispatch event
    this.HTMLElement?.dispatchEvent(this.events.hide);
  };

  show = () => {
    if (!this.toggleMenu) return;
    this.toggleMenu.show();
  };

  hide = () => {
    if (!this.toggleMenu) return;
    this.toggleMenu.hide();
  };

  getIsVisible = () => {
    return this.isVisible;
  };

  toggle = () => {
    if (!this.toggleMenu) return;
    this.toggleMenu.toggle();
  };
  getElement = () => {
    return this?.HTMLElement;
  };

  getBlocks = () => {
    const blocks = this.getElement()?.querySelectorAll(
      ".spm__block"
    ) as NodeListOf<HTMLElement>;
    return blocks ? Array.from(blocks) : [];
  };

  setBlocks = () => {
    this.blocks = this.getBlocks();
  };

  configureBlocks = () => {
    this.blocks.forEach((block) => {
      const b = new Toggler(block, { visibleClassName: "spm__block--visible" });
      this.togglers.push(b);
      const blockToggleButton = block.querySelector(".spm__toggle-button");

      if (blockToggleButton) {
        blockToggleButton.addEventListener("click", (event) => {
          event.stopPropagation();

          if (!this.getElement()?.classList.contains("supamenu--off-canvas")) {
            const ariaControls =
              blockToggleButton.getAttribute("aria-controls");

            // hide other blocks
            this.togglers.forEach((toggler) => {
              const togglerAriaControls = toggler.element
                .querySelector(".spm__toggle-button")
                ?.getAttribute("aria-controls");

              if (toggler.isVisible && togglerAriaControls !== ariaControls) {
                toggler.hide();
                toggler.element
                  .querySelector(".spm__toggle-button")
                  ?.setAttribute("aria-expanded", "false");
              }
            });
          }

          // Toggle the wished block
          b.toggle();
          blockToggleButton?.setAttribute("aria-expanded", `${b.isVisible}`);
        });
      }
    });
  };

  handleSubMenuBlockTransitionStart = (event: Event) => {
    const currentBlock = event.currentTarget as HTMLElement;
    currentBlock.classList.add("transitioning");
  };

  handleSubMenuBlockTransitionEnd = (event: Event) => {
    const currentBlock = event.currentTarget as HTMLElement;

    currentBlock.classList.remove("transitioning");
  };

  setHTML = () => {
    const blocks = this.getBlocks();

    blocks.forEach((block, index) => {
      const subMenuBlock = block.querySelector(".spm__block__content");
      const blockToggleButton = block.querySelector(".spm__toggle-button");

      if (subMenuBlock && blockToggleButton) {
        const subMenuBlockId = subMenuBlock?.id;
        const controlId =
          subMenuBlockId ||
          `spm__block__content--${supamenuInstances}-${index.toString(36)}`;

        if (!subMenuBlockId) {
          subMenuBlock.setAttribute("id", controlId);
        }

        blockToggleButton?.setAttribute(
          "aria-expanded",
          `${block.classList.contains("spm__block--visible")}`
        );
        blockToggleButton.setAttribute("aria-controls", controlId);
      }
    });
  };

  handleScroll = () => {
    const menuHeight = this.getElement()?.offsetHeight;
    const scrollPosY = window.scrollY;

    if (menuHeight && !Number.isNaN(menuHeight) && scrollPosY > menuHeight) {
      this.getElement()?.classList.add("supamenu--scrolled");
    } else {
      this.getElement()?.classList.remove("supamenu--scrolled");
    }
  };

  handleKeyup = (event: KeyboardEvent) => {
    if (event?.key && event?.key?.toLowerCase() === "escape") {
      this.hide();
      this.togglers.forEach((t) => t.hide());
    }
  };

  setDefaultVisibility = () => {
    let mql =
      typeof window !== "undefined" && window.matchMedia("(min-width: 769px)");

    if (
      this.settings.defaultVisible ||
      (this.getElement()?.classList.contains("supamenu--classic") &&
        mql &&
        mql?.matches)
    ) {
      this.show();
    } else {
      this.hide();
    }
  };

  setColorTheme = (theme: "dark" | "light") => {
    this.HTMLElement?.setAttribute("data-theme", theme);

    if (theme === "dark") {
      this.HTMLElement?.classList.remove("supamenu--lightmode");
      this.HTMLElement?.classList.add("supamenu--darkmode");
    } else {
      this.HTMLElement?.classList.remove("supamenu--darkmode");
      this.HTMLElement?.classList.add("supamenu--lightmode");
    }
  };

  handleColorSchemeDetection = (event: MediaQueryListEvent) => {
    const newColorScheme = event.matches ? "dark" : "light";
    this.setColorTheme(newColorScheme);
  };

  addListenerForColorScheme = () => {
    const mql = window.matchMedia("(prefers-color-scheme: dark)");

    this.setColorTheme(mql?.matches ? "dark" : "light");

    mql.addEventListener("change", this.handleColorSchemeDetection);
  };

  removeListenerForColorScheme = () => {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .removeEventListener("change", this.handleColorSchemeDetection);
  };

  addListeners = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.addEventListener("scroll", this.handleScroll, { passive: true });
    window.addEventListener("keyup", this.handleKeyup);

    document.querySelectorAll(CLOSE_MENU_SELECTOR).forEach((closeButton) => {
      closeButton.addEventListener("click", this.hide);
    });

    if (this.settings.autoDetectColorScheme) {
      this.addListenerForColorScheme();
    }
  };

  removeListeners = () => {
    if (typeof window === "undefined") {
      return;
    }

    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("keyup", this.handleKeyup);

    document.querySelectorAll(CLOSE_MENU_SELECTOR).forEach((closeButton) => {
      closeButton.removeEventListener("click", this.hide);
    });

    if (this.settings.autoDetectColorScheme) {
      this.removeListenerForColorScheme();
    }
  };

  init = (element: HTMLElement) => {
    this.toggleMenu = new Toggler(element, {
      onShow: this.handleShow,
      onHide: this.handleHide,
      visibleClassName: CLASSNAMES.visible,
    });
    this.HTMLElement = this.toggleMenu.getState().element;

    this.createEvents();
    this.setTabIndex();
    this.setHTML();
    this.setBlocks();
    this.configureBlocks();
    this.addListeners();
    this.setDefaultVisibility();
  };

  destroy = () => {
    this.removeListeners();
  };
}
