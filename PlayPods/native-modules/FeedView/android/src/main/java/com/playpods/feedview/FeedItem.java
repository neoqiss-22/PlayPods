package com.playpods.feedview;

public class FeedItem {
    public String id;
    public String url;
    public int durationMs;
    public int width;
    public int height;

    public FeedItem(String id, String url) {
        this.id = id;
        this.url = url;
    }
}
