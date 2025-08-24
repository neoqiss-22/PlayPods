package com.playpods.android;

import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import android.view.View;
import android.content.Context;
import android.util.AttributeSet;

// Reflection imports
import java.lang.Class;
import java.lang.reflect.Constructor;
import java.lang.reflect.Method;
import java.util.Map;
import java.util.HashMap;

public class FeedViewManager extends SimpleViewManager<View> {
    public static final String REACT_CLASS = "FeedView";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected View createViewInstance(ThemedReactContext reactContext) {
        try {
            // Try to instantiate the module's FeedView if the module has been added as a library
            Class<?> cls = Class.forName("com.playpods.feedview.FeedView");
            Constructor<?> ctor = cls.getConstructor(Context.class);
            Object instance = ctor.newInstance(reactContext);
            if (instance instanceof View) {
                View v = (View) instance;
                try {
                    // If the view has setReactContext, call it
                    java.lang.reflect.Method m = instance.getClass().getMethod("setReactContext", com.facebook.react.bridge.ReactContext.class);
                    if (m != null) {
                        m.invoke(instance, reactContext);
                    }
                } catch (Exception ignored) {}
                return v;
            }
        } catch (Exception e) {
            // Module not present or failed to instantiate — fall back to placeholder
        }

        View v = new View(reactContext);
        v.setBackgroundColor(0xFF000000); // black placeholder
        return v;
    }

    @Override
    public java.util.Map getExportedCustomBubblingEventTypeConstants() {
        java.util.Map<String, Object> map = new java.util.HashMap<>();
        map.put("onItemVisible", java.util.Collections.singletonMap("phasedRegistrationNames", java.util.Collections.singletonMap("bubbled", "onItemVisible")));
        return map;
    }

    @Override
    public Map<String, Integer> getCommandsMap() {
        Map<String, Integer> map = new HashMap<>();
        map.put("setItemsJson", 1);
        map.put("playItem", 2);
        map.put("pauseAll", 3);
        return map;
    }

    @Override
    public void receiveCommand(View root, int commandId, com.facebook.react.bridge.ReadableArray args) {
        // Try to forward to module implementation if present
        try {
            Class<?> cls = Class.forName("com.playpods.feedview.FeedView");
            if (cls.isInstance(root)) {
                if (commandId == 1) { // setItemsJson
                    Method m = cls.getMethod("setItemsFromJson", String.class);
                    m.invoke(root, args.getString(0));
                    return;
                } else if (commandId == 2) { // playItem
                    Method m = cls.getMethod("playItem", String.class);
                    m.invoke(root, args.getString(0));
                    return;
                } else if (commandId == 3) { // pauseAll
                    Method m = cls.getMethod("pauseAll");
                    m.invoke(root);
                    return;
                }
            }
        } catch (Exception e) {
            // fallback: do nothing
        }

        // No-op fallback
    }
}
