const express = require('express');
const yelp = require('yelp-fusion');

const app = express();
const port = process.env.PORT || 5000;

app.get('/api/hello', (req, res) => {
  res.send({ message: 'Hello From Express' });
});

app.get('/api/search', (req, res) => {
  client.search({
    offset: 5,
    categories: 'chinese',
    location: 'chicago, il'
  }).then(response => {

    const businesses = response.jsonBody.businesses
    const restaurantData = [];

    businesses.map(business => {
       const data = {name: business.name, image: business.image_url};
       restaurantData.push(data)
     })

    res.send(restaurantData);

  }).catch(e => {
    console.log(e);
  });

});


app.listen(port, () => console.log(`Listening on port ${port}`));


const client = yelp.client('sqO1jfckyHBvxwS4GaxCdOKVR8CPGAF9dmjXsSUNQCNmw7hXoxez-AiGrLsjI2KNAIlAxjbRqb_ZuiIzb-8fAzcZakqeLooDK_FRAr81Vx7HeiDBkDTvwF9ydtUzW3Yx');


