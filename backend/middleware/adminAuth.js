import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.json({ success: false, message: "Not authorized. Please login again." });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Verify the decoded token matches admin credentials
        if (decoded.email !== process.env.ADMIN_EMAIL || decoded.password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Not authorized. Please login again." });
        }

        next();

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

export default adminAuth;