import { clerkClient } from "@clerk/express";

// Middleware to check userId and plan
export const auth = async (req, res, next) => {
  try {
    const { userId, has } = req.auth();

    const user = await clerkClient.users.getUser(userId);

    if (!user) {
      return res.json({ success: false, message: "User not found." });
    }

    // Check if user has premium plan
    const hasPremiumPlan = await has({plan: "premium"});

    if (!hasPremiumPlan && user.privateMetadata.free_usage) {
      req.free_usage = user.privateMetadata.free_usage;
    } else {
      await clerkClient.users.updateUserMetadata(userId, {
        privateMetadata: { free_usage: 0 },
      });
      req.free_usage = 0;
    }

    req.plan = hasPremiumPlan ? "premium" : "free";

    next();
  } catch (error) {
    res.json({ success: false, message: error.message || "Unknown error" })
  }
};
