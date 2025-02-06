'use client';

import { APIURL, SliderItem } from '@/constans';

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

interface HeroProps {
  slider: SliderItem[];
}

const Hero = ({ slider }: HeroProps) => {
  return (
    <div className="my-3 px-4 lg:px-32 xl:px-64">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
      >
        <CarouselContent>
          {slider.map((slide, index) => (
            <CarouselItem key={index}>
              <Image
                alt={slide.title}
                src={`${APIURL}/assets/${slide.image}`}
                width={1170}
                height={500}
                className="rounded-2xl w-full"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0" />
        <CarouselNext className="right-0" />
      </Carousel>
    </div>
  );
};

export default Hero;
