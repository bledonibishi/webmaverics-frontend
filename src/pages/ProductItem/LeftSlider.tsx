import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import Img1 from '@/assets/images/productIMG1.png'
import Img2 from '@/assets/images/productIMG2.png'
import Img3 from '@/assets/images/productIMG3.png'
import Img4 from '@/assets/images/productIMG4.png'
import Img5 from '@/assets/images/productIMG5.png'
import Img6 from '@/assets/images/productIMG6.png'
import Img7 from '@/assets/images/productIMG7.png'
import Img8 from '@/assets/images/productIMG8.png'
import Img9 from '@/assets/images/productIMG9.png'
import Img10 from '@/assets/images/productIMG10.png'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './style.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faAngleDown,
  faAngleLeft,
  faAngleUp,
} from '@fortawesome/free-solid-svg-icons'

type props = {
  selectedImage: string
  onImageChange: (newImage: string) => void
}

const LeftSlider: React.FC<props> = ({ selectedImage, onImageChange }) => {
  const sliderRef = useRef<Slider | null>(null)
  const settings = {
    dots: false,
    arrows: true,
    infinite: false,
    speed: 100,
    slidesToShow: 6,
    slidesToScroll: 1,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
  }

  return (
    <div className="left-slider">
      {/* <button onClick={() => sliderRef.current?.slickPrev()}>
        <FontAwesomeIcon icon={faAngleUp} />
      </button> */}
      <div
        className="d-flex position-relative mb-4 justify-content-center md:flex cursor-pointer"
        onClick={() => sliderRef.current?.slickPrev()}
      >
        <div
          className={`swiper-button-prev `}
          // ${
          //   sliderRef.current?.innerSlider?.list?.lastChild
          //     ? 'swiper-button-disabled'
          //     : ''
          // }
          role="button"
          aria-disabled="true"
        >
          <FontAwesomeIcon icon={faAngleLeft} />
        </div>
      </div>
      <Slider {...settings} ref={sliderRef}>
        <div
          onClick={() => {
            onImageChange(Img1)
            sliderRef.current?.slickGoTo(Img1)
          }}
        >
          <img src={Img1} alt="" className={` w-100 h-100`} />
        </div>
        <div
          onClick={() => {
            onImageChange(Img2)
            sliderRef.current?.slickGoTo(Img2)
          }}
        >
          <img src={Img2} alt="" className={` w-100 h-100`} />
        </div>
        <div
          onClick={() => {
            onImageChange(Img3)
            sliderRef.current?.slickGoTo(Img3)
          }}
        >
          <img src={Img3} alt="" className={`w-100 h-100`} />
        </div>
        <div
          onClick={() => {
            onImageChange(Img4)
            sliderRef.current?.slickGoTo(Img4)
          }}
        >
          <img src={Img4} alt="" className={` w-100 h-100`} />
        </div>
        <div onClick={() => onImageChange(Img5)}>
          <img src={Img5} alt="" className={` w-100 h-100`} />
        </div>
        <div onClick={() => onImageChange(Img6)}>
          <img src={Img6} alt="" className={` w-100 h-100`} />
        </div>
        <div onClick={() => onImageChange(Img7)}>
          <img src={Img7} alt="" className={` w-100 h-100`} />
        </div>
        <div onClick={() => onImageChange(Img8)}>
          <img src={Img8} alt="" className={` w-100 h-100`} />
        </div>
        <div onClick={() => onImageChange(Img9)}>
          <img src={Img9} alt="" className={`w-100 h-100`} />
        </div>
        <div onClick={() => onImageChange(Img10)}>
          <img src={Img10} alt="" className={` w-100 h-100`} />
        </div>
      </Slider>
      <div
        className="d-flex position-relative mt-4 justify-content-center md:flex"
        onClick={() => sliderRef.current?.slickNext()}
      >
        <div
          className={`swiper-button-next `}
          // ${
          //   sliderRef.current?.innerSlider?.list?.firstChild
          //     ? 'swiper-button-disabled'
          //     : ''
          // }
          role="button"
          aria-label="Next slide"
          aria-disabled="true"
        >
          <FontAwesomeIcon icon={faAngleDown} />
        </div>
      </div>
    </div>
  )
}

export default LeftSlider
