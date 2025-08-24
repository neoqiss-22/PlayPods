import UIKit

class ShortCell: UICollectionViewCell {
    
    // MARK: - UI Components
    private let profileImageView: UIImageView = {
        let imageView = UIImageView()
        imageView.contentMode = .scaleAspectFill
        imageView.clipsToBounds = true
        imageView.layer.cornerRadius = 24
        imageView.backgroundColor = UIColor(red: 0.18, green: 0.18, blue: 0.18, alpha: 1.0)
        return imageView
    }()
    
    private let usernameLabel: UILabel = {
        let label = UILabel()
        label.textColor = .white
        label.font = UIFont.systemFont(ofSize: 12)
        label.textAlignment = .center
        label.numberOfLines = 1
        return label
    }()
    
    // MARK: - Initialization
    override init(frame: CGRect) {
        super.init(frame: frame)
        setupUI()
        setupConstraints()
    }
    
    required init?(coder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }
    
    // MARK: - UI Setup
    private func setupUI() {
        contentView.addSubview(profileImageView)
        contentView.addSubview(usernameLabel)
        
        profileImageView.translatesAutoresizingMaskIntoConstraints = false
        usernameLabel.translatesAutoresizingMaskIntoConstraints = false
    }
    
    private func setupConstraints() {
        NSLayoutConstraint.activate([
            profileImageView.topAnchor.constraint(equalTo: contentView.topAnchor),
            profileImageView.centerXAnchor.constraint(equalTo: contentView.centerXAnchor),
            profileImageView.widthAnchor.constraint(equalToConstant: 48),
            profileImageView.heightAnchor.constraint(equalToConstant: 48),
            
            usernameLabel.topAnchor.constraint(equalTo: profileImageView.bottomAnchor, constant: 8),
            usernameLabel.leadingAnchor.constraint(equalTo: contentView.leadingAnchor),
            usernameLabel.trailingAnchor.constraint(equalTo: contentView.trailingAnchor),
            usernameLabel.bottomAnchor.constraint(lessThanOrEqualTo: contentView.bottomAnchor)
        ])
    }
    
    // MARK: - Configuration
    func configure(with short: ShortItem) {
        usernameLabel.text = short.username
        
        // Load profile picture (in a real app, use SDWebImage or Kingfisher)
        if let url = URL(string: short.profilePicture) {
            // Load image from URL
            // For now, we'll use a placeholder
            profileImageView.backgroundColor = UIColor(red: 0.18, green: 0.18, blue: 0.18, alpha: 1.0)
        }
    }
    
    // MARK: - Reuse
    override func prepareForReuse() {
        super.prepareForReuse()
        profileImageView.image = nil
        usernameLabel.text = nil
    }
}