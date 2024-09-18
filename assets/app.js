import "./scss/style.sass"

// вехрний баннер
import "./scss/main-slider.sass"
// Популярные товары
import "./scss/popular.sass"
// Продукт в популярном и недавно просмотренном
import "./scss/product.sass"
// Специальные предложения
import "./scss/special-offer.sass"
// Вы недавно просматривали
import "./scss/viewed.sass"
// Узнайте больше о продукции
import "./scss/learn-more.sass"
// Ремонтные шипы в Спб
import "./scss/seo-text.sass"

import Swiper from "swiper"
import {
  Navigation,
  Pagination,
  Autoplay,
} from "swiper/modules"

import "swiper/css/bundle"

export default function headerEventListeners() {
    const width = window.innerWidth;

    if (width >= 1300) {
        addHeaderBurgerEventListeners()
        addCartPreviewListeners()
    }
    else addMobileBurgerEventListeners();

    addSublistEventListener();
    addSearchBoxEventListeners();
}

function addHeaderBurgerEventListeners() {
    const headerBurgerWrapper = document.querySelector('.header__burger-wrapper');

    if (headerBurgerWrapper) {
        const innerMenu = document.querySelector('.inner-menu');
        const innerMenuList = innerMenu.querySelector('.inner-menu__list')
        const headerBurger = document.querySelector('.header__burger');

        headerBurgerWrapper.addEventListener('mouseenter', () => {
            innerMenu.classList.add('show');
            headerBurger.classList.add('opened');

            headerBurgerWrapper.addEventListener('mouseleave', () => {
                let timeOut = setTimeout(() => {
                    innerMenu.classList.remove('show');
                    headerBurger.classList.remove('opened');
                    clearTimeout(timeOut);
                }, 1500);

                innerMenu.addEventListener('mouseleave', () => {
                    let timeOutInner = setTimeout(() => {
                        innerMenu.classList.remove('show');
                        innerMenu.querySelector('.submenu.show')?.classList.remove('show');
                        headerBurger.classList.remove('opened');
                        clearTimeout(timeOutInner);
                    }, 1500);

                    innerMenu.addEventListener('mouseenter', (e) => {
                        clearTimeout(timeOutInner);
                    })
                });

                innerMenu.addEventListener('mouseenter', (e) => {
                    clearTimeout(timeOut);
                })

                headerBurger.addEventListener('mouseenter', (e) => {
                    clearTimeout(timeOut);
                })
            });

            localStorage.removeItem('innerMenuSublist')

            innerMenuList.children.forEach(item => {
                if (item.classList.contains('inner-menu__sublist')) {
                    item.addEventListener('mouseenter', (e) => {
                        if (item === e.target) {
                            localStorage.setItem('innerMenuSublist', item.textContent.trim());
                        }
                    })
                } else {
                    item.addEventListener('mouseenter', (e) => {
                        localStorage.removeItem('innerMenuSublist')
                    })
                }
            })
        })
    }
}

function addSublistEventListener() {
    const subLists = [...document.querySelectorAll('.sublist')];
    const subSubLists = [...document.querySelectorAll('.sublist_sub')];
    let sublistId = null;
    let subSubListId = null;

    subLists.forEach(sublist => {
        sublist.addEventListener('mouseenter', () => {
            document.querySelector(`.submenu[data-submenu='${sublistId}']`)?.classList.remove('show');
            sublistId = sublist.getAttribute('id');
            document.querySelector(`.submenu[data-submenu='${sublistId}']`).classList.add('show');

            [...document.querySelectorAll('.lvl1')].forEach(lvl => {
                lvl.addEventListener('mouseenter', () => {
                    document.querySelector(`.submenu[data-submenu='${sublistId}']`)?.classList.remove('show');
                });
            })
        })
    })

    subSubLists.forEach(sublist => {
        sublist.addEventListener('mouseenter', () => {
            document.querySelector(`.submenu-sub[data-submenu='${subSubListId}']`)?.classList.remove('show');
            subSubListId = sublist.getAttribute('id');
            document.querySelector(`.submenu-sub[data-submenu='${subSubListId}']`).classList.add('show');

            [...document.querySelectorAll('.lvl2')].forEach(lvl => {
                lvl.addEventListener('mouseenter', () => {
                    document.querySelector(`.submenu-sub[data-submenu='${subSubListId}']`)?.classList.remove('show');
                });
            });

            [...document.querySelectorAll('.lvl1')].forEach(lvl => {
                lvl.addEventListener('mouseenter', () => {
                    document.querySelector(`.submenu-sub[data-submenu='${subSubListId}']`)?.classList.remove('show');
                });
            });
        })
    })
}

