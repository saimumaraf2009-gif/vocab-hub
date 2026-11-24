# v2.62 — Collapsible sidebar
- Round chevron handle on the sidebar's right edge (desktop, >800px) collapses the nav to a 76px icon rail and expands it again; content area widens smoothly.
- Collapsed rail keeps all icons (native tooltips via title), logo, section dividers and the creator avatar.
- Choice is remembered (localStorage `vh_nav_collapsed`) and applied before first paint (no flash).
- Mobile bottom dock is unchanged. Cache keys + service worker v2.62.
