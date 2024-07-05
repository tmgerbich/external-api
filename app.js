const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const options = {
  method: 'GET',
  url: '',
  headers: {
    'x-rapidapi-key': '133ecc86cbmsh8e1c06edec78facp103c07jsnfa01dfe655c1',  // Replace this with your actual API key
    'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com'
  }
};

app.post('/search', async (req, res) => {
  const word = req.body.word;
  options.url = `https://wordsapiv1.p.rapidapi.com/words/${word}/synonyms`;

  try {
    const response = await axios.request(options);
    const synonyms = response.data.synonyms;
    if (synonyms && synonyms.length > 0) {
      res.send({ word, synonyms });
    } else {
      res.send({ word, synonyms: [] });
    }
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error retrieving synonyms. Please try again.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
