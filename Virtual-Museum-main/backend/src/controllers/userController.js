const User = require("../models/User");

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
            .select("-password")
            .populate("favorites");

        if (user) {
            res.json({
                _id: user._id,
                username: user.username,
                email: user.email,
                role: user.role,
                profilePicture: user.profilePicture,
                bio: user.bio,
                interests: user.interests,
                favorites: user.favorites,
                points: user.points,
                badges: user.badges
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.username = req.body.username || user.username;
            user.email = req.body.email || user.email;
            user.bio = req.body.bio || user.bio;
            if (req.file) {
                user.profilePicture = `/${req.file.path.replace(/\\/g, "/")}`;
            } else if (req.body.profilePicture !== undefined) {
                user.profilePicture = req.body.profilePicture;
            }
            user.interests = req.body.interests ? req.body.interests.split(",") : user.interests;

            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser._id,
                username: updatedUser.username,
                email: updatedUser.email,
                role: updatedUser.role,
                profilePicture: updatedUser.profilePicture,
                bio: updatedUser.bio,
                interests: updatedUser.interests,
                favorites: updatedUser.favorites,
                points: updatedUser.points,
                badges: updatedUser.badges,
                token: req.headers.authorization.split(" ")[1] // Return connection token
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};
