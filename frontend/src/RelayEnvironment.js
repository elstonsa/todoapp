import { Environment, Network, RecordSource, Store } from 'relay-runtime';

const HTTP_ENDPOINT = "http://localhost:8080/graphql/";

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchRelay(operation, variables) {
  return fetch(HTTP_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
    return response.json();
  });
}

// Create a network layer from the fetch function
const network = Network.create(fetchRelay);

// Create a new Relay Environment with a new network layer and a new record source
const environment = new Environment({
  network,
  store: new Store(new RecordSource()),
});

export default environment;
