#import <UIKit/UIKit.h>
#import <AVFoundation/AVFoundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface FeedCollectionViewCell : UICollectionViewCell

@property (nonatomic, strong) AVPlayerLayer *playerLayer;
@property (nonatomic, strong) NSString *itemId;

- (void)attachPlayer:(AVPlayer *)player;
- (void)detachPlayer;

@end

NS_ASSUME_NONNULL_END
