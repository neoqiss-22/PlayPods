FeedView API (design contract)

Props (from JS -> native)
- feedCursor: string | null — opaque identifier for the feed cursor or query
- initialIndex: number — index to open initially
- prefetchAhead: number — how many items ahead to prefetch (default 2)
- itemConfig: object — optional per-item configuration (e.g., aspect ratio)
- style: ViewStyle — standard view style

Events (native -> JS)
- onItemVisible({ id, index }) — emitted when an item becomes visible
- onItemPress({ id, index }) — user pressed the item (tap)
- onScrollStateChange({ state }) — state: 'dragging' | 'settling' | 'idle'
- onPrefetchComplete({ id }) — optional per-item prefetch completion

Commands (JS -> native)
- playItem(id) — start playback for item with id
- pauseAll() — pause all players
- seekItem(id, positionMs) — seek item to position
- refreshFeed(cursor) — update feed cursor

Safety/contract notes
- Minimize events sent to JS (batch or throttle if needed).
- Native side must manage a player pool and reuse surfaces/textures.
- Expose minimal synchronous APIs via JSI only when needed (layout queries, small lookups).

Implementation notes
- Android: RecyclerView + ExoPlayer instances
- iOS: UICollectionView + AVPlayer instances
- Shared logic (player pooling/caching) can be implemented in C++/Rust and exposed with JSI for parity.

