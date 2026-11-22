# v2.49
- Hero rebuilt to be fluid on every screen: 2-column on desktop, single column + 2-up panel on tablet (<=900px), compact stacked layout on phones (<=560px, extra tuning at <=360px). Full-width 48px buttons, pill quick-links, smaller type, no overflow. Glow blobs are now plain radial gradients (no blur filter), dots hidden on phones, backdrop-filter only on large screens. Goal ring has a no-`@property` fallback.
- Session results: "Learning snapshot" is animated simply (tiles rise in one by one, icons pop, accent bar draws, numbers count up) and the accuracy ring fills up.
- "Review these" word cards now have an orbiting glow on the outline plus a soft pulse (first 12 orbit, the rest keep a steady lit outline). Reduced-motion = static lit outline.
- Custom red cursor (v2.47) removed: the normal system cursor is back.
- Cache-bust ?v=2.49.
