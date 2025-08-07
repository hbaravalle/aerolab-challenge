import Image from 'next/image';
import { LuChevronLeft, LuChevronRight } from 'react-icons/lu';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

type Screenshot = {
  id: number;
  image_id: string;
  url: string;
};

interface GalleryProps {
  images: Screenshot[];
  title: string;
}

function GallerySkeleton() {
  return (
    <div className="grid grid-cols-4 gap-2 md:grid-cols-5 md:gap-4">
      <div className="aspect-[1/1] rounded-lg bg-gray-300" />
      <div className="aspect-[1/1] rounded-lg bg-gray-300" />
      <div className="aspect-[1/1] rounded-lg bg-gray-300" />
      <div className="aspect-[1/1] rounded-lg bg-gray-300" />
      <div className="hidden aspect-[1/1] rounded-lg bg-gray-300 md:block" />
    </div>
  );
}

export default function Gallery({ images, title }: GalleryProps) {
  if (!images || images.length === 0) {
    return <GallerySkeleton />;
  }
  return (
    <div className="relative">
      <Swiper
        modules={[Navigation]}
        spaceBetween={8}
        slidesPerView={4}
        loop={true}
        navigation={{
          prevEl: '.swiper-button-prev-custom',
          nextEl: '.swiper-button-next-custom',
        }}
        breakpoints={{
          768: {
            slidesPerView: 5,
            spaceBetween: 16,
          },
        }}
      >
        {images.map(image => (
          <SwiperSlide
            key={image.id}
            style={{ backgroundColor: '#d1d5dc', borderRadius: '8px' }}
          >
            <Image
              width={200}
              height={200}
              className="aspect-square w-full rounded-lg object-cover opacity-0 transition-opacity duration-300"
              src={`https:${image.url}`}
              alt={`${title} screenshot`}
              onLoad={e => e.currentTarget.classList.remove('opacity-0')}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      <button className="swiper-button-prev-custom absolute top-1/2 left-[-12px] z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgb(242,242,242,0.85)] backdrop-blur-md transition-colors duration-300 hover:bg-gray-50">
        <LuChevronLeft strokeWidth={2} className="h-4 w-4 text-black" />
      </button>
      <button className="swiper-button-next-custom absolute top-1/2 right-[-12px] z-10 flex h-8 w-8 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-[rgb(242,242,242,0.85)] backdrop-blur-md transition-colors duration-300 hover:bg-gray-50">
        <LuChevronRight strokeWidth={2} className="h-4 w-4 text-black" />
      </button>
    </div>
  );
}
