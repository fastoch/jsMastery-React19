const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// to access appwrite functionalities, we need to define a new appwrite client
const client = new Client()
  .setEndPoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);

// then, we can define which appwrite functionality we want to use
const database = new Databases(client);

// function that tracks the searches made by different users
export const updateSearchCount = async (searchTerm, movie) => {
  // use appwrite SDK to check if the search term already exists in the database
    // if it does, increment the count by 1
    // if it doesn't, create a new document with the search term and a count of 1
}