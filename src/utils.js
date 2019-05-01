export default {
  async getCategories() {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videoCategories?regionCode=FR&hl=fr&part=snippet&key=${
      process.env.VUE_APP_MY_GOOGLE_API_KEY
    }`);
    const json = await response.json();
    return json;
  },
  async getVideos() {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+player%2Cstatistics%2CcontentDetails%2Cstatus&regionCode=FR&chart=mostPopular&maxResults=50&key=${
      process.env.VUE_APP_MY_GOOGLE_API_KEY
    }`);
    const { items } = await response.json();
    return items.filter(video => video.status.embeddable);
  },
  async getVideosByIds(ids) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cplayer%2Cstatistics%2Cstatus&id=${ids}&key=${
      process.env.VUE_APP_MY_GOOGLE_API_KEY
    }`);
    const { items } = await response.json();
    return items;
  },
  async getVideosByCategory(category) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/videos?part=snippet%2C+player%2Cstatistics%2CcontentDetails%2Cstatus&chart=mostPopular&maxResults=50&regionCode=FR&videoCategoryId=${category}&key=${
      process.env.VUE_APP_MY_GOOGLE_API_KEY
    }`);
    const { items } = await response.json();
    return items.filter(video => video.status.embeddable);
  },
  async getVideosByQuery(query) {
    const response = await fetch(`https://www.googleapis.com/youtube/v3/search?part=id&type=video&regionCode=FR&q=${query}&maxResults=50&key=${
      process.env.VUE_APP_MY_GOOGLE_API_KEY
    }`);
    const { items } = await response.json();
    const videoIDs = items.map(item => item.id.videoId);
    const videos = await this.getVideosByIds(videoIDs.join('%2C'));
    return videos.filter(video => video.status.embeddable);
  },
  numberWithSpaces(string) {
    return string.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  },
  parseBackToLine(string) {
    return string.replace(/(?:\r\n|\r|\n)/g, '<br />');
  },
};
