#import "FeedCollectionViewCell.h"

@implementation FeedCollectionViewCell

- (instancetype)initWithFrame:(CGRect)frame {
    if (self = [super initWithFrame:frame]) {
        self.playerLayer = [AVPlayerLayer playerLayerWithPlayer:nil];
        self.playerLayer.videoGravity = AVLayerVideoGravityResizeAspectFill;
        [self.contentView.layer addSublayer:self.playerLayer];
    }
    return self;
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.playerLayer.frame = self.contentView.bounds;
}

- (void)attachPlayer:(AVPlayer *)player {
    self.playerLayer.player = player;
}

- (void)detachPlayer {
    self.playerLayer.player = nil;
}

@end
