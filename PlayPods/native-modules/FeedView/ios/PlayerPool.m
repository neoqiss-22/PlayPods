#import "PlayerPool.h"

@interface PlayerPool ()
@property (nonatomic, strong) NSMutableDictionary<NSString*, AVPlayer*> *inUse;
@property (nonatomic, strong) NSMutableArray<AVPlayer*> *available;
@property (nonatomic, assign) NSInteger maxSize;
@end

@implementation PlayerPool

- (instancetype)initWithMaxSize:(NSInteger)maxSize {
    if (self = [super init]) {
        _maxSize = maxSize;
        _inUse = [NSMutableDictionary new];
        _available = [NSMutableArray new];
    }
    return self;
}

- (AVPlayer *)createPlayer {
    AVPlayer *p = [AVPlayer new];
    return p;
}

- (AVPlayer *)acquirePlayerForId:(NSString *)itemId withURL:(NSURL *)url {
    AVPlayer *player = nil;
    if (self.available.count > 0) {
        player = [self.available lastObject];
        [self.available removeLastObject];
    } else if (self.inUse.count < self.maxSize) {
        player = [self createPlayer];
    } else {
        // Reuse first in-use player
        NSString *victimKey = self.inUse.keyEnumerator.nextObject;
        AVPlayer *victim = self.inUse[victimKey];
        [victim pause];
        [self.inUse removeObjectForKey:victimKey];
        player = victim ?: [self createPlayer];
    }

    if (player && url) {
        AVPlayerItem *item = [AVPlayerItem playerItemWithURL:url];
        [player replaceCurrentItemWithPlayerItem:item];
    }
    if (player && itemId) {
        self.inUse[itemId] = player;
    }
    return player;
}

- (void)releasePlayerForId:(NSString *)itemId {
    AVPlayer *player = self.inUse[itemId];
    if (player) {
        [player pause];
        [self.inUse removeObjectForKey:itemId];
        if (self.available.count < self.maxSize) {
            [self.available addObject:player];
        } else {
            // Let ARC release
        }
    }
}

- (void)pauseAll {
    for (AVPlayer *p in self.inUse.allValues) {
        [p pause];
    }
    for (AVPlayer *p in self.available) {
        [p pause];
    }
}

- (void)releaseAll {
    [self.inUse removeAllObjects];
    [self.available removeAllObjects];
}

@end
