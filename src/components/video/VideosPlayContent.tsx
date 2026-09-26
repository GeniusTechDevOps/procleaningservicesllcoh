import React from 'react';

interface Props {
  videoUrl: string;
}

const VideosPlayContent: React.FC<Props> = ({ videoUrl }) => {
  const getYoutubeVideoId = (url: string) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|youtu\.be\/)([^"&?\/ ]{11}))/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  const getVimeoVideoId = (url: string) => {
    const regex = /https:\/\/vimeo\.com\/(\d+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };


  const getVideoSrc = (url: string) => {
    if (!url) {
      return null;
    }

    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = getYoutubeVideoId(url);
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('vimeo.com')) {
      const videoId = getVimeoVideoId(url);
      return `https://player.vimeo.com/video/${videoId}`;
    } else {
      return null;
    }
  };


  const videoSrc = getVideoSrc(videoUrl);

  if (!videoSrc) {
    return <p>Invalid video URL</p>;
  }

  return (
    <div className='relative w-full h-full overflow-hidden'>
      <iframe
        title="video-player"
        className="absolute top-0 left-0 w-full h-full border-none"
        src={`${videoSrc}`}
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideosPlayContent;