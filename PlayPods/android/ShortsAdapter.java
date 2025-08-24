package com.playpods.android;

import android.graphics.Color;
import android.graphics.Typeface;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import androidx.annotation.NonNull;
import androidx.recyclerview.widget.RecyclerView;
import com.bumptech.glide.Glide;
import java.util.ArrayList;
import java.util.List;

public class ShortsAdapter extends RecyclerView.Adapter<ShortsAdapter.ShortViewHolder> {
    
    private List<ShortItem> shortsList;
    
    public ShortsAdapter() {
        this.shortsList = new ArrayList<>();
    }
    
    public void addShort(String username, String profilePictureUrl) {
        shortsList.add(new ShortItem(username, profilePictureUrl));
        notifyItemInserted(shortsList.size() - 1);
    }
    
    @NonNull
    @Override
    public ShortViewHolder onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
            .inflate(R.layout.item_short, parent, false);
        return new ShortViewHolder(view);
    }
    
    @Override
    public void onBindViewHolder(@NonNull ShortViewHolder holder, int position) {
        ShortItem shortItem = shortsList.get(position);
        holder.bind(shortItem);
    }
    
    @Override
    public int getItemCount() {
        return shortsList.size();
    }
    
    static class ShortViewHolder extends RecyclerView.ViewHolder {
        private ImageView profilePicture;
        private TextView username;
        
        public ShortViewHolder(@NonNull View itemView) {
            super(itemView);
            profilePicture = itemView.findViewById(R.id.shortProfilePicture);
            username = itemView.findViewById(R.id.shortUsername);
        }
        
        public void bind(ShortItem shortItem) {
            // Load profile picture with Glide
            Glide.with(itemView.getContext())
                .load(shortItem.getProfilePictureUrl())
                .placeholder(R.drawable.placeholder_profile)
                .into(profilePicture);
            
            // Set username
            username.setText(shortItem.getUsername());
            username.setTextColor(Color.WHITE);
            username.setTextSize(12);
            username.setTypeface(null, Typeface.NORMAL);
            
            // Set click listener
            itemView.setOnClickListener(v -> {
                // Handle short item click
                // Navigate to short video or channel
            });
        }
    }
    
    static class ShortItem {
        private String username;
        private String profilePictureUrl;
        
        public ShortItem(String username, String profilePictureUrl) {
            this.username = username;
            this.profilePictureUrl = profilePictureUrl;
        }
        
        public String getUsername() {
            return username;
        }
        
        public String getProfilePictureUrl() {
            return profilePictureUrl;
        }
    }
}