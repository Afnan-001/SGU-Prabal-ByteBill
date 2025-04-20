// pages/api/ocr.js

import { ImageAnnotatorClient } from '@google-cloud/vision';

const client = new ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { imageData } = req.body; // Expecting base64 encoded image
    
    if (!imageData) {
      return res.status(400).json({ message: 'No image data provided' });
    }

    const [result] = await client.textDetection({
      image: { content: imageData },
    });

    const detections = result.textAnnotations;
    const fullText = result.fullTextAnnotation?.text || '';

    if (!fullText) {
      return res.status(400).json({ message: 'No text found in image' });
    }

    // Process the text to extract bill information
    const billData = processBillText(fullText);
    
    return res.status(200).json(billData);
  } catch (error) {
    console.error('OCR Error:', error);
    return res.status(500).json({ message: 'Failed to process image' });
  }
}

// Similar processBillText function as above