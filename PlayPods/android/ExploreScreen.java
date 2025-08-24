package com.playpods.android;

import android.graphics.Color;
import android.graphics.Typeface;
import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.TextView;
import androidx.appcompat.app.AppCompatActivity;
import androidx.cardview.widget.CardView;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import androidx.swiperefreshlayout.widget.SwipeRefreshLayout;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.google.android.material.floatingactionbutton.FloatingActionButton;
import com.google.android.material.tabs.TabLayout;
import java.util.ArrayList;
import java.util.List;

public class ExploreScreen extends AppCompatActivity {
    
    private SwipeRefreshLayout swipeRefreshLayout;
    private EditText searchEditText;
    private ImageView filterButton;
    private TabLayout categoryTabLayout;
    private RecyclerView videosRecyclerView;
    private BottomNavigationView bottomNavigationView;
    private FloatingActionButton uploadButton;
    
    // Filter dropdowns
    private TextView dateFilterText;
    private TextView sortFilterText;
    private LinearLayout sortDropdown;
    
    // Design constants
    private static final int PRIMARY_COLOR = Color.parseColor("#FF0000");
    private static final int BACKGROUND_COLOR = Color.parseColor("#121212");
    private static final int SURFACE_COLOR = Color.parseColor("#1E1E1E");
    private static final int TEXT_PRIMARY_COLOR = Color.WHITE;
    private static final int TEXT_SECONDARY_COLOR = Color.parseColor("#B3B3B3");
    private static final int BORDER_COLOR = Color.parseColor("#333333");
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_explore);
        
        initializeViews();
        setupTopNavigation();
        setupSearchSection();
        setupCategoriesSection();
        setupFiltersSection();
        setupVideosSection();
        setupBottomNavigation();
        setupSwipeRefresh();
    }
    
    private void initializeViews() {
        swipeRefreshLayout = findViewById(R.id.swipeRefreshLayout);
        searchEditText = findViewById(R.id.searchEditText);
        filterButton = findViewById(R.id.filterButton);
        categoryTabLayout = findViewById(R.id.categoryTabLayout);
        videosRecyclerView = findViewById(R.id.videosRecyclerView);
        bottomNavigationView = findViewById(R.id.bottomNavigationView);
        uploadButton = findViewById(R.id.uploadButton);
        dateFilterText = findViewById(R.id.dateFilterText);
        sortFilterText = findViewById(R.id.sortFilterText);
        sortDropdown = findViewById(R.id.sortDropdown);
    }
    
    private void setupTopNavigation() {
        // Top navigation with back button and title
        LinearLayout topNav = findViewById(R.id.topNavigation);
        topNav.setBackgroundColor(SURFACE_COLOR);
        
        // Back button
        ImageView backButton = findViewById(R.id.backButton);
        backButton.setOnClickListener(v -> onBackPressed());
        
        // Title
        TextView titleText = findViewById(R.id.titleText);
        titleText.setText("Explore");
        titleText.setTextColor(TEXT_PRIMARY_COLOR);
        titleText.setTextSize(18);
        titleText.setTypeface(null, Typeface.SEMIBOLD);
        
        // Options button
        ImageView optionsButton = findViewById(R.id.optionsButton);
        optionsButton.setOnClickListener(v -> showOptionsMenu());
    }
    
    private void setupSearchSection() {
        // Search bar
        searchEditText.setHint("Search");
        searchEditText.setHintTextColor(TEXT_SECONDARY_COLOR);
        searchEditText.setTextColor(TEXT_PRIMARY_COLOR);
        searchEditText.setBackgroundColor(SURFACE_COLOR);
        
        // Filter button
        filterButton.setOnClickListener(v -> showFilterOptions());
    }
    
    private void setupCategoriesSection() {
        // Category tabs
        String[] categories = {"Trend", "Music", "Gaming", "Learning"};
        
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
    
    private void setupFiltersSection() {
        // Date filter
        dateFilterText.setOnClickListener(v -> showDateFilterOptions());
        
        // Sort filter
        sortFilterText.setOnClickListener(v -> toggleSortDropdown());
        
        // Sort dropdown options
        setupSortDropdownOptions();
    }
    
    private void setupSortDropdownOptions() {
        String[] sortOptions = {"Most views", "Most recent", "Most liked", "Most commented"};
        
        for (String option : sortOptions) {
            TextView optionView = new TextView(this);
            optionView.setText(option);
            optionView.setTextColor(TEXT_PRIMARY_COLOR);
            optionView.setTextSize(14);
            optionView.setPadding(48, 32, 48, 32);
            optionView.setBackgroundColor(SURFACE_COLOR);
            optionView.setOnClickListener(v -> {
                sortFilterText.setText(option);
                sortDropdown.setVisibility(View.GONE);
            });
            
            sortDropdown.addView(optionView);
            
            // Add separator
            if (!option.equals(sortOptions[sortOptions.length - 1])) {
                View separator = new View(this);
                separator.setBackgroundColor(BORDER_COLOR);
                separator.setLayoutParams(new LinearLayout.LayoutParams(
                    LinearLayout.LayoutParams.MATCH_PARENT, 1
                ));
                sortDropdown.addView(separator);
            }
        }
    }
    
    private void setupVideosSection() {
        // Linear layout for videos
        videosRecyclerView.setLayoutManager(new LinearLayoutManager(this));
        
        ExploreVideosAdapter videosAdapter = new ExploreVideosAdapter();
        videosRecyclerView.setAdapter(videosAdapter);
        
        // Add video data
        videosAdapter.addVideo(
            "Face Off: Chris Eubank Jr vs Conor Benn The countdown is well and truly on",
            "https://via.placeholder.com/320x180",
            "Boxing Channel",
            "8M Views",
            "26 sep"
        );
        
        videosAdapter.addVideo(
            "Los iPhone 14 Pro Max y 14 Pro traen una característica increíble see",
            "https://via.placeholder.com/320x180",
            "Tech Review",
            "8M Views",
            "26 sep"
        );
        
        videosAdapter.addVideo(
            "Warner Bros Games Avalanche: An Inside Look at the Hogwarts Legacy Game | Vision",
            "https://via.placeholder.com/320x180",
            "Gaming News",
            "8M Views",
            "26 sep"
        );
        
        videosAdapter.addVideo(
            "Lil Baby - Detox (Official Video) new arrived on this channel amazing",
            "https://via.placeholder.com/320x180",
            "Music Channel",
            "8M Views",
            "26 sep"
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
    private void showOptionsMenu() {
        // Show explore options menu
    }
    
    private void showFilterOptions() {
        // Show filter options
    }
    
    private void showDateFilterOptions() {
        // Show date filter options
    }
    
    private void toggleSortDropdown() {
        if (sortDropdown.getVisibility() == View.VISIBLE) {
            sortDropdown.setVisibility(View.GONE);
        } else {
            sortDropdown.setVisibility(View.VISIBLE);
        }
    }
    
    private void handleCategorySelection(String category) {
        // Filter videos by category
    }
    
    private void handleHomeTab() {
        // Navigate to home
    }
    
    private void handleExploreTab() {
        // Already on explore
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