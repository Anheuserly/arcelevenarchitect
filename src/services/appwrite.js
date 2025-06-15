import { Client, Databases, Storage, Query } from 'appwrite';

const client = new Client();

client
  .setEndpoint('https://fra.cloud.appwrite.io/v1')
  .setProject('684e6e7b002d090b48ee');

export const databases = new Databases(client);
export const storage = new Storage(client);

export const DATABASE_ID = '684e72800000bf2057d1';
export const INSTAGRAM_COLLECTION_ID = '684e72a900338c273bb0';

export { Query };
export default client;
