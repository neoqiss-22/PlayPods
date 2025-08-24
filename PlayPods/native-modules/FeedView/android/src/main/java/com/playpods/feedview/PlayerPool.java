package com.playpods.feedview;

import android.content.Context;
import android.net.Uri;

import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.MediaItem;

import java.util.ArrayDeque;
import java.util.Deque;
import java.util.HashMap;
import java.util.Map;

/**
 * Simple ExoPlayer pool. Not thread-safe — call from UI thread.
 */
public class PlayerPool {

    private final Context context;
    private final Deque<ExoPlayer> available = new ArrayDeque<>();
    private final Map<String, ExoPlayer> inUse = new HashMap<>();
    private final int maxSize = 3; // default pool size

    public PlayerPool(Context context) {
        this.context = context.getApplicationContext();
    }

    private ExoPlayer createPlayer() {
        ExoPlayer player = new ExoPlayer.Builder(context).build();
        return player;
    }

    public ExoPlayer acquire(String id, String url) {
        ExoPlayer player = available.pollFirst();
        if (player == null) {
            if (inUse.size() < maxSize) {
                player = createPlayer();
            } else {
                // Reuse oldest in-use player (simple policy)
                String victim = inUse.keySet().iterator().next();
                ExoPlayer victimPlayer = inUse.remove(victim);
                if (victimPlayer != null) {
                    victimPlayer.stop();
                    player = victimPlayer;
                }
            }
        }

        if (player == null) {
            player = createPlayer();
        }

        // Prepare media
        player.setMediaItem(MediaItem.fromUri(Uri.parse(url)));
        player.prepare();
        inUse.put(id, player);
        return player;
    }

    public void release(String id) {
        ExoPlayer player = inUse.remove(id);
        if (player != null) {
            player.stop();
            if (available.size() < maxSize) {
                available.addLast(player);
            } else {
                player.release();
            }
        }
    }

    public void pauseAll() {
        for (ExoPlayer p : inUse.values()) {
            p.pause();
        }
        for (ExoPlayer p : available) {
            p.pause();
        }
    }

    public void releaseAll() {
        for (ExoPlayer p : inUse.values()) {
            p.release();
        }
        inUse.clear();
        for (ExoPlayer p : available) {
            p.release();
        }
        available.clear();
    }
}

