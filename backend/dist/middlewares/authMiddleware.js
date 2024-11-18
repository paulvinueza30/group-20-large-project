export const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next(); // Pass control to the next middleware if authenticated
    }
    else {
        res.status(401).json({ message: "Unauthorized" }); // Send Unauthorized response
    }
};
