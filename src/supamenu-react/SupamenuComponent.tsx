import { useEffect, useRef } from "react";

import { SupaMenu, type SupaMenuSettings } from "../index";

const SupamenuComponent = ({ config }: { config: SupaMenuSettings }) => {
  const menuElRef = useRef<HTMLElement | null>(null);
  const loadedSupamenu = useRef<SupaMenu | null>(null);

  useEffect(() => {
    if (config && menuElRef.current && !loadedSupamenu?.current) {
      loadedSupamenu.current = new SupaMenu(menuElRef.current, config);
    }
  }, []);

  return (
    <nav className="supamenu" ref={menuElRef}>
      <button
        type="button"
        className="spm__close-menu-button"
        aria-label="close menu"
      >
        <span className="spm-icon spm-icon--cross"></span>
      </button>

      <div className="spm-container spm-inner-container">
        <div className="spm-component align-left">
          <div className="spm-logo">supamenu</div>
        </div>
        <div className="spm__block">
          <p className="spm__block__title">
            Variants
            <button type="button" className="spm__toggle-button">
              <span className="visuallyhidden">Show submenu for "Block 1"</span>
              <span className="spm-icon spm-icon--triangle" aria-hidden></span>
            </button>
          </p>
          <div className="spm__block__content">
            <ul className="spm__list">
              <li className="spm__list__item">
                <a href="/modal.html">modal menu</a>
              </li>
              <li className="spm__list__item">
                <a href="/off-canvas.html">off canvas menu</a>
              </li>
              <li className="spm__list__item">
                <a href="/unstyled.html">unstyled menu</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="spm__block">
          <p className="spm__block__title">
            <a href="">About</a>
            <button type="button" className="spm__toggle-button">
              <span className="visuallyhidden">Show submenu for "About"</span>
              <span className="spm-icon spm-icon--triangle" aria-hidden></span>
            </button>
          </p>
          <div className="spm__block__content">
            <ul className="spm__list">
              <li className="spm__list__item">
                <a href="">Lorem ipsum dolor sit.</a>
              </li>
              <li className="spm__list__item">
                <a href="">Lorem, ipsum dolor.</a>
              </li>
              <li className="spm__list__item">
                <a href="">Lorem ipsum dolor sit amet consectetur.</a>
              </li>
              <li className="spm__list__item">
                <a href="">Lorem, ipsum.</a>
              </li>
              <li className="spm__list__item">
                <a href="">
                  Lorem ipsum dolor sit amet consectetur adipisicing.
                </a>
              </li>
              <li className="spm__list__item">
                <a href="">Lorem ipsum dolor sit.</a>
              </li>
              <li className="spm__list__item">
                <a href="">Lorem ipsum dolor sit.</a>
              </li>
              <li className="spm__list__item">
                <a href="">Lorem, ipsum dolor.</a>
              </li>
              <li className="spm__list__item">
                <a href="">Lorem ipsum dolor sit amet consectetur.</a>
              </li>
              <li className="spm__list__item">
                <a href="">Lorem, ipsum.</a>
              </li>
              <li className="spm__list__item">
                <a href="">
                  Lorem ipsum dolor sit amet consectetur adipisicing.
                </a>
              </li>
              <li className="spm__list__item">
                <a href="">Lorem ipsum dolor sit.</a>
              </li>
              <li className="spm__list__item">
                <a href="">Lorem ipsum dolor sit.</a>
              </li>
              <li className="spm__list__item">
                <a href="">Lorem, ipsum dolor.</a>
              </li>
              <li className="spm__list__item">
                <a href="">Lorem ipsum dolor sit amet consectetur.</a>
              </li>
              <li className="spm__list__item">
                <a href="">Lorem, ipsum.</a>
              </li>
              <li className="spm__list__item">
                <a href="">
                  Lorem ipsum dolor sit amet consectetur adipisicing.
                </a>
              </li>
              <li className="spm__list__item">
                <a href="">Lorem ipsum dolor sit.</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="spm__block spm__mega">
          <p className="spm__block__title">
            Mega menu
            <button type="button" className="spm__toggle-button">
              <span className="visuallyhidden">
                Show submenu for "Mega Menu"
              </span>
              <span className="spm-icon spm-icon--triangle" aria-hidden></span>
            </button>
          </p>
          <div className="spm__block__content spm__mega__panel">
            <div className="spm-container">
              <div className="spm__mega__panel__content">
                <div className="spm__mega__panel__content__block">
                  <p className="spm__mega__panel__content__block__title">
                    Lorem, ipsum.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quam corporis sunt enim non sint nesciunt nostrum ullam
                    ratione ab amet voluptas esse maxime fuga ipsa
                    exercitationem expedita, repellendus, aspernatur magni ad
                    eius? Officia facere fuga accusamus assumenda eos totam,
                    debitis sequi sint repellat corporis. Maiores accusamus aut
                    consequuntur molestias deserunt, id eveniet quaerat ipsa
                    quibusdam voluptatum impedit veritatis molestiae minus!
                  </p>
                  <div>
                    <a href="">Learn more &rarr;</a>
                  </div>
                </div>
                <div className="spm__mega__panel__content__block">
                  <p className="spm__mega__panel__content__block__title">
                    Lorem, ipsum dolor.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quam corporis sunt enim non sint nesciunt nostrum ullam
                    ratione ab amet voluptas esse maxime fuga ipsa
                    exercitationem expedita, repellendus, aspernatur magni ad
                    eius? Officia facere fuga accusamus assumenda eos totam,
                    debitis sequi sint repellat corporis. Maiores accusamus aut
                    consequuntur molestias deserunt, id eveniet quaerat ipsa
                    quibusdam voluptatum impedit veritatis molestiae minus!
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Accusamus illo officia cupiditate, excepturi quod saepe quis
                    possimus quisquam molestiae, deleniti eius rem culpa error
                    architecto nam, corrupti ab nisi! Excepturi.
                  </p>
                  <div>
                    <a href="">Learn more &rarr;</a>
                  </div>
                </div>
                <div className="spm__mega__panel__content__block">
                  <p className="spm__mega__panel__content__block__title">
                    Lorem, ipsum dolor.
                  </p>
                  <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Quam corporis sunt enim non sint nesciunt nostrum ullam
                    ratione ab amet voluptas esse maxime fuga ipsa
                    exercitationem expedita, repellendus, aspernatur magni ad
                    eius? Officia facere fuga accusamus assumenda eos totam,
                    debitis sequi sint repellat corporis. Maiores accusamus aut
                    consequuntur molestias deserunt, id eveniet quaerat ipsa
                    quibusdam voluptatum impedit veritatis molestiae minus!
                  </p>
                  <div>
                    <a href="">Learn more &rarr;</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="spm-component align-right">
          <div className="spm-search">
            <span
              className="spm-icon spm-icon--m-glass spm-search__icon"
              aria-hidden
            ></span>
            <input type="search" aria-label="search" placeholder="Search.." />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SupamenuComponent;
