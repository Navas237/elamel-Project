import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { useHeaderImages } from "../src/hooks/useHeaderImages";

function MySwiper() {
  const { data: headerImages } = useHeaderImages();
  const images = headerImages || [];

  return (
    <div style={{ width: "100%", margin: "auto", marginBottom: "0px" }} id='home'>
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        loop={images.length > 1}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation
        autoHeight={true}
        pagination={{ clickable: true }}
        style={{
          width: "100%",
        }}
      >
        {images.length > 0 && (
          images.map((img) => (
            <SwiperSlide key={img.id}>
              <img
                src={img.imgUrl}
                alt="عروض مكتبة الأمل"
                className="w-full h-auto block"
              />
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </div>
  );
}

export default MySwiper;