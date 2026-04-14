export default  function getOptimizedImage(url){
  if (!url) return url;
  if (url.startsWith('data:') || url.startsWith('/') || url.includes('localhost')) return url;
  return `https://wsrv.nl/?url=${encodeURIComponent(url)}&w=900&output=webp&q=90`;
};