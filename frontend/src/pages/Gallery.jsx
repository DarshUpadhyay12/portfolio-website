import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import "../CSS/Gallery.css";

const isVideo = (url) => {
  return url && url.match(/\.(mp4|webm|ogg|mov)$/i);
};

const isVimeo = (url) => {
  return url && url.includes("vimeo.com");
};

const getVimeoId = (url) => {
  const match = url.match(/vimeo\.com\/(\d+)/);
  return match ? match[1] : null;
};

const IMAGES = {
  personal: [
    {
      id: 1,
      caption: "A new Vimeo video",
      photos: ["https://vimeo.com/1220211241"],
    },
    {
      id: 2,
      caption: "Just me enjoying nature 🌄",
      photos: ["/gallery/darsh photo-1.jpg", "/gallery/dear.jpg"],
    },
    {
      id: 3,
      caption: "Some beautiful clips of daman🏖️",
      photos: ["/gallery/Daman_compressed.mp4"],
    },
    {
      id: 4,
      caption: "Participated in google hackethon mumbai",
      photos: ["/gallery/Google_Hackathon_compressed.mp4"],
    },
    {
      id: 5,
      caption: "Nainital — nature’s way of showing off 😍",
      photos: ["/gallery/Nainital_compressed.mp4"],
    },
  ],
};

// ✨ Animation Variants
const pageVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2,
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

// ✨ Tab Switching Animations
const tabContentVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: "easeOut" },
  },
  exit: { opacity: 0, y: -30, scale: 0.98, transition: { duration: 0.4 } },
};

export default function Gallery() {
  const [tab, setTab] = useState("personal");
  const [zoom, setZoom] = useState({ img: null, post: null, index: 0 });

  const openZoom = (post, index) =>
    setZoom({ img: post.photos[index], post, index });

  const closeZoom = () => setZoom({ img: null, post: null, index: 0 });

  const nextImage = () => {
    if (!zoom.post) return;
    const nextIndex = (zoom.index + 1) % zoom.post.photos.length;
    setZoom({ ...zoom, img: zoom.post.photos[nextIndex], index: nextIndex });
  };

  const prevImage = () => {
    if (!zoom.post) return;
    const prevIndex =
      (zoom.index - 1 + zoom.post.photos.length) % zoom.post.photos.length;
    setZoom({ ...zoom, img: zoom.post.photos[prevIndex], index: prevIndex });
  };

  return (
    <motion.section
      className="gallery-container"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      {/* 🌟 Title */}
      <motion.h2 className="gallery-title" variants={childVariants}>
        Gallery
      </motion.h2>

      {/* Tabs removed as there's only one category */}

      {/* 🖼️ Posts with Animation on Tab Switch */}
      <AnimatePresence mode="wait">
        <motion.div
          key={tab} // Important for AnimatePresence to detect tab change
          className="post-feed"
          variants={tabContentVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {IMAGES[tab].map((post) => (
            <motion.div
              key={post.id}
              className="post-card"
              variants={childVariants}
              whileHover={{ y: -4 }}
            >
              <p className="caption">{post.caption}</p>
              <div
                className={`photo-grid ${
                  post.photos.length > 1 ? "multi" : "single"
                }`}
              >
                {post.photos.map((src, i) => (
                  <motion.div
                    key={i}
                    className="photo-item"
                    whileHover={{ scale: 1.05 }}
                    transition={{ type: "spring", stiffness: 250 }}
                    onClick={() => openZoom(post, i)}
                  >
                    {isVimeo(src) ? (
                      <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                        <div style={{ position: 'absolute', inset: 0, zIndex: 10, cursor: 'pointer' }} />
                        <iframe 
                          src={`https://player.vimeo.com/video/${getVimeoId(src)}?background=1`} 
                          style={{ width: "100%", height: "100%", objectFit: "cover", pointerEvents: "none" }} 
                          frameBorder="0" 
                          allow="autoplay; fullscreen; picture-in-picture" 
                        />
                      </div>
                    ) : isVideo(src) ? (
                      <video 
                        src={src} 
                        muted 
                        loop 
                        playsInline 
                        preload="none"
                        poster={src.replace('.mp4', '_poster.jpg').replace('.MP4', '_poster.jpg')}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }} 
                      />
                    ) : (
                      <img src={src} alt={post.caption || "Gallery photo"} loading="lazy" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* 🔍 Zoom Overlay */}
      <AnimatePresence>
        {zoom.img && (
          <motion.div
            className="zoom-overlay"
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(6px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
          >
            {isVimeo(zoom.img) ? (
              <motion.div
                key={zoom.img}
                className="zoom-img"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
                style={{ width: "80vw", height: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}
              >
                <iframe 
                  src={`https://player.vimeo.com/video/${getVimeoId(zoom.img)}?autoplay=1&title=0&byline=0&portrait=0`} 
                  style={{ width: "100%", height: "100%" }} 
                  frameBorder="0" 
                  allow="autoplay; fullscreen; picture-in-picture" 
                  allowFullScreen
                />
              </motion.div>
            ) : isVideo(zoom.img) ? (
              <motion.video
                key={zoom.img}
                src={zoom.img}
                controls
                autoPlay
                className="zoom-img"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            ) : (
              <motion.img
                key={zoom.img}
                src={zoom.img}
                alt={zoom.post?.caption || "zoomed image"}
                className="zoom-img"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3 }}
              />
            )}

            {zoom.post?.photos.length > 1 && (
              <>
                <button className="nav-btn left" aria-label="Previous Image" onClick={prevImage}>
                  <ChevronLeft size={32} />
                </button>
                <button className="nav-btn right" aria-label="Next Image" onClick={nextImage}>
                  <ChevronRight size={32} />
                </button>
              </>
            )}
            <button className="close-btn" aria-label="Close Preview" onClick={closeZoom}>
              <X size={28} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
