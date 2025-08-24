FeedView native module

This folder contains the design contract and platform stubs for the native `FeedView` component. The intent is to implement a high-performance, native feed (player pooling, prefetch, recycling) and expose a minimal JS wrapper.

Next steps:
- Implement Android `FeedView` under `android/`
- Implement iOS `FeedView` under `ios/`
- Create a JS wrapper under `src/components/native/FeedView`
- Iterate on FEED_API.md and add JSI bindings if synchronous calls are required

