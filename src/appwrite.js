import { Client, Databases, Query, ID } from 'appwrite';

const PROJECT_ID = import.meta.env.VITE_APPWRITE_PROJECT_ID;
const DATABASE_ID = import.meta.env.VITE_APPWRITE_DATABASE_ID;
const COLLECTION_ID = import.meta.env.VITE_APPWRITE_COLLECTION_ID;

// to access appwrite functionalities, we need to define a new appwrite client
const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject(PROJECT_ID);

// then, we can define which appwrite functionality we want to use
const database = new Databases(client);

// function that tracks the searches made by different users
export const updateSearchCount = async (searchTerm, movie) => {
  // 1. use appwrite SDK to check if the search term already exists in the database
  try { 
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.equal('searchTerm', searchTerm)
    ]);

    // 2. if the search term exists, increment the count by 1
    if (result.documents.length > 0) {  // the "> 0" is not necessary, just for clarity
      const doc = result.documents[0]; 
      await database.updateDocument(DATABASE_ID, COLLECTION_ID, doc.$id, {
        count: doc.count + 1,
      })
    // 3. if the search term doesn't exist, create a new document with the search term and a count of 1
    } else {
      await database.createDocument(DATABASE_ID, COLLECTION_ID, ID.unique(), {
        searchTerm,
        count: 1,
        movie_id: movie.id,
        poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      })
      // the above attributes are those we defined in the appwrite database
    }
  } catch (error) {
    console.error(error);
  }// if it doesn't, create a new document with the search term and a count of 1
}

export const getTrendingMovies = async () => {
  try {
    const result = await database.listDocuments(DATABASE_ID, COLLECTION_ID, [
      Query.limit(5),
      Query.orderDesc('count')
    ])
    // the above query will return the 5 most searched terms

    return result.documents;
    
  } catch (error) {
    console.error(error);
  }
}