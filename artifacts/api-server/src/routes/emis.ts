import { Router, Request, Response } from 'express';
import { Anthropic } from '@anthropic-ai/sdk';
import puppeteer from 'puppeteer';
import multer from 'multer';

const router = Router();
const upload = multer({ storage: multer.memoryStorage() });
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

/**
 * 1. CLAUDE VISION ANALYSIS ENDPOINT
 * Receives the marks picture, forces Claude to output structured JSON array
 */
router.post('/analyze', upload.single('image'), async (req: Request, res: Response): Promise<any> => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload an image file.' });
    }

    const base64Image = req.file.buffer.toString('base64');

    const message = await anthropic.messages.create({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 1500,
      messages: [
        {
          role: 'user',
          content: [
            {
              type: 'image',
              source: {
                type: 'base64',
                media_type: 'image/jpeg',
                data: base64Image,
              },
            },
            {
              type: 'text',
              text: 'Extract student roll/admission numbers, student names, and their exam marks. Output ONLY a raw JSON array of objects. Format: [{"student_id": "string", "student_name": "string", "marks": "string"}]. Do not wrap the response in markdown blocks or write conversational text.',
            },
          ],
        },
      ],
    });

    const cleanJsonText = message.content[0].type === 'text' ? message.content[0].text.trim() : '';
    const tableData = JSON.parse(cleanJsonText);

    return res.json({ success: true, tableData });
  } catch (error: any) {
    console.error('Claude Vision Processing Failed:', error);
    return res.status(500).json({ success: false, error: 'Failed to process table image.' });
  }
});

/**
 * 2. PUPPETEER AUTOMATION PUSH ENDPOINT
 * Triggers only when your user taps "OK" on the web screen grid
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
    // Navigate to canonical Tamil Nadu EMIS entry gate
    await page.goto('https://emis.tnschools.gov.in/', { waitUntil: 'networkidle2' });

    // Login Form Automation Input
    await page.type('#user_name' || '#username', username); 
    await page.type('#password', password);
    await page.click('#login_submit_btn' || 'button[type="submit"]');
    await page.waitForNavigation({ waitUntil: 'networkidle2' });

    // Loop data inputs field-by-field safely based on verified student layouts
    for (const row of verifiedData) {
      // Dynamic input selectors based on EMIS school dashboard IDs
      const selector = `input[data-student-id="${row.student_id}"]`;
      if ((await page.$(selector)) !== null) {
        await page.click(selector, { clickCount: 3 }); // clear defaults
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
});

export default router;
