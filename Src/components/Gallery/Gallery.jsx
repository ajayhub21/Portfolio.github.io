import { useSelector } from 'react-redux'
import SectionHeading from '../ui/SectionHeading'
import DomeGallery from '../DomeGallery/DomeGallery'
import { galleryPhotos } from '../../data/gallery'
import styles from './Gallery.module.css'

const Gallery = () => {
  const theme = useSelector((state) => state.ui.theme)
  
  const formattedItems = galleryPhotos.map(photo => ({
    src: photo.src,
    alt: photo.caption
  }))

  const blurColor = theme === 'light' ? '#EAE5D9' : '#1a1a2e'; // Approximate beach sand colors

  return (
    <section className={styles.gallery} id="gallery">
      <div className="container">
        <SectionHeading title="Photo" highlight="Gallery" subtitle="Moments captured through the lens" />

        <div style={{ width: '100%', height: '700px', position: 'relative', marginTop: '2rem' }}>
          <DomeGallery 
            images={formattedItems}
            overlayBlurColor={blurColor}
            grayscale={false}
          />
        </div>
      </div>
    </section>
  )
}

export default Gallery
