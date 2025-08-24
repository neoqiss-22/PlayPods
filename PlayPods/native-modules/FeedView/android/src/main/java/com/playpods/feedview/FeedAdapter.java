package com.playpods.feedview;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;

import java.util.ArrayList;
import java.util.List;
import android.widget.FrameLayout;
import android.content.Context;

import com.google.android.exoplayer2.ExoPlayer;
import com.google.android.exoplayer2.ui.PlayerView;

public class FeedAdapter extends RecyclerView.Adapter<FeedAdapter.ViewHolder> {

    private final List<FeedItem> items = new ArrayList<>();
    private final PlayerPool playerPool;

    public FeedAdapter(Context context) {
        playerPool = new PlayerPool(context);
    }

    public void setItems(List<FeedItem> newItems) {
        items.clear();
        if (newItems != null) items.addAll(newItems);
        notifyDataSetChanged();
    }

    public FeedItem getItem(int index) {
        return items.get(index);
    }

    @NonNull
    @Override
    public ViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        Context ctx = parent.getContext();
        FrameLayout container = new FrameLayout(ctx);
        container.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT));
        PlayerView playerView = new PlayerView(ctx);
        playerView.setLayoutParams(new FrameLayout.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 600));
        container.addView(playerView);
        return new ViewHolder(container, playerView);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolder holder, int position) {
        FeedItem item = items.get(position);
        // Acquire a player for this item and attach to the PlayerView
        ExoPlayer player = playerPool.acquire(item.id, item.url);
        holder.bind(player);
    }

    @Override
    public void onViewRecycled(@NonNull ViewHolder holder) {
        super.onViewRecycled(holder);
        if (holder.player != null && holder.boundItemId != null) {
            playerPool.release(holder.boundItemId);
            holder.unbind();
        }
    }

    @Override
    public int getItemCount() {
        return items.size();
    }

    static class ViewHolder extends RecyclerView.ViewHolder {
        PlayerView playerView;
        ExoPlayer player;
        String boundItemId;

        public ViewHolder(@NonNull View itemView, PlayerView playerView) {
            super(itemView);
            this.playerView = playerView;
        }

        void bind(ExoPlayer player) {
            this.player = player;
            if (playerView != null) {
                playerView.setPlayer(player);
            }
        }

        void unbind() {
            if (playerView != null) {
                playerView.setPlayer(null);
            }
            this.player = null;
            this.boundItemId = null;
        }
    }
}
