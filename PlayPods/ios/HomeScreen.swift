import UIKit

class HomeScreen: UIViewController {
    
    // MARK: - UI Components
    private let scrollView = UIScrollView()
    private let contentView = UIView()
    private let topNavigationView = UIView()
    private let logoLabel = UILabel()
    private let searchButton = UIButton()
    private let notificationsButton = UIButton()
    private let profileButton = UIButton()
    
    private let shortsCollectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .horizontal
        layout.minimumInteritemSpacing = 16
        layout.minimumLineSpacing = 16
        let collectionView = UICollectionView(frame: .zero, collectionViewLayout: layout)
        collectionView.backgroundColor = .clear
        collectionView.showsHorizontalScrollIndicator = false
        return collectionView
    }()
    
    private let categoryCollectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.scrollDirection = .horizontal
        layout.minimumInteritemSpacing = 12
        layout.minimumLineSpacing = 12
        let collectionView = UICollectionView(frame: .zero, collectionViewLayout: layout)
        collectionView.backgroundColor = .clear
        collectionView.showsHorizontalScrollIndicator = false
        return collectionView
    }()
    
    private let videosCollectionView: UICollectionView = {
        let layout = UICollectionViewFlowLayout()
        layout.minimumInteritemSpacing = 16
        layout.minimumLineSpacing = 16
        let collectionView = UICollectionView(frame: .zero, collectionViewLayout: layout)
        collectionView.backgroundColor = .clear
        return collectionView
    }()
    
    private let bottomNavigationView = UIView()
    private let homeTabButton = UIButton()
    private let exploreTabButton = UIButton()
    private let channelsTabButton = UIButton()
    private let libraryTabButton = UIButton()
    private let uploadButton = UIButton()
    
    // MARK: - Data
    private var shorts: [ShortItem] = []
    private var videos: [VideoItem] = []
    private var selectedCategory: String = "All"
    
    // MARK: - Design Constants
    private struct Design {
        static let primaryColor = UIColor(red: 1.0, green: 0.0, blue: 0.0, alpha: 1.0)
        static let backgroundColor = UIColor(red: 0.07, green: 0.07, blue: 0.07, alpha: 1.0)
        static let surfaceColor = UIColor(red: 0.12, green: 0.12, blue: 0.12, alpha: 1.0)
        static let textPrimaryColor = UIColor.white
        static let textSecondaryColor = UIColor(red: 0.7, green: 0.7, blue: 0.7, alpha: 1.0)
        static let borderColor = UIColor(red: 0.2, green: 0.2, blue: 0.2, alpha: 1.0)
        
        static let screenPadding: CGFloat = 16
        static let componentMargin: CGFloat = 12
        static let borderRadius: CGFloat = 8
    }
    
    // MARK: - Lifecycle
    override func viewDidLoad() {
        super.viewDidLoad()
        setupUI()
        setupData()
        setupConstraints()
    }
    
    // MARK: - UI Setup
    private func setupUI() {
        view.backgroundColor = Design.backgroundColor
        
        setupTopNavigation()
        setupShortsSection()
        setupCategoriesSection()
        setupVideosSection()
        setupBottomNavigation()
        setupScrollView()
    }
    
    private func setupTopNavigation() {
        topNavigationView.backgroundColor = Design.surfaceColor
        
        // PlayPods Logo
        logoLabel.text = "PlayPods"
        logoLabel.textColor = Design.primaryColor
        logoLabel.font = UIFont.boldSystemFont(ofSize: 24)
        
        // Search Button
        searchButton.setImage(UIImage(systemName: "magnifyingglass"), for: .normal)
        searchButton.tintColor = Design.textPrimaryColor
        searchButton.addTarget(self, action: #selector(searchButtonTapped), for: .touchUpInside)
        
        // Notifications Button
        notificationsButton.setImage(UIImage(systemName: "bell"), for: .normal)
        notificationsButton.tintColor = Design.textPrimaryColor
        notificationsButton.addTarget(self, action: #selector(notificationsButtonTapped), for: .touchUpInside)
        
        // Profile Button
        profileButton.setImage(UIImage(systemName: "person.circle"), for: .normal)
        profileButton.tintColor = Design.textPrimaryColor
        profileButton.addTarget(self, action: #selector(profileButtonTapped), for: .touchUpInside)
        
        [logoLabel, searchButton, notificationsButton, profileButton].forEach {
            topNavigationView.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
    }
    
    private func setupShortsSection() {
        shortsCollectionView.delegate = self
        shortsCollectionView.dataSource = self
        shortsCollectionView.register(ShortCell.self, forCellWithReuseIdentifier: "ShortCell")
    }
    
    private func setupCategoriesSection() {
        categoryCollectionView.delegate = self
        categoryCollectionView.dataSource = self
        categoryCollectionView.register(CategoryCell.self, forCellWithReuseIdentifier: "CategoryCell")
    }
    
    private func setupVideosSection() {
        videosCollectionView.delegate = self
        videosCollectionView.dataSource = self
        videosCollectionView.register(VideoCell.self, forCellWithReuseIdentifier: "VideoCell")
    }
    
    private func setupBottomNavigation() {
        bottomNavigationView.backgroundColor = Design.surfaceColor
        
        // Tab Buttons
        let tabButtons = [homeTabButton, exploreTabButton, channelsTabButton, libraryTabButton]
        let tabTitles = ["Home", "Explore", "Channels", "Library"]
        let tabIcons = ["house", "safari", "person.2", "book"]
        
        for (index, button) in tabButtons.enumerated() {
            button.setTitle(tabTitles[index], for: .normal)
            button.setImage(UIImage(systemName: tabIcons[index]), for: .normal)
            button.setTitleColor(Design.textSecondaryColor, for: .normal)
            button.tintColor = Design.textSecondaryColor
            button.titleLabel?.font = UIFont.systemFont(ofSize: 12)
            button.addTarget(self, action: #selector(tabButtonTapped(_:)), for: .touchUpInside)
            button.tag = index
        }
        
        // Upload Button
        uploadButton.backgroundColor = Design.primaryColor
        uploadButton.setImage(UIImage(systemName: "plus"), for: .normal)
        uploadButton.tintColor = Design.textPrimaryColor
        uploadButton.layer.cornerRadius = 30
        uploadButton.addTarget(self, action: #selector(uploadButtonTapped), for: .touchUpInside)
        
        [homeTabButton, exploreTabButton, channelsTabButton, libraryTabButton, uploadButton].forEach {
            bottomNavigationView.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
        
        // Set home as selected
        updateTabSelection(selectedIndex: 0)
    }
    
    private func setupScrollView() {
        scrollView.backgroundColor = .clear
        contentView.backgroundColor = .clear
        
        view.addSubview(scrollView)
        scrollView.addSubview(contentView)
        
        [topNavigationView, shortsCollectionView, categoryCollectionView, videosCollectionView, bottomNavigationView].forEach {
            contentView.addSubview($0)
            $0.translatesAutoresizingMaskIntoConstraints = false
        }
        
        scrollView.translatesAutoresizingMaskIntoConstraints = false
        contentView.translatesAutoresizingMaskIntoConstraints = false
    }
    
    // MARK: - Data Setup
    private func setupData() {
        // Shorts data
        shorts = [
            ShortItem(username: "Benaf2", profilePicture: "https://via.placeholder.com/48x48"),
            ShortItem(username: "Eli2st", profilePicture: "https://via.placeholder.com/48x48"),
            ShortItem(username: "Rockyas", profilePicture: "https://via.placeholder.com/48x48"),
            ShortItem(username: "Amirali", profilePicture: "https://via.placeholder.com/48x48")
        ]
        
        // Videos data
        videos = [
            VideoItem(
                title: "Adele - Easy On Me Live at the NRJ Awards 2021",
                thumbnail: "https://via.placeholder.com/320x180",
                channelName: "Amazon Prime",
                views: "8.2M views",
                uploadDate: "5 months ago",
                isLive: true,
                isTrailer: false
            ),
            VideoItem(
                title: "Lord of Rings: The Rings of Power Official Trailer",
                thumbnail: "https://via.placeholder.com/320x180",
                channelName: "Amazon Prime",
                views: "8.2M views",
                uploadDate: "5 months ago",
                isLive: false,
                isTrailer: true
            )
        ]
    }
    
    // MARK: - Constraints
    private func setupConstraints() {
        NSLayoutConstraint.activate([
            // Top Navigation
            topNavigationView.topAnchor.constraint(equalTo: view.safeAreaLayoutGuide.topAnchor),
            topNavigationView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            topNavigationView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            topNavigationView.heightAnchor.constraint(equalToConstant: 60),
            
            logoLabel.leadingAnchor.constraint(equalTo: topNavigationView.leadingAnchor, constant: Design.screenPadding),
            logoLabel.centerYAnchor.constraint(equalTo: topNavigationView.centerYAnchor),
            
            profileButton.trailingAnchor.constraint(equalTo: topNavigationView.trailingAnchor, constant: -Design.screenPadding),
            profileButton.centerYAnchor.constraint(equalTo: topNavigationView.centerYAnchor),
            profileButton.widthAnchor.constraint(equalToConstant: 32),
            profileButton.heightAnchor.constraint(equalToConstant: 32),
            
            notificationsButton.trailingAnchor.constraint(equalTo: profileButton.leadingAnchor, constant: -16),
            notificationsButton.centerYAnchor.constraint(equalTo: topNavigationView.centerYAnchor),
            notificationsButton.widthAnchor.constraint(equalToConstant: 32),
            notificationsButton.heightAnchor.constraint(equalToConstant: 32),
            
            searchButton.trailingAnchor.constraint(equalTo: notificationsButton.leadingAnchor, constant: -16),
            searchButton.centerYAnchor.constraint(equalTo: topNavigationView.centerYAnchor),
            searchButton.widthAnchor.constraint(equalToConstant: 32),
            searchButton.heightAnchor.constraint(equalToConstant: 32),
            
            // Scroll View
            scrollView.topAnchor.constraint(equalTo: topNavigationView.bottomAnchor),
            scrollView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            scrollView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            scrollView.bottomAnchor.constraint(equalTo: bottomNavigationView.topAnchor),
            
            contentView.topAnchor.constraint(equalTo: scrollView.topAnchor),
            contentView.leadingAnchor.constraint(equalTo: scrollView.leadingAnchor),
            contentView.trailingAnchor.constraint(equalTo: scrollView.trailingAnchor),
            contentView.bottomAnchor.constraint(equalTo: scrollView.bottomAnchor),
            contentView.widthAnchor.constraint(equalTo: scrollView.widthAnchor),
            
            // Shorts Section
            shortsCollectionView.topAnchor.constraint(equalTo: contentView.topAnchor, constant: Design.screenPadding),
            shortsCollectionView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor),
            shortsCollectionView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor),
            shortsCollectionView.heightAnchor.constraint(equalToConstant: 100),
            
            // Categories Section
            categoryCollectionView.topAnchor.constraint(equalTo: shortsCollectionView.bottomAnchor, constant: 24),
            categoryCollectionView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor),
            categoryCollectionView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor),
            categoryCollectionView.heightAnchor.constraint(equalToConstant: 50),
            
            // Videos Section
            videosCollectionView.topAnchor.constraint(equalTo: categoryCollectionView.bottomAnchor, constant: 24),
            videosCollectionView.leadingAnchor.constraint(equalTo: contentView.leadingAnchor),
            videosCollectionView.trailingAnchor.constraint(equalTo: contentView.trailingAnchor),
            videosCollectionView.heightAnchor.constraint(equalToConstant: 400),
            videosCollectionView.bottomAnchor.constraint(equalTo: contentView.bottomAnchor),
            
            // Bottom Navigation
            bottomNavigationView.leadingAnchor.constraint(equalTo: view.leadingAnchor),
            bottomNavigationView.trailingAnchor.constraint(equalTo: view.trailingAnchor),
            bottomNavigationView.bottomAnchor.constraint(equalTo: view.safeAreaLayoutGuide.bottomAnchor),
            bottomNavigationView.heightAnchor.constraint(equalToConstant: 80),
            
            uploadButton.centerXAnchor.constraint(equalTo: bottomNavigationView.centerXAnchor),
            uploadButton.topAnchor.constraint(equalTo: bottomNavigationView.topAnchor, constant: -20),
            uploadButton.widthAnchor.constraint(equalToConstant: 60),
            uploadButton.heightAnchor.constraint(equalToConstant: 60)
        ])
        
        // Tab button constraints
        let tabButtons = [homeTabButton, exploreTabButton, channelsTabButton, libraryTabButton]
        for (index, button) in tabButtons.enumerated() {
            NSLayoutConstraint.activate([
                button.topAnchor.constraint(equalTo: bottomNavigationView.topAnchor, constant: 20),
                button.widthAnchor.constraint(equalTo: bottomNavigationView.widthAnchor, multiplier: 0.25),
                button.heightAnchor.constraint(equalToConstant: 40)
            ])
            
            if index == 0 {
                button.leadingAnchor.constraint(equalTo: bottomNavigationView.leadingAnchor).isActive = true
            } else {
                button.leadingAnchor.constraint(equalTo: tabButtons[index - 1].trailingAnchor).isActive = true
            }
        }
    }
    
    // MARK: - Actions
    @objc private func searchButtonTapped() {
        // Handle search
    }
    
    @objc private func notificationsButtonTapped() {
        // Handle notifications
    }
    
    @objc private func profileButtonTapped() {
        // Handle profile
    }
    
    @objc private func tabButtonTapped(_ sender: UIButton) {
        updateTabSelection(selectedIndex: sender.tag)
    }
    
    @objc private func uploadButtonTapped() {
        // Handle upload
    }
    
    private func updateTabSelection(selectedIndex: Int) {
        let tabButtons = [homeTabButton, exploreTabButton, channelsTabButton, libraryTabButton]
        
        for (index, button) in tabButtons.enumerated() {
            if index == selectedIndex {
                button.setTitleColor(Design.primaryColor, for: .normal)
                button.tintColor = Design.primaryColor
            } else {
                button.setTitleColor(Design.textSecondaryColor, for: .normal)
                button.tintColor = Design.textSecondaryColor
            }
        }
    }
}

// MARK: - UICollectionView DataSource & Delegate
extension HomeScreen: UICollectionViewDataSource, UICollectionViewDelegate, UICollectionViewDelegateFlowLayout {
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        if collectionView == shortsCollectionView {
            return shorts.count
        } else if collectionView == categoryCollectionView {
            return 6 // All, Game, UI, Figma, UI Designer, UX Design
        } else {
            return videos.count
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        if collectionView == shortsCollectionView {
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "ShortCell", for: indexPath) as! ShortCell
            cell.configure(with: shorts[indexPath.item])
            return cell
        } else if collectionView == categoryCollectionView {
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "CategoryCell", for: indexPath) as! CategoryCell
            let categories = ["All", "Game", "UI", "Figma", "UI Designer", "UX Design"]
            cell.configure(with: categories[indexPath.item], isSelected: indexPath.item == 0)
            return cell
        } else {
            let cell = collectionView.dequeueReusableCell(withReuseIdentifier: "VideoCell", for: indexPath) as! VideoCell
            cell.configure(with: videos[indexPath.item])
            return cell
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, layout collectionViewLayout: UICollectionViewLayout, sizeForItemAt indexPath: IndexPath) -> CGSize {
        if collectionView == shortsCollectionView {
            return CGSize(width: 80, height: 100)
        } else if collectionView == categoryCollectionView {
            return CGSize(width: 100, height: 40)
        } else {
            let width = (collectionView.bounds.width - 48) / 2
            return CGSize(width: width, height: 200)
        }
    }
    
    func collectionView(_ collectionView: UICollectionView, didSelectItemAt indexPath: IndexPath) {
        if collectionView == shortsCollectionView {
            // Handle short selection
        } else if collectionView == categoryCollectionView {
            // Handle category selection
            selectedCategory = ["All", "Game", "UI", "Figma", "UI Designer", "UX Design"][indexPath.item]
            categoryCollectionView.reloadData()
        } else {
            // Handle video selection
        }
    }
}

// MARK: - Data Models
struct ShortItem {
    let username: String
    let profilePicture: String
}

struct VideoItem {
    let title: String
    let thumbnail: String
    let channelName: String
    let views: String
    let uploadDate: String
    let isLive: Bool
    let isTrailer: Bool
}