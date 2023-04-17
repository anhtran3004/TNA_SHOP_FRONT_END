type GalleryProductType = {
  images: string
}

const Gallery = (props: GalleryProductType) => {
  // const featImage = images[0];

  return (
    <section className="product-gallery">
      <div className="product-gallery__thumbs">
        {/*{images.map(image => (*/}
          <div className="product-gallery__thumb">
            <img src={props.images} alt="" />
          </div>
        {/*))}*/}
      </div>

      <div className="product-gallery__image">
        <img src={props.images} alt="" />
      </div>
    </section>
  );
};
  
export default Gallery;
  