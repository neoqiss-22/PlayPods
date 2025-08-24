#import "FeedView.h"

@implementation FeedView

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        [self commonInit];
    }
    return self;
}

- (void)commonInit {
    // TODO: set up UICollectionView, player pool, gesture recognizers
}

- (void)playItem:(NSString *)itemId {
    // native play implementation
}

- (void)pauseAll {
    // native pause implementation
}

- (void)refreshFeed:(NSString *)cursor {
    // native refresh implementation
}

@end
