#import "FeedView.h"
#import "PlayerPool.h"
#import "FeedCollectionViewCell.h"

@interface FeedView () <UICollectionViewDataSource, UICollectionViewDelegate>
@property (nonatomic, strong) UICollectionView *collectionView;
@property (nonatomic, strong) NSArray<NSDictionary*> *items;
@property (nonatomic, strong) PlayerPool *playerPool;
@end

@implementation FeedView

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        [self commonInit];
    }
    return self;
}

- (void)commonInit {
    UICollectionViewFlowLayout *layout = [UICollectionViewFlowLayout new];
    layout.itemSize = CGSizeMake(self.bounds.size.width, self.bounds.size.height);
    layout.minimumLineSpacing = 0;
    layout.scrollDirection = UICollectionViewScrollDirectionVertical;

    self.collectionView = [[UICollectionView alloc] initWithFrame:self.bounds collectionViewLayout:layout];
    self.collectionView.dataSource = self;
    self.collectionView.delegate = self;
    [self.collectionView registerClass:[FeedCollectionViewCell class] forCellWithReuseIdentifier:@"cell"];
    self.collectionView.pagingEnabled = YES;
    [self addSubview:self.collectionView];

    self.playerPool = [[PlayerPool alloc] initWithMaxSize:3];
    self.items = @[];
}

- (void)layoutSubviews {
    [super layoutSubviews];
    self.collectionView.frame = self.bounds;
}

- (void)setItemsFromJson:(NSString *)json {
    if (!json) return;
    NSData *data = [json dataUsingEncoding:NSUTF8StringEncoding];
    NSError *err = nil;
    NSArray *arr = [NSJSONSerialization JSONObjectWithData:data options:0 error:&err];
    if ([arr isKindOfClass:[NSArray class]]) {
        self.items = arr;
        [self.collectionView reloadData];
    }
}

- (NSInteger)collectionView:(UICollectionView *)collectionView numberOfItemsInSection:(NSInteger)section {
    return self.items.count;
}

- (UICollectionViewCell *)collectionView:(UICollectionView *)collectionView cellForItemAtIndexPath:(NSIndexPath *)indexPath {
    FeedCollectionViewCell *cell = [collectionView dequeueReusableCellWithReuseIdentifier:@"cell" forIndexPath:indexPath];
    NSDictionary *item = self.items[indexPath.item];
    cell.itemId = item[@"id"] ?: @"";
    return cell;
}

- (void)collectionView:(UICollectionView *)collectionView willDisplayCell:(UICollectionViewCell *)cell forItemAtIndexPath:(NSIndexPath *)indexPath {
    if (![cell isKindOfClass:[FeedCollectionViewCell class]]) return;
    FeedCollectionViewCell *fcell = (FeedCollectionViewCell *)cell;
    NSDictionary *item = self.items[indexPath.item];
    NSString *itemId = item[@"id"] ?: @"";
    NSString *urlStr = item[@"url"] ?: @"";
    NSURL *url = [NSURL URLWithString:urlStr];
    AVPlayer *player = [self.playerPool acquirePlayerForId:itemId withURL:url];
    [fcell attachPlayer:player];
}

- (void)collectionView:(UICollectionView *)collectionView didEndDisplayingCell:(UICollectionViewCell *)cell forItemAtIndexPath:(NSIndexPath *)indexPath {
    if (![cell isKindOfClass:[FeedCollectionViewCell class]]) return;
    FeedCollectionViewCell *fcell = (FeedCollectionViewCell *)cell;
    if (fcell.itemId) {
        [fcell detachPlayer];
        [self.playerPool releasePlayerForId:fcell.itemId];
    }
}

- (void)playItem:(NSString *)itemId {
    AVPlayer *p = self.playerPool.inUse[itemId];
    if (p) [p play];
}

- (void)pauseAll {
    [self.playerPool pauseAll];
}

- (void)refreshFeed:(NSString *)cursor {
    // Optionally fetch and update items
}

- (void)dealloc {
    [self.playerPool releaseAll];
}

@end
