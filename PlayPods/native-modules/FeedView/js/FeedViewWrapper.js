import React from 'react';
import { requireNativeComponent, ViewPropTypes, Platform } from 'react-native';
import PropTypes from 'prop-types';

const NativeFeedView = requireNativeComponent('FeedView');

const FeedViewWrapper = ({ data, initialIndex, prefetchAhead, style, onItemVisible, onPlaybackEvent }) => {
  return (
    <NativeFeedView
      style={style}
      data={data}
      initialIndex={initialIndex}
      prefetchAhead={prefetchAhead}
      onItemVisible={onItemVisible}
      onPlaybackEvent={onPlaybackEvent}
    />
  );
};

FeedViewWrapper.propTypes = {
  data: PropTypes.array.isRequired,
  initialIndex: PropTypes.number,
  prefetchAhead: PropTypes.number,
  style: ViewPropTypes.style,
  onItemVisible: PropTypes.func,
  onPlaybackEvent: PropTypes.func,
};

FeedViewWrapper.defaultProps = {
  initialIndex: 0,
  prefetchAhead: 2,
};

export default FeedViewWrapper;
