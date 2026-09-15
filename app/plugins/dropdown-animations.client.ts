import { Dropdown } from 'bootstrap'

// Keep this in sync with $shadcn-duration in _shadcn.scss.
const ANIM_MS = 150
const ANIM_IN_CLASS = 'dropdown-menu-anim-in'
const ANIM_CLOSING_CLASS = 'dropdown-menu-closing'
const FORCE_HIDE_FLAG = 'dropdownForceHide'

function getMenu(toggle: HTMLElement): HTMLElement | null {
  const wrapper = toggle.closest('.dropdown, .dropup, .dropend, .dropstart, .btn-group, .input-group')
  return wrapper?.querySelector<HTMLElement>(':scope > .dropdown-menu') ?? null
}

export default defineNuxtPlugin(() => {
  // Popper (used by Bootstrap for positioning) sets its own inline
  // `transform: translate3d(...)` on the menu for placement. Inline styles
  // beat anything in a stylesheet, so it silently overrides our `transform:
  // scale(...)` and the menu ends up only fading like plain Bootstrap.
  // Telling Popper's computeStyles modifier to position via top/left instead
  // frees up `transform` entirely for our own animation.
  Dropdown.Default.popperConfig = (defaultConfig: Record<string, unknown>) => ({
    ...defaultConfig,
    modifiers: [
      ...(defaultConfig.modifiers as unknown[]),
      { name: 'computeStyles', options: { adaptive: false, gpuAcceleration: false } },
    ],
  })

  // Bootstrap adds `.show` synchronously, so the menu paints once at its
  // closed (opacity:0/scale:.95) state before we flip on the "animate in"
  // class on the next frame — that's what actually produces a transition
  // instead of an instant jump.
  document.addEventListener('shown.bs.dropdown', (event) => {
    const toggle = event.target as HTMLElement
    const menu = getMenu(toggle)
    if (!menu) return

    menu.classList.remove(ANIM_IN_CLASS)
    void menu.offsetHeight
    requestAnimationFrame(() => {
      menu.classList.add(ANIM_IN_CLASS)
    })
  })

  // Bootstrap's own `hide()` removes `.show` (and therefore `display`)
  // immediately, leaving no time to animate out. We intercept it, play the
  // closing transition ourselves keeping the menu visible, then let the real
  // hide go through once the animation is done.
  document.addEventListener('hide.bs.dropdown', (event) => {
    const toggle = event.target as HTMLElement

    if (toggle.dataset[FORCE_HIDE_FLAG] === '1') {
      delete toggle.dataset[FORCE_HIDE_FLAG]
      return
    }

    const menu = getMenu(toggle)
    if (!menu) return

    if (menu.classList.contains(ANIM_CLOSING_CLASS)) {
      event.preventDefault()
      return
    }

    event.preventDefault()
    menu.classList.remove(ANIM_IN_CLASS)
    menu.classList.add(ANIM_CLOSING_CLASS)

    let finished = false
    const finish = () => {
      if (finished) return
      finished = true
      menu.removeEventListener('transitionend', onTransitionEnd)
      clearTimeout(fallback)
      menu.classList.remove(ANIM_CLOSING_CLASS)
      toggle.dataset[FORCE_HIDE_FLAG] = '1'
      Dropdown.getOrCreateInstance(toggle).hide()
    }

    const onTransitionEnd = (transitionEvent: TransitionEvent) => {
      if (transitionEvent.target === menu) finish()
    }

    menu.addEventListener('transitionend', onTransitionEnd)
    const fallback = window.setTimeout(finish, ANIM_MS + 60)
  })
})
