import React from 'react';
import { requireNativeComponent, Platform, View, UIManager, findNodeHandle } from 'react-native';
import PropTypes from 'prop-types';

const RCTFeedView = Platform.select({
	ios: () => requireNativeComponent('FeedView'),
	android: () => requireNativeComponent('FeedView'),
	default: () => null,
})();

const FeedView = React.forwardRef((props, ref) => {
	if (!RCTFeedView) return <View />;
	return <RCTFeedView ref={ref} {...props} />;
});

FeedView.propTypes = {
	feedCursor: PropTypes.string,
	initialIndex: PropTypes.number,
	prefetchAhead: PropTypes.number,
};

// Helper commands (legacy UIManager bridge). Replace with TurboModules/JSI later.
FeedView.playItem = function(ref, itemId) {
	const node = findNodeHandle(ref && ref.current ? ref.current : ref);
	if (!node) return;
	const config = UIManager.getViewManagerConfig('FeedView');
	if (!config || !config.Commands || config.Commands.playItem == null) return;
	UIManager.dispatchViewManagerCommand(node, config.Commands.playItem, [itemId]);
};

FeedView.pauseAll = function(ref) {
	const node = findNodeHandle(ref && ref.current ? ref.current : ref);
	if (!node) return;
	const config = UIManager.getViewManagerConfig('FeedView');
	if (!config || !config.Commands || config.Commands.pauseAll == null) return;
	UIManager.dispatchViewManagerCommand(node, config.Commands.pauseAll, []);
};

FeedView.setItemsJson = function(ref, json) {
	const node = findNodeHandle(ref && ref.current ? ref.current : ref);
	if (!node) return;
	const config = UIManager.getViewManagerConfig('FeedView');
	if (!config || !config.Commands || config.Commands.setItemsJson == null) return;
	UIManager.dispatchViewManagerCommand(node, config.Commands.setItemsJson, [json]);
};

export default FeedView;
