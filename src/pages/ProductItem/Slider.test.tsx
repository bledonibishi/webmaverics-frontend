import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const SliderTest = () => {
  const [nav1, setNav1] = useState<any>(null)
  const [nav2, setNav2] = useState<any>(null)

  const slider1 = useRef<Slider | null>(null)
  const slider2 = useRef<Slider | null>(null)

  useEffect(() => {
    setNav1(slider1.current)
    setNav2(slider2.current)
  }, [])

  const settings1 = {
    dots: false,
    arrows: false,
    infinite: false,
    speed: 100,
    slidesToShow: 6,
    slidesToScroll: 1,
    focusOnSelect: true,
    vertical: true,
    verticalSwiping: true,
    swipeToSlide: true,
  }
  const settings2 = {
    dots: false,
    infinite: false,
    arrows: false,
    speed: 500,
    slidesToShow: 3,
    focusOnSelect: true,
    slidesToScroll: 1,
  }

  return (
    <div
      // style={{ width: '500px', height: '400px' }}
      className="d-flex justify-content-between"
    >
      <div className="test-slider-1">
        <Slider {...settings1} asNavFor={nav2} ref={slider1}>
          <div onClick={() => slider1.current?.slickGoTo(1)}>
            <h3>1</h3>
          </div>
          <div onClick={() => slider1.current?.slickGoTo(2)}>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
      <div className="test-slider-2 bg-warning">
        <Slider asNavFor={nav1} ref={slider2} {...settings2}>
          <div className="bg-primary">
            <h3>1</h3>
          </div>
          <div>
            <h3>2</h3>
          </div>
          <div>
            <h3>3</h3>
          </div>
          <div>
            <h3>4</h3>
          </div>
          <div>
            <h3>5</h3>
          </div>
          <div>
            <h3>6</h3>
          </div>
        </Slider>
      </div>
    </div>
  )
}

export default SliderTest
