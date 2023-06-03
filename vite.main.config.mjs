import { defineConfig } from 'vite';

const YOUTUBE_TV_URL = 'https://youtube.com/tv';
const YOUTUBE_TV_USER_AGENT = 'Mozilla/5.0 (SMART-TV; Linux; Android 11; 4K Google TV Box Build/RTT0.210829.002; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/113.0.5672.76 Safari/537.36';
;

// https://vitejs.dev/config
export default defineConfig({
  define: {
    YOUTUBE_TV_URL: JSON.stringify(process.env.YOUTUBE_TV_URL || YOUTUBE_TV_URL),
    YOUTUBE_TV_USER_AGENT: JSON.stringify(process.env.YOUTUBE_TV_USER_AGENT || YOUTUBE_TV_USER_AGENT),
  }
});
