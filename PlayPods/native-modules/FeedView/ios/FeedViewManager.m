#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "FeedView.h"

@interface FeedViewManager : RCTViewManager
@end

@implementation FeedViewManager

RCT_EXPORT_MODULE(FeedView)

- (UIView *)view {
  FeedView *view = [[FeedView alloc] initWithFrame:CGRectZero];
  view.backgroundColor = [UIColor blackColor];
  return view;
}

// Exported methods (commands)
RCT_EXPORT_METHOD(playItem:(nonnull NSNumber *)node itemId:(NSString *)itemId) {
  // Implement command: find view by react tag and call play
  // Placeholder: no-op
}

RCT_EXPORT_METHOD(pauseAll:(nonnull NSNumber *)node) {
  // Placeholder: no-op
}

RCT_EXPORT_METHOD(refreshFeed:(nonnull NSNumber *)node cursor:(NSString *)cursor) {
  // Placeholder: no-op
}

@end
