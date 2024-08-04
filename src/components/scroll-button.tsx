"use client";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { ChevronDownIcon } from "lucide-react";

type Props = {
  targetId: string;
  label: string;
};
export default function ScrollButton({ targetId, label }: Props) {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToElement = () => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const targetElement = document.getElementById(targetId);

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(!entry.isIntersecting);
      },
      { rootMargin: "0px" }
    );

    if (targetElement) {
      observer.observe(targetElement);
    }

    return () => {
      if (targetElement) {
        observer.unobserve(targetElement);
      }
    };
  }, [targetId]);

  return (
    isVisible && (
      <Button
        size="lg"
        onClick={scrollToElement}
        variant="ghost"
        className="fixed bottom-5 right-10 z-50"
      >
        {label}
        <ChevronDownIcon className="ml-2 size-6" />
      </Button>
    )
  );
}
