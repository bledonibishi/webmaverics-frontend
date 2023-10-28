import React, { useState } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import ReactImageZoom from 'react-image-zoom'
import ReactImageMagnify from 'react-image-magnify'
import 'swiper/css'
import 'swiper/css/bundle'
import './swipperStyle.css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'
import 'swiper/css/thumbs'

import Img1 from '@/assets/images/productIMG1.png'
import Img1Big from '@/assets/images/Img1Big.png'
import Img2 from '@/assets/images/productIMG2.png'
import Img3 from '@/assets/images/productIMG3.png'
import Img4 from '@/assets/images/productIMG4.png'
import Img5 from '@/assets/images/productIMG5.png'
import Img6 from '@/assets/images/productIMG6.png'
import Img7 from '@/assets/images/productIMG7.png'
import Img8 from '@/assets/images/productIMG8.png'
import Img9 from '@/assets/images/productIMG9.png'
import Img10 from '@/assets/images/productIMG10.png'

import { FreeMode, Navigation, Thumbs, Pagination } from 'swiper/modules'

import SwiperCore from 'swiper'

SwiperCore.use([Navigation, Thumbs])

declare global {
  interface Window {
    thumbsSwiper: any // Define the type of thumbsSwiper as appropriate
  }
}

type sliderPropTypes = {
  images?: []
}

const SwipperSlider: React.FC<sliderPropTypes> = ({ images }) => {
  const props = {
    width: 700,
    height: 700,
    zoomWidth: 500,
    scale: 1.8,
    zoomPosition: 'right',
  }
  //   const [thumbsSwiper, setThumbsSwiper] = useState<any>(Swiper)

  return (
    // <div className="d-flex">
    <>
      <div
        className="mr-6 "
        // style={{ width: '50px', height: '400px' }}
        id="thumb-slider"
      >
        {/* <div className="d-flex position-relative mb-4 justify-center hidden md:flex">
          <div className="swiper-button-prev swiper-button-disabled"></div>
        </div> */}
        <Swiper
          // onSwiper={setThumbsSwiper}
          onSwiper={(swiper) => (window.thumbsSwiper = swiper)}
          // loop={true}
          //   navigation={true}
          spaceBetween={10}
          slidesPerView={6}
          freeMode={true}
          direction="vertical"
          watchSlidesProgress={true}
          className="mySwiper"
          modules={[Navigation, Thumbs]}
        >
          {images?.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <img
                src={`http://127.0.0.1:5000/img/products/${imageUrl}`}
                alt={`Image ${index}`}
              />
            </SwiperSlide>
          ))}

          {/* <SwiperSlide>
            <img src={Img1} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img2} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img3} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img4} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img5} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img6} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img7} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img8} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img9} />
          </SwiperSlide>
          <SwiperSlide>
            <img src={Img10} />
          </SwiperSlide> */}
        </Swiper>
        {/* <div className="d-flex position-relative mt-4 justify-center hidden md:flex">
          <div className="swiper-button-next"></div>
        </div> */}
      </div>
      <div className="w-100">
        <Swiper
          loop={true}
          // spaceBetween={10}
          //   navigation={true}
          thumbs={{ swiper: window.thumbsSwiper }}
          className="mySwiper2"
          // modules={[FreeMode, Navigation, Thumbs]}
        >
          {images?.map((imageUrl, index) => (
            <SwiperSlide key={index}>
              <img
                src={`http://127.0.0.1:5000/img/products/${imageUrl}`}
                alt={`Image ${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
    // </div>
  )
}

export default SwipperSlider
