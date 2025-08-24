package com.playpods.android;

import android.content.Context;
import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.GridLayoutManager;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.tabs.TabLayout;

public class HomeScreen extends AppCompatActivity {
    
    private SwipeRefreshLayout swipeRefreshLayout;
    private RecyclerView shortsRecyclerView;
    private RecyclerView videosRecyclerView;
    private TabLayout categoryTabLayout;
    private BottomNavigationView bottomNavigationView;
    private FloatingActionButton uploadButton;
    
    // Design constants
    private static final int PRIMARY_COLOR = Color.parseColor("#FF0000");
    private static final int BACKGROUND_COLOR = Color.parseColor("#121212");
    private static final int SURFACE_COLOR = Color.parseColor("#1E1E1E");
    private static final int TEXT_PRIMARY_COLOR = Color.WHITE;
    private static final int TEXT_SECONDARY_COLOR = Color.parseColor("#B3B3B3");
    private static final int BORDER_COLOR = Color.parseColor("#333333");
    
    private static final int SCREEN_PADDING = 64; // 16dp * 4
    private static final int COMPONENT_MARGIN = 48; // 12dp * 4
    private static final int BORDER_RADIUS = 32; // 8dp * 4
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        
        initializeViews();
        setupTopNavigation();
        setupShortsSection();
        setupCategoriesSection();
        setupVideosSection();
        setupBottomNavigation();
        setupSwipeRefresh();
    }
    
    private void initializeViews() {
        swipeRefreshLayout = findViewById(R.id.swipeRefreshLayout);
        shortsRecyclerView = findViewById(R.id.shortsRecyclerView);
        videosRecyclerView = findViewById(R.id.videosRecyclerView);
        categoryTabLayout = findViewById(R.id.categoryTabLayout);
        bottomNavigationView = findViewById(R.id.bottomNavigationView);
        uploadButton = findViewById(R.id.uploadButton);
    }
    
    private void setupTopNavigation() {
        // Top navigation with PlayPods logo, search, notifications, and profile
        LinearLayout topNav = findViewById(R.id.topNavigation);
        topNav.setBackgroundColor(SURFACE_COLOR);
        
        // PlayPods logo
        TextView logoText = findViewById(R.id.logoText);
        logoText.setText("PlayPods");
        logoText.setTextColor(PRIMARY_COLOR);
        logoText.setTextSize(24);
        logoText.setTypeface(null, Typeface.BOLD);
        
        // Search button
        ImageView searchButton = findViewById(R.id.searchButton);
        searchButton.setOnClickListener(v -> handleSearchClick());
        
        // Notifications button
        ImageView notificationsButton = findViewById(R.id.notificationsButton);
        notificationsButton.setOnClickListener(v -> handleNotificationsClick());
        
        // Profile button
        ImageView profileButton = findViewById(R.id.profileButton);
        profileButton.setOnClickListener(v -> handleProfileClick());
    }
    
    private void setupShortsSection() {
        // Horizontal scrolling shorts section
        shortsRecyclerView.setLayoutManager(
            new LinearLayoutManager(this, LinearLayoutManager.HORIZONTAL, false)
        );
        
        ShortsAdapter shortsAdapter = new ShortsAdapter();
        shortsRecyclerView.setAdapter(shortsAdapter);
        
        // Add shorts data
        shortsAdapter.addShort("Benaf2", "https://via.placeholder.com/48x48");
        shortsAdapter.addShort("Eli2st", "https://via.placeholder.com/48x48");
        shortsAdapter.addShort("Rockyas", "https://via.placeholder.com/48x48");
        shortsAdapter.addShort("Amirali", "https://via.placeholder.com/48x48");
    }
    
    private void setupCategoriesSection() {
        // Category tabs
        String[] categories = {"All", "Game", "UI", "Figma", "UI Designer", "UX Design"};
        
        for (String category : categories) {
            TabLayout.Tab tab = categoryTabLayout.newTab();
            tab.setText(category);
            categoryTabLayout.addTab(tab);
        }
        
        categoryTabLayout.addOnTabSelectedListener(new TabLayout.OnTabSelectedListener() {
            @Override
            public void onTabSelected(TabLayout.Tab tab) {
                handleCategorySelection(tab.getText().toString());
            }
            
            @Override
            public void onTabUnselected(TabLayout.Tab tab) {}
            
            @Override
            public void onTabReselected(TabLayout.Tab tab) {}
        });
    }
    
    private void setupVideosSection() {
        // Grid layout for videos
        videosRecyclerView.setLayoutManager(new GridLayoutManager(this, 2));
        
        VideosAdapter videosAdapter = new VideosAdapter();
        videosRecyclerView.setAdapter(videosAdapter);
        
        // Add video data
        videosAdapter.addVideo(
            "Adele - Easy On Me Live at the NRJ Awards 2021",
            "https://via.placeholder.com/320x180",
            "Amazon Prime",
            "8.2M views",
            "5 months ago",
            true, // isLive
            false // isTrailer
        );
        
        videosAdapter.addVideo(
            "Lord of Rings: The Rings of Power Official Trailer",
            "https://via.placeholder.com/320x180",
            "Amazon Prime",
            "8.2M views",
            "5 months ago",
            false, // isLive
            true // isTrailer
        );
    }
    
    private void setupBottomNavigation() {
        // Bottom navigation with tabs
        bottomNavigationView.setOnItemSelectedListener(item -> {
            int itemId = item.getItemId();
            if (itemId == R.id.nav_home) {
                handleHomeTab();
                return true;
            } else if (itemId == R.id.nav_explore) {
                handleExploreTab();
                return true;
            } else if (itemId == R.id.nav_channels) {
                handleChannelsTab();
                return true;
            } else if (itemId == R.id.nav_library) {
                handleLibraryTab();
                return true;
            }
            return false;
        });
        
        // Upload button
        uploadButton.setOnClickListener(v -> handleUploadClick());
    }
    
    private void setupSwipeRefresh() {
        swipeRefreshLayout.setOnRefreshListener(() -> {
            // Simulate refresh
            swipeRefreshLayout.postDelayed(() -> {
                swipeRefreshLayout.setRefreshing(false);
                // Refresh data here
            }, 2000);
        });
    }
    
    // Event handlers
    private void handleSearchClick() {
        // Navigate to search screen
    }
    
    private void handleNotificationsClick() {
        // Show notifications
    }
    
    private void handleProfileClick() {
        // Navigate to profile
    }
    
    private void handleCategorySelection(String category) {
        // Filter videos by category
    }
    
    private void handleHomeTab() {
        // Already on home
    }
    
    private void handleExploreTab() {
        // Navigate to explore
    }
    
    private void handleChannelsTab() {
        // Navigate to channels
    }
    
    private void handleLibraryTab() {
        // Navigate to library
    }
    
    private void handleUploadClick() {
        // Handle upload
    }
}