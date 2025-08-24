#import <Foundation/Foundation.h>
#import <AVFoundation/AVFoundation.h>

NS_ASSUME_NONNULL_BEGIN

@interface PlayerPool : NSObject

- (instancetype)initWithMaxSize:(NSInteger)maxSize;
- (AVPlayer *)acquirePlayerForId:(NSString *)itemId withURL:(NSURL *)url;
- (void)releasePlayerForId:(NSString *)itemId;
- (void)pauseAll;
- (void)releaseAll;

@end

NS_ASSUME_NONNULL_END
