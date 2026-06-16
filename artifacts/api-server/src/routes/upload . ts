import { Router } from "express";

const router = Router();

// Ensure this path is correct
router.post("/analyze", async (req, res) => {
  try {
    // Your logic for processing the image
    res.status(200).json({ success: true, message: "Analysis complete" });
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
});

export default router;
