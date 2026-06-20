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
        "messages": [{ "role": "user", "content": [{ "type": "text", "text": "Extract student roll/admission numbers, student names, and their exam marks. Output ONLY a raw JSON array of objects. Format: [{\"student_id\": \"string\", \"student_name\": \"string\", \"marks\": \"string\"}]. No markdown, no conversational text." }, { "type": "image_url", "image_url": { "url": `data:image/jpeg;base64,${base64Image}` } }] }]
      })
    });

    const result = await response.json();

    if (result && result.choices && result.choices.length > 0 && result.choices[0].message) {
      const extractedData = result.choices[0].message.content;
      const cleanData = extractedData.replace(/```json/g, '').replace(/
```/g, '').trim();
      const tableData = JSON.parse(cleanData);

      return res.json({ success: true, data: tableData });
    } else {
      console.error('OpenRouter Response Error:', JSON.stringify(result));
      return res.status(500).json({ success: false, error: 'AI model did not return a valid response.' });
    }

  } catch (error: any) {
    console.error('Claude Vision Processing Failed:', error);
    return res.status(500).json({ success: false, error: 'Failed to process table image.' });
  }
});
