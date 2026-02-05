"use client";

import React, { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { usePublicFeedbacks } from "@/services/feedback/service";
import Autoplay from "embla-carousel-autoplay";
import { Quote, Star } from "lucide-react";

interface TestimonialsCarouselProps {
  serviceType: "investment" | "export";
  locale: string;
}

export default function TestimonialsCarousel({
  serviceType,
  locale,
}: TestimonialsCarouselProps) {
  const { data: feedbacks, isLoading, error } = usePublicFeedbacks(serviceType);
  const [plugin] = useState(() =>
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  if (isLoading) {
    return (
      <div className="w-full bg-gradient-to-b from-gray-50 to-white py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-6"></div>
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <div className="h-4 bg-gray-200 rounded w-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!feedbacks || feedbacks.length === 0) {
    return null;
  }

  const title =
    serviceType === "investment"
      ? locale === "es"
        ? "Lo que dicen nuestros inversionistas"
        : "What our investors say"
      : locale === "es"
      ? "Lo que dicen nuestros exportadores"
      : "What our exporters say";

  return (
    <div className="w-full bg-gradient-to-b from-gray-50 to-white py-8 min-h-[400px]">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-800 font-montserrat">
          {title}
        </h2>
        
        <div className="w-full max-w-3xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            plugins={[plugin]}
            className="w-full"
          >
            <CarouselContent className="-ml-2 md:-ml-4">
              {feedbacks.map((feedback, index) => (
                <CarouselItem key={feedback.id || index} className="pl-2 md:pl-4">
                  <div className="p-1">
                    <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 relative overflow-hidden min-h-[300px]">
                    {/* Quote decoration */}
                    <div className="absolute top-2 right-2 text-red-100">
                      <Quote size={60} className="opacity-50" />
                    </div>

                    {/* Content */}
                    <div className="relative z-10">
                      {/* Rating stars */}
                      <div className="flex items-center justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={20}
                            className={`${
                              i < feedback.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            } mx-0.5`}
                          />
                        ))}
                      </div>

                      {/* Message */}
                      <p className="text-gray-700 text-base md:text-lg text-center mb-6 leading-relaxed font-opensans italic">
                        "{feedback.message}"
                      </p>

                      {/* Author info */}
                      <div className="border-t border-gray-200 pt-4">
                        <p className="text-gray-900 font-bold text-base text-center font-montserrat">
                          {feedback.name}
                        </p>
                        {feedback.email && (
                          <p className="text-gray-500 text-xs text-center mt-1">
                            {feedback.email}
                          </p>
                        )}
                        <div className="flex items-center justify-center mt-3 gap-2">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full"></div>
                          <p className="text-gray-600 text-xs font-medium">
                            {serviceType === "investment"
                              ? locale === "es"
                                ? "Servicios de Inversión"
                                : "Investment Services"
                              : locale === "es"
                              ? "Servicios de Exportación"
                              : "Export Services"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          
          <CarouselPrevious className="-left-12 md:-left-16" />
          <CarouselNext className="-right-12 md:-right-16" />
        </Carousel>
        </div>

        {/* Indicators */}
        {feedbacks.length > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            {feedbacks.map((_, index) => (
              <div
                key={index}
                className="w-2 h-2 rounded-full bg-gray-300"
              ></div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
