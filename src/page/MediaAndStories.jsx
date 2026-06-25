import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams, Link } from "react-router-dom";
import { motion } from 'framer-motion';
import { API_BASE_URL, getImageUrl } from '../apiConfig';

const MediaAndStories = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeTab, setActiveTab] = useState('photos');
  
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

  // Sync URL search parameters (?filter=...) with activeTab state
  useEffect(() => {
    const filterParam = searchParams.get("filter")?.toLowerCase().trim();
    const validTabs = ['photos', 'videos', 'press'];

    if (filterParam && validTabs.includes(filterParam)) {
      setActiveTab(filterParam);
    } else {
      setActiveTab('photos');
      setSearchParams({ filter: 'photos' }, { replace: true });
    }
  }, [searchParams]);

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

  const sidebarTabs = [
    { id: 'photos', label: 'Photo Gallery', icon: '📸' },
    { id: 'videos', label: 'Video Gallery', icon: '🎥' },
    { id: 'press', label: 'Press Coverage', icon: '🗞️' },
  ];

  if (loading) {
    return (
      <div className="w-full py-32 text-center bg-white text-gray-500 font-bold tracking-wider">
        Loading Media Dashboard...
      </div>
    );
  }

  return (
    <div className="bg-bg-color min-h-screen relative pb-20">
      
      {/* Banner Section */}
      <section className="bg-[#E56D37] text-white py-16 px-4 mb-12">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold mb-4 heading-font"
          >
            Media & Stories
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl max-w-3xl mx-auto text-orange-50 body-font"
          >
            Discover the stories of change, our latest news, and the visual journey of our impact.
          </motion.p>
        </div>
      </section>

      {/* Main Grid Workspace - Split into Sidebar (20%) and Dynamic Feed (80%) */}
      <div className="max-w-12xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 items-start">
          
          {/* LEFT SIDEBAR: 20% Width Panel Layer (lg:col-span-2) */}
          <aside className="lg:col-span-2 sticky top-50 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex flex-col gap-2 z-30">
            <h2 className="text-md font-bold text-[#212121] uppercase tracking-widest px-2 mb-2 heading-font">
              Galleries & News
            </h2>
            <div className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible no-scrollbar gap-1.5">
              {sidebarTabs.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSearchParams({ filter: tab.id })}
                    className={`w-full text-left px-4 py-2.5 rounded-xl text-md font-bold whitespace-nowrap lg:whitespace-normal transition-all duration-200 flex items-center justify-between group cursor-pointer ${
                      isSelected
                        ? "bg-[#E56D37] text-white shadow-md translate-x-1"
                        : "text-gray-600 hover:bg-orange-50/40 hover:text-[#E56D37]"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <span>{tab.icon}</span>
                      <span className="heading-font">{tab.label}</span>
                    </div>
                    <span className={`text-[10px] hidden lg:inline transition-all ${isSelected ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"}`}>
                      &rarr;
                    </span>
                  </button>
                );
              })}
            </div>
          </aside>

          {/* RIGHT VIEWPORT: 80% Width Display Stream Container (lg:col-span-8) */}
          <main className="lg:col-span-8 w-full min-h-[55vh]">
            
            {/* 1. PHOTOS GRID SECTION */}
            {activeTab === 'photos' && (
              medias.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-4 animate-in fade-in duration-300"
                >
                  {medias.map((media, idx) => (
                    <div 
                      key={media.id} 
                      className="aspect-square bg-white rounded-2xl overflow-hidden relative group cursor-pointer shadow-sm border-2 border-white hover:border-[#E56D37] transition-all duration-300"
                      onClick={() => {
                        setCurrentPhotoIndex(idx);
                        setIsPhotoModalOpen(true);
                      }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center text-gray-400 group-hover:scale-105 transition-transform duration-500">
                        <img src={getImageUrl(media.image_url)} alt={media.title || 'Gallery Item'} className='w-full h-full object-cover' />
                      </div>
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100 duration-300">
                        <span className="text-white text-[11px] font-bold bg-black/50 px-3 py-1.5 rounded-full backdrop-blur-sm heading-font">View Fullscreen</span>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : (
                <div className="w-full py-16 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl bg-white font-medium">No photo memories available.</div>
              )
            )}

            {/* 2. VIDEOS GRID SECTION */}
            {activeTab === 'videos' && (
              videos.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 animate-in fade-in duration-300"
                >
                  {videos.map((video) => (
                    <a 
                      key={video.id}
                      href={video.video_url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer border border-gray-100"
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
                              onError={(e) => { e.target.src = "https://placehold.co/600x400?text=Video+Thumbnail"; }}
                            />
                            <div className="absolute w-12 h-12 bg-white/30 backdrop-blur-md rounded-full flex items-center justify-center shadow-md group-hover:bg-[#E56D37] group-hover:scale-110 transition-all duration-300 z-10">
                              <svg className="w-6 h-7 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-4 bg-white">
                        <h3 className="font-bold text-gray-800 text-xs mb-1 line-clamp-2 text-left leading-snug group-hover:text-[#E56D37] transition-colors heading-font">{video.title}</h3>
                        <p className="text-[10px] text-gray-400 font-medium text-left">
                          {video.duration ? `${video.duration} • ` : ''} {video.views} views
                        </p>
                      </div>
                    </a>
                  ))}
                </motion.div>
              ) : (
                <div className="w-full py-16 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl bg-white font-medium">No clip reports available.</div>
              )
            )}

            {/* 3. PRESS ARTICLES TIMELINE SECTION */}
            {activeTab === 'press' && (
              pressCov.length > 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4 animate-in fade-in duration-300"
                >
                  {pressCov.map(item => (
                    <Link key={item.id} to={`/media-and-stories/${item.slug}`} className="flex flex-col sm:flex-row gap-5 bg-white p-5 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow group">
                      <div className="sm:w-40 h-28 bg-gray-50 rounded-xl flex items-center justify-center shrink-0 overflow-hidden relative border border-gray-100">
                        <img src={getImageUrl(item.image || item.image_url)} alt="" className='w-full h-full object-cover group-hover:scale-105 transition-transform duration-500' onError={(e) => { e.target.src = "https://placehold.co/400x300?text=Press+News"; }} />
                      </div>
                      <div className="flex-1 flex flex-col justify-center">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="bg-orange-50 text-[#E56D37] px-2.5 py-0.5 rounded-full text-[10px] font-extrabold heading-font">{item.tag || 'News'}</span>
                          <span className="text-gray-400 text-[11px] font-medium">{item.datee}</span>
                        </div>
                        <h3 className="text-sm font-bold text-gray-800 text-left mb-1.5 group-hover:text-[#E56D37] transition-colors leading-snug heading-font line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-gray-500 text-xs text-left line-clamp-2 leading-relaxed body-font">
                          {item.para}
                        </p>
                      </div>
                    </Link>
                  ))}
                </motion.div>
              ) : (
                <div className="w-full py-16 text-center text-gray-400 border-2 border-dashed border-gray-200 rounded-2xl bg-white font-medium">No press highlights documented.</div>
              )
            )}

          </main>
        </div>
      </div>

      {/* LIGHTBOX PREVIEW MODAL EXPANSION */}
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
              alt="Gallery Fullscreen Preview" 
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
                  className={`relative shrink-0 h-14 aspect-square rounded-md overflow-hidden transition-all duration-300 cursor-pointer ${
                    currentPhotoIndex === idx ? 'ring-2 ring-white scale-105 opacity-100 shadow-md' : 'opacity-40 hover:opacity-100'
                  }`}
                >
                  <img src={getImageUrl(media.image_url)} className="w-full h-full object-cover" alt="Thumbnail item preview" />
                </button>
              ))}
            </div>
          )}

          {medias.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-[10px] font-mono tracking-widest">
              {currentPhotoIndex + 1} / {medias.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MediaAndStories;