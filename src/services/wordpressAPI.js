const WP_URL = 'http://webdev002.candera.eu/wp-json/wp/v2';

// Fetch ALL posts (no category filter)
export const getAllPosts = async () => {
  try {
    console.log('🌐 Fetching ALL posts from WordPress...');
    const postsRes = await fetch(
      `${WP_URL}/posts?_embed&per_page=100&orderby=date&order=desc`
    );
    
    if (!postsRes.ok) {
      throw new Error(`HTTP error! status: ${postsRes.status}`);
    }
    
    const posts = await postsRes.json();
    console.log('📦 Raw posts data:', posts);

    const mappedPosts = posts.map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      date: post.date,
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
      author: post._embedded?.author?.[0]?.name || 'Admin',
      categoryName: post._embedded?.['wp:term']?.[0]?.[0]?.name || 'Uncategorized',
      categories: post.categories
    }));
    
    console.log('✨ Mapped posts:', mappedPosts);
    console.log('📊 Total posts found:', mappedPosts.length);
    return mappedPosts;
  } catch (error) {
    console.error('❌ Error fetching all posts:', error);
    return [];
  }
};

// Fetch posts by category
export const getPostsByCategory = async (categorySlug) => {
  try {
    console.log(`🔍 Fetching category: ${categorySlug}`);
    
    // First, get category ID
    const catRes = await fetch(`${WP_URL}/categories?slug=${categorySlug}`);
    const categories = await catRes.json();
    
    console.log('📁 Categories found:', categories);
    
    if (!categories || categories.length === 0) {
      console.log(`⚠️ Category '${categorySlug}' not found`);
      return [];
    }

    const categoryId = categories[0].id;
    console.log(`✅ Category ID: ${categoryId}`);

    // Then, get posts from that category
    const postsRes = await fetch(
      `${WP_URL}/posts?categories=${categoryId}&_embed&per_page=100&orderby=date&order=desc`
    );
    
    const posts = await postsRes.json();
    console.log(`📦 Posts in category '${categorySlug}':`, posts);

    const mappedPosts = posts.map(post => ({
      id: post.id,
      slug: post.slug,
      title: post.title.rendered,
      excerpt: post.excerpt.rendered,
      content: post.content.rendered,
      date: post.date,
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
      author: post._embedded?.author?.[0]?.name || 'Admin',
      categoryName: post._embedded?.['wp:term']?.[0]?.[0]?.name || categorySlug
    }));
    
    console.log('✨ Mapped posts:', mappedPosts);
    return mappedPosts;
  } catch (error) {
    console.error('❌ Error fetching posts by category:', error);
    return [];
  }
};

// Fetch single post by slug
export const getPostBySlug = async (slug) => {
  try {
    console.log(`🔍 Fetching post with slug: ${slug}`);
    
    const res = await fetch(`${WP_URL}/posts?slug=${slug}&_embed`);
    const posts = await res.json();
    
    console.log('📄 Post data:', posts);
    
    if (!posts || posts.length === 0) {
      console.log(`⚠️ Post '${slug}' not found`);
      return null;
    }
    
    const post = posts[0];
    const mappedPost = {
      id: post.id,
      slug: post.slug,
      title: post.title.rendered,
      content: post.content.rendered,
      date: post.date,
      image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '',
      author: post._embedded?.author?.[0]?.name || 'Admin',
      category: post._embedded?.['wp:term']?.[0]?.[0]?.name || ''
    };
    
    console.log('✨ Mapped post:', mappedPost);
    return mappedPost;
  } catch (error) {
    console.error('❌ Error fetching post:', error);
    return null;
  }
};