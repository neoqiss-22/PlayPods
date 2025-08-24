package com.playpods.android;

import com.facebook.react.ReactPackage;
import com.facebook.react.uimanager.ViewManager;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class FeedViewReactPackage implements ReactPackage {
	@Override
	public List<NativeModule> createNativeModules(ReactApplicationContext reactContext) {
		return new ArrayList<>();
	}

	@Override
	public List<ViewManager> createViewManagers(ReactApplicationContext reactContext) {
		List<ViewManager> managers = new ArrayList<>();
		managers.add(new FeedViewManager());
		return managers;
	}
}
