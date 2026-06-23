import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { API_BASE_URL, getImageUrl } from '../apiConfig';

const MediaAndStories = () => {
  const [activeTab, setActiveTab] = useState('photos');
  const location = useLocation(); 
  
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [playingVideoId, setPlayingVideoId] = useState(null);

  const [medias, setMedias] = useState([]);
  const [videos, setVideos] = useState([]);
  const [pressCov, setPressCov] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [mediaRes, videoRes, pressRes] = await Promise.all([
          fetch(`${API_BASE_URL}/media.php`),
          fetch(`${API_BASE_URL}/videos.php`),
          fetch(`${API_BASE_URL}/press_coverage.php`),
        ]);
        const mediaData = await mediaRes.json();
        const videoData = await videoRes.json();
        const pressData = await pressRes.json();
        
        if (mediaData.status === "success") {
          setMedias(mediaData.data);
        }
        if (videoData.status === "success") {
          setVideos(videoData.data);
        }
        if (pressData.status === "success") {
          setPressCov(pressData.data);
        }
      } catch (error) {
        console.error("Error loading media data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (location.hash) {
      const targetTab = location.hash.replace('#', '');
      if (['photos', 'videos', 'press'].includes(targetTab)) {
        setTimeout(() => {
          setActiveTab(targetTab);
        }, 0);
      }
      setTimeout(() => {
        const el = document.querySelector(location.hash);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 100);
    }
  }, [location.hash]);

  const getYouTubeEmbedUrl = (url) => {
    if (!url) return '';
    let videoId = '';
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    }
    return videoId ? `https://www.youtube.com/embed/${videoId}` : url;
  };

  const handlePrevPhoto = useCallback((e) => {
    e?.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev === 0 ? medias.length - 1 : prev - 1));
  }, [medias.length]);

  const handleNextPhoto = useCallback((e) => {
    e?.stopPropagation();
    setCurrentPhotoIndex((prev) => (prev === medias.length - 1 ? 0 : prev + 1));
  }, [medias.length]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isPhotoModalOpen) return;
      if (e.key === 'ArrowLeft') handlePrevPhoto();
      if (e.key === 'ArrowRight') handleNextPhoto();
      if (e.key === 'Escape') setIsPhotoModalOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPhotoModalOpen, handlePrevPhoto, handleNextPhoto]);

  return (
    <div className="bg-white min-h-screen relative">
      <section className="bg-primary text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Media & Stories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl max-w-3xl mx-auto opacity-90"
          >
            Discover the stories of change, our latest news, and the visual journey of our impact.
          </motion.p>
        </div>
      </section>

      <section className="border-b border-gray-200 sticky top-20 bg-white z-40 shadow-sm">
        <div className="max-w-xl mx-auto px-4 justify-center">
          <div className="flex overflow-x-auto no-scrollbar space-x-8 justify-center">
            {[
              { id: 'photos', label: 'Photo Gallery', icon: '📸' },
              { id: 'videos', label: 'Video Gallery', icon: '🎥' },
              { id: 'press', label: 'Press Coverage', icon: '🗞️' },
            ].map(tab => (
              <button
                key={tab.id}
                id={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 whitespace-nowrap font-bold flex items-center gap-2 border-b-2 transition-colors cursor-pointer ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-gray-50 min-h-[60vh]">
        <div className="max-w-7xl mx-auto">

          {activeTab === 'photos' && (
            <motion.div
              id="photos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
            >
              {medias.map((media, idx) => (
                <div 
                  key={media.id} 
                  className="aspect-square bg-gray-200 rounded-xl overflow-hidden relative group cursor-pointer shadow-md border-4 border-white hover:border-primary transition-all duration-300"
                  onClick={() => {
                    setCurrentPhotoIndex(idx);
                    setIsPhotoModalOpen(true);
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                    <img src={getImageUrl(media.image_url)} alt={media.title || 'Gallery Image'} className='w-full h-full object-cover' />
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                    <span className="text-white text-sm font-bold bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">View Fullscreen</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'videos' && (
            <motion.div
              id="videos"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {videos.map((video) => (
                <a 
                  key={video.id}
                  href={video.video_url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer border-4 border-white hover:border-primary"
                  onMouseEnter={() => setPlayingVideoId(video.id)}
                  onMouseLeave={() => setPlayingVideoId(null)}
                >
                  <div className="aspect-video bg-gray-900 relative overflow-hidden">
                    {playingVideoId === video.id ? (
                      <iframe
                        src={`${getYouTubeEmbedUrl(video.video_url)}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&disablekb=1`}
                        title={video.title}
                        className="absolute inset-0 w-full h-full pointer-events-none border-0 scale-105"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      ></iframe>
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <img 
                          src={getImageUrl(video.image_url)} 
                          alt={video.title} 
                          className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-60 transition-opacity duration-300" 
                        />
                        <div className="absolute w-14 h-14 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-lg group-hover:bg-[#6a752b] group-hover:scale-110 transition-all duration-300 z-10">
                          <svg className="w-7 h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-5 relative z-10 bg-white">
                    <h3 className="font-bold text-text-primary mb-1 line-clamp-2 text-md leading-snug group-hover:text-primary transition-colors">{video.title}</h3>
                    <p className="text-xs text-gray-500 mt-2">
                      {video.duration ? `${video.duration} • ` : ''} {video.views} views
                    </p>
                  </div>
                </a>
              ))}
            </motion.div>
          )}

          {activeTab === 'press' && (
            <motion.div
              id="press"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6 max-w-4xl mx-auto"
            >
              {pressCov.map(item => (
                <Link key={item.id} to={`/media-and-stories/${item.slug}`} className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                  <div className="sm:w-48 h-32 bg-gray-100 rounded-xl flex items-center justify-center shrink-0 overflow-hidden border-4 border-white shadow-sm group-hover:border-primary transition-all duration-300">
                    <img src={getImageUrl(item.image || item.image_url)} alt="" className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' />
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="bg-blue-50 text-blue-600 px-3 py-0.5 rounded-full text-[11px] font-bold">{item.tag}</span>
                      <span className="text-gray-400 text-xs">{item.datee}</span>
                    </div>
                    <h3 className="text-xl font-bold text-text-primary mb-2 group-hover:text-primary transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-gray-500 text-sm line-clamp-2 leading-relaxed">
                      {item.para}
                    </p>
                  </div>
                </Link>
              ))}
            </motion.div>
          )}
          
        </div>
      </section>

      {isPhotoModalOpen && medias.length > 0 && (
        <div 
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 p-4 backdrop-blur-md transition-all duration-300"
          onClick={() => setIsPhotoModalOpen(false)}
        >
          <button 
            className="absolute top-6 right-6 text-white/70 hover:text-white text-4xl font-light transition-colors z-50 cursor-pointer"
            onClick={() => setIsPhotoModalOpen(false)}
          >
            &times;
          </button>

          <div className="relative flex items-center justify-center w-full max-w-5xl flex-1 max-h-[75vh]">
            {medias.length > 1 && (
              <button 
                onClick={handlePrevPhoto}
                className="absolute left-0 md:-left-16 text-white/50 hover:text-white bg-black/20 hover:bg-black/50 p-4 rounded-full backdrop-blur-sm transition-all z-50 cursor-pointer"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"></path>
                </svg>
              </button>
            )}

            <motion.img 
              key={currentPhotoIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.25 }}
              src={getImageUrl(medias[currentPhotoIndex].image_url)} 
              alt="Gallery Preview" 
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm border border-neutral-800"
              onClick={(e) => e.stopPropagation()} 
            />

            {medias.length > 1 && (
              <button 
                onClick={handleNextPhoto}
                className="absolute right-0 md:-right-16 text-white/50 hover:text-white bg-black/20 hover:bg-black/50 p-4 rounded-full backdrop-blur-sm transition-all z-50 cursor-pointer"
              >
                <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </button>
            )}
          </div>

          {medias.length > 1 && (
            <div 
              className="w-full max-w-4xl mt-6 flex gap-2 overflow-x-auto no-scrollbar py-2 justify-start md:justify-center px-4 z-40"
              onClick={(e) => e.stopPropagation()}
            >
              {medias.map((media, idx) => (
                <button
                  key={media.id}
                  onClick={() => setCurrentPhotoIndex(idx)}
                  className={`relative shrink-0 h-16 aspect-square rounded-md overflow-hidden transition-all duration-300 cursor-pointer ${
                    currentPhotoIndex === idx ? 'ring-2 ring-white scale-105 opacity-100 shadow-md' : 'opacity-40 hover:opacity-100'
                  }`}
                >
                  <img src={getImageUrl(media.image_url)} className="w-full h-full object-cover" alt="Thumbnail item" />
                </button>
              ))}
            </div>
          )}

          {medias.length > 1 && (
             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs font-mono tracking-widest">
               {currentPhotoIndex + 1} / {medias.length}
             </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaAndStories;