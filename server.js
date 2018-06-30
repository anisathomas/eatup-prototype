const express = require('express');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json())

app.post('/api/search/:location/:category/:radius', (req, res) => {
  const location = req.params.location
  const category = req.params.category
  const radius = req.params.radius
  client.search({
    categories: category,
    location: location,
    radius: radius
  }).then(response => {

    const businesses = response.jsonBody.businesses
    console.log(businesses)
    const restaurantData = [];

    businesses.map(business => {
       const data = {
        name: business.name,
        image: business.image_url,
        address: business.location.display_address,
        phone:business.display_phone,
        money: business.price,
        rating: business.rating
      };
       restaurantData.push(data)
       console.log(data)
     })

    res.send(restaurantData);

  }).catch(e => {
    console.log(e);
  });

});


app.listen(port, () => console.log(`Listening on port ${port}`));


const client = yelp.client('sqO1jfckyHBvxwS4GaxCdOKVR8CPGAF9dmjXsSUNQCNmw7hXoxez-AiGrLsjI2KNAIlAxjbRqb_ZuiIzb-8fAzcZakqeLooDK_FRAr81Vx7HeiDBkDTvwF9ydtUzW3Yx');


