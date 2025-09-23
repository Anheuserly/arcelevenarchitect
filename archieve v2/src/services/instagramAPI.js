import axios from 'axios';

const INSTAGRAM_ACCESS_TOKEN = process.env.REACT_APP_INSTAGRAM_ACCESS_TOKEN;
const INSTAGRAM_USER_ID = process.env.REACT_APP_INSTAGRAM_USER_ID;

class InstagramAPI {
  constructor() {
    this.baseURL = 'https://graph.instagram.com';
    this.client = axios.create({
      baseURL: this.baseURL,
      timeout: 15000,
      headers: {
        'Content-Type': 'application/json',
      }
    });

    // Add request interceptor for logging
    this.client.interceptors.request.use(
      (config) => {
        console.log('Making Instagram API request:', config.url);
        return config;
      },
      (error) => {
        console.error('Request error:', error);
        return Promise.reject(error);
      }
    );

    // Add response interceptor for error handling
    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 400) {
          console.error('Instagram API Error: Invalid access token or expired');
        } else if (error.response?.status === 429) {
          console.error('Instagram API Error: Rate limit exceeded');
        }
        return Promise.reject(error);
      }
    );
  }

  async getInstagramFeed(limit = 50) {
    if (!INSTAGRAM_ACCESS_TOKEN || !INSTAGRAM_USER_ID) {
      throw new Error('Instagram credentials not configured. Please check your environment variables.');
    }

    try {
      const response = await this.client.get(`/${INSTAGRAM_USER_ID}/media`, {
        params: {
          fields: 'id,caption,media_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count,children{media_url,media_type,thumbnail_url}',
          access_token: INSTAGRAM_ACCESS_TOKEN,
          limit: Math.min(limit, 100) // Instagram API max is 100
        }
      });

      if (!response.data || !response.data.data) {
        throw new Error('Invalid response from Instagram API');
      }

      return this.processMediaData(response.data.data);
    } catch (error) {
      console.error('Error fetching Instagram data:', error);
      
      if (error.response?.data?.error) {
        const apiError = error.response.data.error;
        throw new Error(`Instagram API Error: ${apiError.message}`);
      }
      
      throw new Error('Failed to fetch Instagram feed. Please try again later.');
    }
  }

  async getUserInfo() {
    try {
      const response = await this.client.get(`/${INSTAGRAM_USER_ID}`, {
        params: {
          fields: 'id,username,account_type,media_count',
          access_token: INSTAGRAM_ACCESS_TOKEN
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching user info:', error);
      return null;
    }
  }

  processMediaData(mediaData) {
    return mediaData.map(item => ({
      id: item.id,
      type: this.normalizeMediaType(item.media_type),
      caption: item.caption || '',
      mediaUrl: item.media_url,
      thumbnailUrl: item.thumbnail_url || item.media_url,
      permalink: item.permalink,
      timestamp: new Date(item.timestamp),
      likes: item.like_count || 0,
      comments: item.comments_count || 0,
      children: this.processChildren(item.children?.data || []),
      hashtags: this.extractHashtags(item.caption || ''),
      mentions: this.extractMentions(item.caption || ''),
      isReel: this.isReel(item),
      engagement: (item.like_count || 0) + (item.comments_count || 0)
    }));
  }

  processChildren(children) {
    return children.map(child => ({
      mediaUrl: child.media_url,
      mediaType: this.normalizeMediaType(child.media_type),
      thumbnailUrl: child.thumbnail_url || child.media_url
    }));
  }

  normalizeMediaType(type) {
    return type ? type.toLowerCase() : 'unknown';
  }

  isReel(item) {
    const caption = (item.caption || '').toLowerCase();
    return item.media_type === 'VIDEO' && 
           (caption.includes('#reel') || 
            caption.includes('#reels') || 
            caption.includes('reel'));
  }

  extractHashtags(caption) {
    const hashtagRegex = /#[\w\u00c0-\u024f\u1e00-\u1eff]+/gi;
    return caption.match(hashtagRegex) || [];
  }

  extractMentions(caption) {
    const mentionRegex = /@[\w.]+/g;
    return caption.match(mentionRegex) || [];
  }

  // Utility method to refresh access token (if needed)
  async refreshAccessToken() {
    try {
      const response = await this.client.get('/refresh_access_token', {
        params: {
          grant_type: 'ig_refresh_token',
          access_token: INSTAGRAM_ACCESS_TOKEN
        }
      });

      return response.data;
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw error;
    }
  }
}

export const instagramAPI = new InstagramAPI();

// Export the class as well for testing purposes
export { InstagramAPI };