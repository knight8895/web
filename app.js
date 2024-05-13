const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3000;

// Set up multer for file uploads
const upload = multer({
  dest: 'uploads/' // specify the upload directory
});

// Serve the upload form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  const file = req.file;
  if (!file) {
    res.status(400).send('No file uploaded.');
    return;
  }
  const filePath = path.join(__dirname, 'uploads', file.filename);
  fs.renameSync(file.path, filePath);
  res.send(`File uploaded successfully: ${file.originalname}`);
});

// Serve uploaded files
app.use('/files', express.static(path.join(__dirname, 'uploads')));

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
