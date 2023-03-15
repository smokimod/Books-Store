import React, { useState } from 'react';
import { FreeMode, Keyboard, Navigation, Pagination, Scrollbar, Thumbs } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import altBookBigIcon from '../../../icons/book-images/image-alt.svg';

import './slider.scss';

import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';

export const BookSlider = ({ images = [] }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const IMAGE_URL = 'https://strapi.cleverland.by';

  return (
    <React.Fragment>
      <Swiper
        loop={true}
        spaceBetween={10}
        navigation={true}
        thumbs={{ swiper: thumbsSwiper }}
        modules={[FreeMode, Navigation, Thumbs, Keyboard, Pagination]}
        pagination={{
          clickable: true,
          el: '.my-swiper-pagination',
          type: 'bullets',
        }}
        className='mySwiper2'
        data-test-id='slide-big'
      >
        {images && images.length >= 1 ? (
          images.map((item) => (
            <SwiperSlide key={item.url}>
              <img src={`${IMAGE_URL}${item.url}`} alt='cover-books' loading='lazy' />
            </SwiperSlide>
          ))
        ) : (
          <SwiperSlide>
            <img src={altBookBigIcon} alt='book' data-test-id='slide-mini' />
          </SwiperSlide>
        )}
      </Swiper>
      <div className='my-swiper-pagination' />
      {images && images.length > 1 ? (
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={true}
          spaceBetween={30}
          slidesPerView={5}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Scrollbar, Thumbs, Keyboard, Pagination]}
          scrollbar={{ draggable: true }}
          keyboard={{
            enabled: true,
          }}
          className='mySwiper'
        >
          {images.map((item) => (
            <SwiperSlide key={item.url} data-test-id='slide-mini'>
              <img src={`${IMAGE_URL}${item.url}`} alt='cover-books' className='img_disabled' />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : null}
    </React.Fragment>
  );
};
