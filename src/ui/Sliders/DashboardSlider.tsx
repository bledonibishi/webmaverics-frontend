import React, { useEffect, useState } from 'react'
import Slider from 'react-slick'
import Banner from '@/assets/images/appleBanner.png'
import Banner1 from '@/assets/images/appleBanner2.png'
import Banner2 from '@/assets/images/appleBanner3.png'
import Banner3 from '@/assets/images/appleBanner4.png'
import Banner4 from '@/assets/images/appleBanner5.png'
import Banner5 from '@/assets/images/appleBanner6.png'
import Banner6 from '@/assets/images/gjirafaBanner.png'
import Banner7 from '@/assets/images/gjirafaBanner2.png'
import Banner8 from '@/assets/images/DashboardBanner.png'
import './style.css'

const DashboardSlider = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const totalSlides = 6

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setActiveIndex((prevIndex: number) => (prevIndex + 1) % totalSlides)
  //     }, 5000) // Change the slide every 3 seconds (adjust as needed)
  //     return () => clearInterval(interval)
  //   }, [])

  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    // speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoPlaySpeed: 5000,
    appendDots: (dots: any) => (
      <div
        style={{
          backgroundColor: 'transparent',
          borderRadius: '10px',
          paddingBottom: '40px',
        }}
      >
        <ul
          style={{
            display: 'flex',
            justifyContent: 'center',
            // paddingRight: '10px',
          }}
        >
          {dots}
        </ul>
      </div>
    ),
    customPaging: (i: number) => (
      <div
        className={`paginationIndex ${i === activeIndex ? 'activeStyle' : ''}`}
      ></div>
    ),
  }
  return (
    <div className="dashboard theme-custom position-relative">
      <Slider
        {...settings}
        beforeChange={(current, next) => setActiveIndex(next)}
      >
        <div>
          <img src={Banner} alt="banner" />
        </div>
        <div>
          <img src={Banner1} alt="banner" />
        </div>
        <div>
          <img src={Banner2} alt="banner" />
        </div>
        <div>
          <img src={Banner3} alt="banner" />
        </div>
        <div>
          <img src={Banner4} alt="banner" />
        </div>
        <div>
          <img src={Banner5} alt="banner" />
        </div>
        <div>
          <img src={Banner6} alt="banner" />
        </div>
        <div>
          <img src={Banner7} alt="banner" />
        </div>
        <div>
          <img src={Banner8} alt="banner" />
        </div>
      </Slider>
    </div>
  )
}

export default DashboardSlider
