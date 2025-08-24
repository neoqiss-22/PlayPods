package com.playpods.android;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import android.view.View;

public class FeedViewManager extends SimpleViewManager<View> {
    public static final String REACT_CLASS = "FeedView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected View createViewInstance(ThemedReactContext reactContext) {
        // This should return your native FeedView instance. For now, return a placeholder View.
        View v = new View(reactContext);
        v.setBackgroundColor(0xFF000000); // black placeholder
        return v;
    }
}