function addSearchBoxEventListeners() {
    const searchBox = document.querySelector('.search-box');
    const searchText = document.querySelector('.search-txt');
    const searchTextMobile = document.querySelector('.search-txt-mobile');
    const searchBtn = document.querySelector('.search-btn');
    const searchBtnMobile = document.querySelector('.search-btn-mobile');

    if (searchBtnMobile) {
        searchBtnMobile.addEventListener('click', () => {
            window.location = window.location.origin + '/search?q=' + searchTextMobile.value
        })
    }

    searchBox.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            window.location = window.location.origin + '/search?q=' + searchText.value
        }
    })

    if (searchBtn) {
        searchBtn.addEventListener('click', () => {
            searchBox.classList.add('opened');
            searchBtn.classList.add('opened');
        });

        document.addEventListener('click', event => {
            if (!(searchText === event.target) && !searchBtn.contains(event.target)) {
                searchBox.classList.remove('opened');
                searchBtn.classList.remove('opened');
            }
        })
    }
}

function addMobileBurgerEventListeners() {
    const headerBurger = document.querySelector('.header__burger');
    const catalogMobileBtn = document.querySelector('.header__catalog-menu');

    if (headerBurger) {
        headerBurger.addEventListener('click', event => {
            headerBurger.classList.toggle('opened');
            headerBurger.closest('.header').querySelector('.header__mobile-menu').classList.toggle('opened');
            document.querySelector('html').classList.toggle('menuIsOpen');
        });
    }

    document.addEventListener('click', (evt) => {
        const target = evt.target
        if (target.closest('[data-open-submenu]')) {
            const menuName = target.closest('[data-open-submenu]').dataset.name
            const submenu = document.querySelector(`[data-menu=${menuName}]`)
            submenu.classList.add('visible')
            return
        }
        if (target.closest('[data-close-submenu]')) {
            const menuName = target.closest('[data-close-submenu]').dataset.name
            const submenu = document.querySelector(`[data-menu=${menuName}]`)
            submenu.classList.remove('visible')
        }
    })

    if (catalogMobileBtn) {
        catalogMobileBtn.addEventListener('click', () => {
            const submenu = document.querySelector('[data-menu="catalog"]');
            submenu?.classList?.add?.('visible')
            setTimeout(() => {
                headerBurger.click();
            }, 100)
        })
    }
}

function addCartPreviewListeners() {
    const basket = document.querySelector('.header__basket'),
        cartPreview = document.querySelector('.cart-preview')
    if(basket && window.location.pathname !== '/order') {
        document.addEventListener('pointerover', (evt) => {
            if(evt.target.closest('.header__basket') || evt.target.closest('.cart-preview')) {
                addClass(cartPreview, 'active')
                addClass(cartPreview, 'hovered')
            }
        })

        basket.addEventListener('pointerleave', () => {
            removeClass(cartPreview, 'hovered')
            setTimeout(() => !cartPreview.classList.contains('hovered') && removeClass(cartPreview, 'active'), 500)
        })
        cartPreview.addEventListener('pointerleave', () => {
            removeClass(cartPreview, 'hovered')
            setTimeout(() => !cartPreview.classList.contains('hovered') && removeClass(cartPreview, 'active'), 500)
        })
    }
}

document.addEventListener('DOMContentLoaded', () => {
  headerEventListeners();
})

