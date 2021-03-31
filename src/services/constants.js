const domain = process.env.REACT_APP_API_ENDPOINT;
const api_prefix = 'admin';
const api_current_version = 'v2'

export const apiEndpoint = `${domain}/${api_prefix}/${api_current_version}`;

export const contentTypeHeader = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Origin': '*'
}
