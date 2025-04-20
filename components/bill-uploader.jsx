// components/BillUploader.js
import { useState } from 'react';
import { extractBillTextFromImage } from '../lib/ocr';

export default function BillUploader() {
  const [image, setImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [billData, setBillData] = useState(null);
  const [error, setError] = useState(null);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const processImage = async () => {
    if (!image) return;
    
    setIsProcessing(true);
    setError(null);
    
    try {
      // For client-side processing
      const response = await fetch(image);
      const blob = await response.blob();
      const data = await extractBillTextFromImage(blob);
      
      // For server-side processing (using the API route)
      // const reader = new FileReader();
      // reader.readAsDataURL(blob);
      // reader.onloadend = async () => {
      //   const base64data = reader.result.split(',')[1];
      //   const response = await fetch('/api/ocr', {
      //     method: 'POST',
      //     body: JSON.stringify({ imageData: base64data }),
      //     headers: { 'Content-Type': 'application/json' },
      //   });
      //   const data = await response.json();
      //   setBillData(data);
      // };
      
      setBillData(data);
    } catch (err) {
      setError('Failed to process the bill image. Please try again.');
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="bill-uploader">
      <h2>Upload Bill Image</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} />
      {image && (
        <div>
          <img src={image} alt="Uploaded bill" style={{ maxWidth: '100%', maxHeight: '300px' }} />
          <button onClick={processImage} disabled={isProcessing}>
            {isProcessing ? 'Processing...' : 'Extract Bill Data'}
          </button>
        </div>
      )}
      
      {error && <p className="error">{error}</p>}
      
      {billData && (
        <div className="bill-results">
          <h3>Extracted Bill Information</h3>
          <p><strong>Vendor:</strong> {billData.vendor || 'Not found'}</p>
          <p><strong>Date:</strong> {billData.date || 'Not found'}</p>
          <p><strong>Total:</strong> {billData.total ? `$${billData.total.toFixed(2)}` : 'Not found'}</p>
          
          {billData.items.length > 0 && (
            <div>
              <h4>Items:</h4>
              <ul>
                {billData.items.map((item, index) => (
                  <li key={index}>
                    {item.description}: ${item.amount.toFixed(2)}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}