export function initMainPageSliders() {
  let mainSlider = new Swiper(".main-slider__inner", {
    slidesPerView: 1,
    centeredSlides: true,
    loop: true,

    modules: [Navigation, Pagination, Autoplay],

    autoplay: {
      delay: 9000,
    },

    navigation: {
      nextEl: ".main-slider__btn-next",
      prevEl: ".main-slider__btn-prev",
    },

    pagination: {
      el: ".main-slider__pagination",
      clickable: true,
    },

    scrollbar: {
      el: ".main-slider__scrollbar",
    },

    breakpoints: {
      768: {
        // slidesPerView: 'auto',
        spaceBetween: 21,
      },

      1300: {
        // slidesPerView: 'auto',
        spaceBetween: 34,
      },
    },
  })

  ;[".popular", ".viewed", ".others"].forEach((swiper) => {
    new Swiper(`${swiper}__slider`, {
      modules: [Navigation],
      slidesPerView: 1.2,
      autoplay: false,
      centeredSlides: false,
      spaceBetween: 10,
      rewind: true,
      navigation: {
        nextEl: `${swiper}__btn-next`,
        prevEl: `${swiper}__btn-prev`,
      },
      breakpoints: {
        414: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 26,
        },
        1180: {
          slidesPerView: 4,
        },
        1440: {
          slidesPerView: 5,
        },
      },
    })
  })

  let specialOfferSlider = new Swiper(".special-offer__slider", {
    slidesPerView: 1,
    autoplay: false,
    centeredSlides: false,
    spaceBetween: 17,
    rewind: true,
    modules: [Navigation],
    navigation: {
      nextEl: ".special-offer__btn-next",
      prevEl: ".special-offer__btn-prev",
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 34,
      },
      1300: {
        slidesPerView: 3,
      },
    },
  })
}

initMainPageSliders()

let timeout = null
let timeoutInput = null

function getProductInput(element) {
  return element.closest(".qty").querySelector(".item_qty")
}

function getProductButton(element) {
  return element.closest(".qty").querySelector(".product__basket")
}

function changeInputQty(element) {
  const input = getProductInput(element)

  input.addEventListener("input", () => {
    clearTimeout(timeoutInput)

    timeoutInput = setTimeout(async () => {
      const sendData = new FormData()
      sendData.append("qty_cart[quantity]", `${+input.value}`)
      sendData.append("qty_cart[currency]", "RUB")
      sendData.append("qty_cart[change]", "1")
    }, 300)
  })
}

function changeProductQty(element) {
  const input = getProductInput(element)

  const sendData = new FormData()
  sendData.append("qty_cart[quantity]", `${+input.value}`)
  sendData.append("qty_cart[currency]", "RUB")
  sendData.append("qty_cart[change]", "1")

  clearTimeout(timeout)
}

async function addProductToCart(element) {
  const input = getProductInput(element)

  const fd = new FormData()

  fd.append("add_to_cart[quantity]", `${+input.value}`)
  fd.append("add_to_cart[currency]", "RUB")
  fd.append("add_to_cart[add]", "1")
}

function removeFromCart(element) {
  const product = element.closest("[data-product]")
  const input = product.querySelector(".item_qty")

  const sendData = new FormData()
  sendData.append("remove_cart[quantity]", `${input.value}`)
  sendData.append("remove_cart[currency]", "RUB")
  sendData.append("remove_cart[remove]", "1")
}

function changeItemQty(element, isIncrease) {
  const input = getProductInput(element)
  const value = +input.value

  if (isIncrease) {
    value === 100 ? (input.value = value) : (input.value = value + 1)
  } else {
    value === 1 ? (input.value = value) : (input.value = value - 1)
  }
}

function handlePlusMinus(element, isIncrease) {
  const button = getProductButton(element)

  changeItemQty(element, isIncrease)

  if ((button && button.classList.contains("to_basket")) || !button) {
    changeProductQty(element)
  }
}

function handleBasketButton(element) {
  switch (true) {
    case element.classList.contains("to_basket"): {
      window.location.href = "/cart"
      break
    }
    default: {
      addProductToCart(element)
      break
    }
  }
}

function handleRemoveButton(element) {
  !!element.closest("[data-delete-product]")
    ? removeFromCart(element)
    : clearCart()
}

document.addEventListener("DOMContentLoaded", () => {

  window.addEventListener("click", (event) => {
    const target = event.target

    switch (true) {
      case target.classList.contains("plus_button"): {
        handlePlusMinus(target, true)
        break
      }

      case target.classList.contains("minus_button"): {
        handlePlusMinus(target, false)
        break
      }

      case target.classList.contains("item_qty"): {
        changeInputQty(target)
        break
      }

      case target.classList.contains("product__basket"): {
        handleBasketButton(target)
        break
      }

      case !!target.closest("[data-delete-product]") ||
        !!target.closest(".cart-preview__clear"): {
        handleRemoveButton(target)
        break
      }
    }
  })
})
