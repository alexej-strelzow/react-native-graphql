import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import AsyncStorage from "@react-native-async-storage/async-storage";

let client: ApolloClient<any>;

export const createClient = (): ApolloClient<any> => {
  const httpLink = createHttpLink({
    // uri: 'http://localhost:4000'
    uri: 'https://pacific-atoll-47505.herokuapp.com'
  });

  const authLink = setContext(async (_, { headers }) => {
    const token = await AsyncStorage.getItem('accessToken');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${ token }` : '',
      }
    }
  });

  client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache
  });

  return client;
};

export const clearCache = async () => {
  if (client) {
    await client.clearStore();
  }
};
