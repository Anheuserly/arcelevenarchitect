import { databases, DATABASE_ID, INSTAGRAM_COLLECTION_ID, Query } from './appwrite';

class InstagramService {
  // Get all Instagram posts
  async getInstagramPosts(limit = 50) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        INSTAGRAM_COLLECTION_ID,
        [
          Query.orderDesc('$createdAt'),
          Query.limit(limit)
        ]
      );
      
      return this.processPostsData(response.documents);
    } catch (error) {
      console.error('Error fetching Instagram posts:', error);
      throw new Error('Failed to fetch Instagram posts from database');
    }
  }

  // Get posts by type
  async getPostsByType(type, limit = 20) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        INSTAGRAM_COLLECTION_ID,
        [
          Query.equal('type', type),
          Query.orderDesc('$createdAt'),
          Query.limit(limit)
        ]
      );
      
      return this.processPostsData(response.documents);
    } catch (error) {
      console.error(`Error fetching ${type} posts:`, error);
      throw new Error(`Failed to fetch ${type} posts`);
    }
  }

  // Search posts by caption
  async searchPosts(searchTerm, limit = 20) {
    try {
      const response = await databases.listDocuments(
        DATABASE_ID,
        INSTAGRAM_COLLECTION_ID,
        [
          Query.search('caption', searchTerm),
          Query.orderDesc('$createdAt'),
          Query.limit(limit)
        ]
      );
      
      return this.processPostsData(response.documents);
    } catch (error) {
      console.error('Error searching posts:', error);
      throw new Error('Failed to search posts');
    }
  }

  // Get statistics
  async getStatistics() {
    try {
      const [totalPosts, images, videos, reels, carousels] = await Promise.all([
        databases.listDocuments(DATABASE_ID, INSTAGRAM_COLLECTION_ID, [Query.limit(1)]),
        databases.listDocuments(DATABASE_ID, INSTAGRAM_COLLECTION_ID, [Query.equal('type', 'image'), Query.limit(1)]),
        databases.listDocuments(DATABASE_ID, INSTAGRAM_COLLECTION_ID, [Query.equal('type', 'video'), Query.limit(1)]),
        databases.listDocuments(DATABASE_ID, INSTAGRAM_COLLECTION_ID, [Query.equal('type', 'reel'), Query.limit(1)]),
        databases.listDocuments(DATABASE_ID, INSTAGRAM_COLLECTION_ID, [Query.equal('type', 'carousel'), Query.limit(1)])
      ]);

      return {
        totalPosts: totalPosts.total,
        totalImages: images.total,
        totalVideos: videos.total,
        totalReels: reels.total,
        totalCarousels: carousels.total
      };
    } catch (error) {
      console.error('Error fetching statistics:', error);
      throw new Error('Failed to fetch statistics');
    }
  }

  // Process posts data
  processPostsData(documents) {
    return documents.map(doc => ({
      id: doc.$id,
      type: doc.type,
      caption: doc.caption || '',
      instagramLink: doc.instagram_link,
      createdAt: new Date(doc.$createdAt),
      updatedAt: new Date(doc.$updatedAt)
    }));
  }
}

export const instagramService = new InstagramService();
