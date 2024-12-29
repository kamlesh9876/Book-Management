// Existing Node.js code for submitting eBook
app.post('/api/ebooks', async (req, res) => {
  const { title, author, description, publishedDate } = req.body;
  const newEbook = new Ebook({ title, author, description, publishedDate });
  await newEbook.save();

  // Now process the eBook PDF using Java
  const javaCommand = `java -cp ./java-service PdfProcessor "${title}" "${description}"`;

  exec(javaCommand, (error, stdout, stderr) => {
      if (error) {
          console.error(`exec error: ${error}`);
          return res.status(500).send('Error generating PDF');
      }
      console.log(`stdout: ${stdout}`);
      if (stderr) console.error(`stderr: ${stderr}`);
      return res.json({ message: 'eBook saved and PDF generated successfully', stdout });
  });
});
