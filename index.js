
const fetch = require('node-fetch');
exports.stocksNews = async (req, res) => {
  const { text: ticker } = req.body;

  const news = await fetch(`https://api.polygon.io/v2/reference/news?limit=5&order=descending&sort=published_utc&ticker=${ticker}&apiKey=${process.env.POLYGON_API_KEY}`);

  const { results } = await news.json();
  const blocks = results.map((result) => {

  const {title, published_utc, article_url, image_url, description } = result;
  const slackTemplate = {
    "type": "section",
    "text": {
      "type": "mrkdwn",
      "text": `*Title* \n ${title} \n *Description* \n ${description} \n *Time* \n ${published_utc} \n *Link* \n <${article_url}>`
    },
    "accessory": {
      "type": "image",
      "image_url": `${image_url}`,
      "alt_text": "Image"
    },
  }
  return slackTemplate;
  });

  res.status(200).json({blocks});
}
