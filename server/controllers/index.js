/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */

const axios = require('axios');
const { Session } = require('../models');

// const url = 'https://uat-api.synapsefi.com/v3.1';

const { clientID, clientSecret } = require('../config');

const headers = {
  'Content-Type': 'application/json',
  'X-SP-GATEWAY': `${clientID}|${clientSecret}`,
  'X-SP-USER-IP': '127.0.0.1',
  'X-SP-USER': '|static_pin',
};

// Storage for user ID and token
let userId;
let access_token;
let newHeaders;

module.exports = {
  createUser: (req, res) => {
    const { body: { username, password } } = req;
    const session = new Session(clientID, clientSecret);

    session.getOAuth()
      .then(() => session.login(username, password))
      .then(
        ({ data }) => {
          // If MFA required
          if (+data.http_code === 202) {
            ({ mfa: { access_token } } = data); // Extract access_token from response
          }
          res.send(data);
        },
      )
      .catch(
        ({ response }) => res.status(401).send(response.data),
      );
  },
  authenticateUser: (req, res) => axios.post(`${url}/users/${userId}/nodes`, { access_token, mfa_answer: req.body.answer }, { headers: newHeaders })
    .then(({ data }) => res.send(data))
    .catch(({ response }) => res.status(401).send(response.data)),
  getTransactions: (req, res) => axios.get(`${url}/users/${userId}/node/${req.params.nodeId}/trans`, { headers: newHeaders })
    .then(({ data }) => res.send(data))
    .catch(({ response }) => res.status(401).send(response.data)),
};

/* eslint-enable */
