import { Client, Account} from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('66d8a1190014cb46b96b'); 

export const account = new Account(client);
export { ID } from 'appwrite';
