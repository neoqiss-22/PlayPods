package com.playpods.android;

import android.graphics.Color;
import android.graphics.Typeface;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import java.util.ArrayList;
import java.util.List;

public class VideosAdapter extends RecyclerView.Adapter<VideosAdapter.VideoViewHolder> {
    
    private List<VideoItem> videosList;
    
    public VideosAdapter() {
        this.videosList = new ArrayList<>();
    }
    
    public void addVideo(String title, String thumbnailUrl, String channelName, 
                        String views, String uploadDate, boolean isLive, boolean isTrailer) {
        videosList.add(new VideoItem(title, thumbnailUrl, channelName, views, uploadDate, isLive, isTrailer));
        notifyItemInserted(videosList.size() - 1);
    }
    
    @NonNull
    @Override
    public VideoViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
            .inflate(R.layout.item_video, parent, false);
        return new VideoViewHolder(view);
    }
    
    @Override
    public void onBindViewHolder(@NonNull VideoViewHolder holder, int position) {
        VideoItem videoItem = videosList.get(position);
        holder.bind(videoItem);
    }
    
    @Override
    public int getItemCount() {
        return videosList.size();
    }
    
    static class VideoViewHolder extends RecyclerView.ViewHolder {
        private CardView videoCard;
        private ImageView thumbnail;
        private TextView title;
        private TextView channelName;
        private TextView viewsAndDate;
        private TextView liveBadge;
        private TextView trailerBadge;
        private ImageView optionsButton;
        
        public VideoViewHolder(@NonNull View itemView) {
            super(itemView);
            videoCard = itemView.findViewById(R.id.videoCard);
            thumbnail = itemView.findViewById(R.id.videoThumbnail);
            title = itemView.findViewById(R.id.videoTitle);
            channelName = itemView.findViewById(R.id.videoChannelName);
            viewsAndDate = itemView.findViewById(R.id.videoViewsAndDate);
            liveBadge = itemView.findViewById(R.id.liveBadge);
            trailerBadge = itemView.findViewById(R.id.trailerBadge);
            optionsButton = itemView.findViewById(R.id.videoOptionsButton);
        }
        
        public void bind(VideoItem videoItem) {
            // Load thumbnail with Glide
            Glide.with(itemView.getContext())
                .load(videoItem.getThumbnailUrl())
                .placeholder(R.drawable.placeholder_video)
                .into(thumbnail);
            
            // Set title
            title.setText(videoItem.getTitle());
            title.setTextColor(Color.WHITE);
            title.setTextSize(14);
            title.setTypeface(null, Typeface.MEDIUM);
            title.setMaxLines(2);
            
            // Set channel name
            channelName.setText(videoItem.getChannelName());
            channelName.setTextColor(Color.parseColor("#B3B3B3"));
            channelName.setTextSize(12);
            channelName.setTypeface(null, Typeface.NORMAL);
            
            // Set views and date
            String viewsAndDateText = videoItem.getViews() + " • " + videoItem.getUploadDate();
            viewsAndDate.setText(viewsAndDateText);
            viewsAndDate.setTextColor(Color.parseColor("#B3B3B3"));
            viewsAndDate.setTextSize(12);
            viewsAndDate.setTypeface(null, Typeface.NORMAL);
            
            // Show/hide badges
            if (videoItem.isLive()) {
                liveBadge.setVisibility(View.VISIBLE);
                trailerBadge.setVisibility(View.GONE);
            } else if (videoItem.isTrailer()) {
                liveBadge.setVisibility(View.GONE);
                trailerBadge.setVisibility(View.VISIBLE);
            } else {
                liveBadge.setVisibility(View.GONE);
                trailerBadge.setVisibility(View.GONE);
            }
            
            // Set click listeners
            videoCard.setOnClickListener(v -> {
                // Handle video click - navigate to video player
            });
            
            optionsButton.setOnClickListener(v -> {
                // Handle options click - show video options menu
            });
        }
    }
    
    static class VideoItem {
        private String title;
        private String thumbnailUrl;
        private String channelName;
        private String views;
        private String uploadDate;
        private boolean isLive;
        private boolean isTrailer;
        
        public VideoItem(String title, String thumbnailUrl, String channelName, 
                        String views, String uploadDate, boolean isLive, boolean isTrailer) {
            this.title = title;
            this.thumbnailUrl = thumbnailUrl;
            this.channelName = channelName;
            this.views = views;
            this.uploadDate = uploadDate;
            this.isLive = isLive;
            this.isTrailer = isTrailer;
        }
        
        // Getters
        public String getTitle() { return title; }
        public String getThumbnailUrl() { return thumbnailUrl; }
        public String getChannelName() { return channelName; }
        public String getViews() { return views; }
        public String getUploadDate() { return uploadDate; }
        public boolean isLive() { return isLive; }
        public boolean isTrailer() { return isTrailer; }
    }
}