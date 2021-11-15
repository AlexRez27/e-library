// Module dependency
import axios from 'axios';

const headers = {
  api_key: process.env.VUE_APP_CONTENTSTACK_API_KEY,
  access_token: process.env.VUE_APP_CONTENTSTACK_DELIVERY_TOKEN,
};

// function for getting single entie using Content Delivery API
export default {
  async getEntrie(contentTypeUid, title) {
    const book = await axios.get(`${process.env.VUE_APP_CONTENTSTACK_BASE_URL}/content_types/${contentTypeUid}/entries?environment=${process.env.VUE_APP_CONTENTSTACK_ENVIRONMENT}&query={"title":"${title}"}`, {
      headers,
    }).then(
      (response) => response.data.entries[0],
      (error) => {
        console.log(error);
      },
    );
    return book;
  },

  // function for getting single asset using Content Delivery API
  async getAsset(assetId) {
    const asset = await axios.get(`${process.env.VUE_APP_CONTENTSTACK_BASE_URL}/assets/${assetId}?environment=${process.env.VUE_APP_CONTENTSTACK_ENVIRONMENT}`, {
      headers,
    }).then(
      (response) => response.data.asset,
      (error) => {
        console.log(error);
      },
    );
    return asset;
  },
};
