const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const { exec } = require('child_process');

// Initialize Express app
const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/ebookdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// MongoDB schema for eBooks
const ebookSchema = new mongoose.Schema({
  title: String,
  author: String,
  description: String,
  publishedDate: Date
});

const Ebook = mongoose.model('Ebook', ebookSchema);

// API Routes
// Create a new eBook
app.post('/api/ebooks', async (req, res) => {
  const { title, author, description, publishedDate } = req.body;
  const newEbook = new Ebook({ title, author, description, publishedDate });
  await newEbook.save();
  res.json({ message: 'eBook saved successfully' });
});

// Generate PDF route (triggered by frontend)
app.post('/api/generate-pdf', async (req, res) => {
  const { title, author, description } = req.body;

  // Create a simple PDF using standard Java libraries or any tool
  const pdfContent = `Title: ${title}\nAuthor: ${author}\nDescription: ${description}`;
  const pdfFilePath = `./ebooks/${title.replace(/\s+/g, '_')}.pdf`;

  fs.writeFile(pdfFilePath, pdfContent, (err) => {
    if (err) {
      console.error('Error generating PDF:', err);
      return res.status(500).json({ message: 'Error generating PDF' });
    }
    console.log('PDF generated:', pdfFilePath);
    return res.json({ message: 'PDF generated successfully' });
  });
});

// Start server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
