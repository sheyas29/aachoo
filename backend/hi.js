app.use(express.static(path.join(__dirname, '..')));
app.use('/js', express.static(path.join(__dirname, '..', 'js')));
app.use('/css', express.static(path.join(__dirname, '..', 'css')));
app.use('/images', express.static(path.join(__dirname, '..', 'images')));

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});
