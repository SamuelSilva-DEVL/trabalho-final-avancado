import React from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation } from "swiper/modules"
import { ProductCard } from "../ProductCard"

// Import Swiper styles
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"
import "./styles.css"

export function SwiperProducts({ products }) {
  return (
    <Swiper
      spaceBetween={15}
      pagination={{
        clickable: true,
      }}
      navigation={{
        clickable: true,
      }}
      modules={[Navigation, Pagination]}
      breakpoints={{
        320: { slidesPerView: 1 },
        600: { slidesPerView: 2 },
        900: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      }}
      className="mySwiper"
    >
      {products?.map((product, index) => (
        <SwiperSlide key={index}>
          <ProductCard product={product} />
        </SwiperSlide>
      ))}
    </Swiper>
  )
}
