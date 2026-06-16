import { Router, Request, Response } from 'express';
import puppeteer from 'puppeteer';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * 1. CLAUDE VISION ANALYSIS ENDPOINT
 */
router.post('/analyze', upload.single('image'), async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    const base64Image = req.file.buffer.toString('base64');

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.ANTHROPIC_API_KEY}`,
        "HTTP-Referer": "https://emis-backend-qt8l.onrender.com",
        "X-Title": "EMIS Teacher App",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "anthropic/claude-3.5-sonnet",
        "messages": [
          {
            "role": "user",
            "content": [
              { "type": "text", "text": "Extract student roll/admission numbers, student names, and their exam marks. Output ONLY a raw JSON array of objects. Format: [{\"student_id\": \"string\", \"student_name\": \"string\", \"marks\": \"string\"}]. No markdown, no conversational text." },
              { "type": "image_url", "image_url": { "url": `data:image/jpeg;base64,${base64Image}` } }
            ]
          }
        ]
      })
    });

    const result = await response.json();
    const extractedData = result.choices[0].message.content;
    
    // JSON மட்டும் பிரித்தெடுக்க
    const tableData = JSON.parse(extractedData.replace(/```json/g, '').replace(/```/g, '').trim());

```/g, '').trim());

    return res.json({ success: true, data: tableData });
    
  } catch (error: any) {
    console.error('Claude Vision Processing Failed:', error);
    return res.status(500).json({ success: false, error: 'Failed to process table image.' });
  }
});

/**
 * 2. PUPPETEER AUTOMATION PUSH ENDPOINT
 */
router.post('/push', async (req: Request, res: Response): Promise<any> => {
  const { username, password, verifiedData } = req.body;

  if (!username || !password || !verifiedData) {
    return res.status(400).json({ success: false, error: 'Missing mandatory fields or verified row entries.' });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();

  try {
    await page.goto('https://emis.tnschools.gov.in/', { waitUntil: 'networkidle2' });
    await page.type('#user_name', username); 
    await page.type('#password', password);
    await page.click('#login_submit_btn');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

for (const row of verifiedData) {
  const selector = `input[data-student-id="${row.student_id}"]`;
  if ((await page.$(selector)) !== null) {
    await page.click(selector, { clickCount: 3 });
    await page.type(selector, row.marks.toString());
  }
}



await browser.close();
return res.json({ success: true, message: 'Marks pushed successfully!' });
} catch (automationErr: any) {
  console.error('Automation Routine Failed:', automationErr);
  await browser.close();
  return res.status(500).json({ success: false, error: 'Browser automation runtime failure.' });
}

  }
});

export default router;
