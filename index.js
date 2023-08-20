import { SupaMenu } from "./dist/index.js";

const menuTrigger1 = document.querySelector("#menu-1-trigger");
const menuElement1 = document.querySelector("#menu-1");

if (menuElement1 && menuTrigger1) {
  const menu1 = new SupaMenu(menuElement1);

  menuTrigger1?.setAttribute?.("aria-expanded", `${menu1.getIsVisible()}`);

  menuTrigger1?.addEventListener("click", () => {
    menu1.toggle();
    menuTrigger1.setAttribute("aria-expanded", `${menu1.getIsVisible()}`);
  });

  const elem = menu1.getElement();

  elem?.addEventListener("supamenu:menu-1:show", () => {
    console.log("SHOW!!!");
    console.log("VISIBLE: ", menu1.isVisible);
  });

  elem?.addEventListener("supamenu:menu-1:hide", () => {
    console.log("HIDE!!!");
    console.log("VISIBLE: ", menu1.isVisible);
  });
}

// menu 2
const menuElement2 = document.querySelector("#menu-2");
const menuTrigger2 = document.querySelector("#menu-2-trigger");

if (menuElement2) {
  const menu2 = new SupaMenu(menuElement2);

  const elem2 = menu2.getElement();

  elem2?.addEventListener("supamenu:menu-2:hide", () => {
    document.body.style.overflow = "";
  });

  if (menuTrigger2) {
    menuTrigger2?.setAttribute?.("aria-expanded", `${menu2.getIsVisible()}`);
    menuTrigger2?.addEventListener("click", () => {
      menu2.toggle();
      menuTrigger2.setAttribute("aria-expanded", `${menu2.getIsVisible()}`);
      document.body.style.overflow = menu2.getIsVisible() ? "hidden" : "";
    });
  }
}

const menuElements = document.querySelectorAll(".supamenu");
const classesSelectors = document.querySelectorAll(".class-selector");

const preselectThemeFromUserPreferences = () => {
  const mql = window.matchMedia("(prefers-color-scheme: dark)");

  const theme = mql?.matches ? "dark" : "light";

  if (theme === "dark") {
    document.body.setAttribute("data-theme", theme);
  }

  const themeSelectors = document.querySelectorAll(
    'input[name="menu-classes"]'
  );

  themeSelectors.forEach((ts) => {
    if (ts.value === `supamenu--${theme}mode`) {
      ts.checked = true;
    }
  });
};

preselectThemeFromUserPreferences();

classesSelectors.forEach((classesSelector) => {
  classesSelector.addEventListener("change", (event) => {
    const formValues = [...event.currentTarget.elements].map((el) => ({
      value: el.value,
      checked: el.checked,
    }));

    formValues.forEach((v) => {
      if (v.checked) {
        menuElements.forEach((menu) => {
          menu.classList.add(v.value);

          if (v.value === "supamenu--darkmode") {
            document.body.classList.remove("lightmode");
            document.body.classList.add("darkmode");
            document.body.setAttribute("data-theme", "dark");
            menu.setAttribute("data-theme", "dark");
          }
          if (v.value === "supamenu--lightmode") {
            document.body.classList.remove("darkmode");
            document.body.classList.add("lightmode");
            document.body.removeAttribute("data-theme");
            menu.setAttribute("data-theme", "light");
          }
        });
      } else {
        menuElements.forEach((menu) => {
          menu.classList.remove(v.value);
          if (v.value === "supamenu--darkmode") {
            document.body.classList.remove("darkmode");
          }
          if (v.value === "supamenu--lightmode") {
            document.body.classList.remove("lightmode");
          }
        });
      }
    });
  });

  if ("createEvent" in document) {
    const evt = document.createEvent("HTMLEvents");
    evt.initEvent("change", false, true);
    classesSelector.dispatchEvent(evt);
  } else {
    classesSelector.fireEvent("onchange");
  }
});

const colorSelector = document.querySelector("#accent-color");

if (colorSelector) {
  colorSelector.addEventListener("change", (event) => {
    const { value } = event.target;

    if (value) {
      const root = document.querySelector(":root");
      if (root) {
        root.style.setProperty("--supamenu-accent-color", value);
      }
      const menus = document.querySelectorAll(".supamenu");
      menus.forEach((m) => {
        m.style.setProperty("--supamenu-accent-color", value);
      });
    }
  });
}

const currentHref = window.location.pathname;
document.querySelectorAll(`a[href*="${currentHref}"]`).forEach((elem) => {
  elem.classList.add("active");

  const parentBlock = elem.closest(".spm__block");
  const toggleButton =
    parentBlock && parentBlock.querySelector(".spm__toggle-button");

  if (toggleButton) {
    const menus = document.querySelectorAll(".supamenu");
    menus.forEach((menu) => {
      menu.querySelectorAll(".spm__toggle-button").forEach((b) => {
        b.classList.remove("active");
      });
    });
    toggleButton.classList.add("active");
  }
});
