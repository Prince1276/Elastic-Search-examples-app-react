const express = require('express');
const cors = require('cors');
const { Client } = require('@elastic/elasticsearch');
const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

const client = new Client({ node: 'https://10.10.13.163:9200/_search' }); // Update the Elasticsearch host and port

app.get('/search', async (req, res) => {
  try {
    const { query } = req.query; // Retrieve the search query from the request
    const { body } = await client.search({
      index: "", // Replace with your Elasticsearch index name
      q: query
    });
    res.json(body.hits.hits);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/add', async (req, res) => {
  try {
    const { data } = req.body; // Retrieve the data to be added to Elasticsearch
    const { body } = await client.index({
      index: "", // Replace with your Elasticsearch index name
      body: data
    });
    res.json(body);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// const express = require('express');
// const cors = require('cors');
// const { Client } = require('@elastic/elasticsearch');
// const app = express();
// const port = 5000;

// app.use(cors());
// app.use(express.json());

// const client = new Client({
//   node: 'https://10.10.13.163:9200', // Update the Elasticsearch host and port
//   auth: {
//     username: 'elastic',
//     password: '0yeAqLKcrbnxGo6H6wej',
//   },
// });

// app.get('/_search', async (req, res) => {
//   try {
//     const { query } = req.query; // Retrieve the search query from the request
//     const { body } = await client.search({
//       index: '.ds-kibana_sample_data_logs-2023.10.23-000001', // Replace with your Elasticsearch index name
//       q: query
//     });
//     res.json(body.hits.hits);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
