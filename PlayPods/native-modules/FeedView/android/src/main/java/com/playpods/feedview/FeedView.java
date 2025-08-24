package com.playpods.feedview;

import android.content.Context;
import android.util.AttributeSet;
import android.widget.FrameLayout;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import androidx.recyclerview.widget.RecyclerView;
import androidx.recyclerview.widget.LinearLayoutManager;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.events.RCTEventEmitter;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONException;

import java.util.ArrayList;
import java.util.List;

public class FeedView extends FrameLayout {

    RecyclerView recyclerView;
    FeedAdapter adapter;
    PlayerPool playerPool;
    private ReactContext reactContext;
    private int lastVisibleIndex = -1;

    public FeedView(@NonNull Context context) {
        super(context);
        init(context);
    }

    public FeedView(@NonNull Context context, @Nullable AttributeSet attrs) {
        super(context, attrs);
        init(context);
    }

    private void init(Context context) {
        recyclerView = new RecyclerView(context);
        recyclerView.setLayoutManager(new LinearLayoutManager(context, LinearLayoutManager.VERTICAL, false));
        adapter = new FeedAdapter(context);
        recyclerView.setAdapter(adapter);
        addView(recyclerView);

        playerPool = new PlayerPool(context);

        // Listen for scroll changes to detect visible item
        recyclerView.addOnScrollListener(new RecyclerView.OnScrollListener() {
            @Override
            public void onScrolled(@NonNull RecyclerView rv, int dx, int dy) {
                LinearLayoutManager lm = (LinearLayoutManager) rv.getLayoutManager();
                if (lm == null) return;
                int first = lm.findFirstVisibleItemPosition();
                if (first != lastVisibleIndex && first >= 0 && first < adapter.getItemCount()) {
                    lastVisibleIndex = first;
                    FeedItem item = adapter.getItem(first);
                    if (item != null) {
                        emitOnItemVisible(item.id, first);
                    }
                }
            }
        });
    }

    // Accepts a JSON array string of items: [{"id":"1","url":"https://..."}, ...]
    public void setItemsFromJson(String json) {
        try {
            JSONArray arr = new JSONArray(json);
            List<FeedItem> list = new ArrayList<>();
            for (int i = 0; i < arr.length(); i++) {
                JSONObject o = arr.getJSONObject(i);
                String id = o.optString("id");
                String url = o.optString("url");
                list.add(new FeedItem(id, url));
            }
            adapter.setItems(list);
            lastVisibleIndex = -1;
        } catch (JSONException e) {
            // ignore parse errors for now
        }
    }

    public void setReactContext(ReactContext rc) {
        this.reactContext = rc;
    }

    private void emitOnItemVisible(String id, int index) {
        if (reactContext == null) return;
        WritableMap map = Arguments.createMap();
        map.putString("id", id);
        map.putInt("index", index);
        reactContext.getJSModule(RCTEventEmitter.class).receiveEvent(this.getId(), "onItemVisible", map);
    }

    public void playItem(String id) {
        // find item and instruct player pool to play
    }

    public void pauseAll() {
        playerPool.pauseAll();
    }

    public void refreshFeed(String cursor) {
        // fetch new data or notify adapter
    }
}
