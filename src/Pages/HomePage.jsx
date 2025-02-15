import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import FeaturedCard from '../components/FeaturedCard';
import HeroSlider from '../components/home/HeroSlider';
import CategoryPick from '../components/home/CategoryPick';
import ProductList from '../components/home/ProductList';
import FeaturedSlider from '../components/home/FeaturedSlider';
import CallToAction from '../components/home/CallToAction';
import FeaturedPosts from '../components/home/FeaturedPosts';

const HomePage = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "GROCERIES DELIVERY",
      description: "Fresh & Healthy Groceries Delivery To Your Home",
      image: "https://picsum.photos/seed/groceries1/1920/1080",
      buttonText: "Shop Now"
    },
    {
      title: "FRESH FOOD DELIVERY",
      description: "Quality food delivered to your doorstep",
      image: "https://picsum.photos/seed/groceries2/1920/1080",
      buttonText: "Order Now"
    },
    {
      title: "FAST DELIVERY",
      description: "Order now and get delivery within 30 minutes",
      image: "https://picsum.photos/seed/groceries3/1920/1080",
      buttonText: "Get Started"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Her 5 saniyede bir değişecek

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length);
  };

  const [activeTab, setActiveTab] = useState('men');
  const [bestsellerProducts] = useState([
    {
      id: 1,
      name: "Graphic Design",
      department: "English Department",
      oldPrice: 16.48,
      price: 6.48,
      image: "https://picsum.photos/seed/icecream/400/400"
    },
    {
      id: 2,
      name: "Graphic Design",
      department: "English Department",
      oldPrice: 16.48,
      price: 6.48,
      image: "https://picsum.photos/seed/apples/400/400"
    },
    {
      id: 3,
      name: "Graphic Design",
      department: "English Department",
      oldPrice: 16.48,
      price: 6.48,
      image: "https://picsum.photos/seed/ham/400/400"
    },
    {
      id: 4,
      name: "Graphic Design",
      department: "English Department",
      oldPrice: 16.48,
      price: 6.48,
      image: "https://picsum.photos/seed/bread/400/400"
    },
    {
      id: 5,
      name: "Graphic Design",
      department: "English Department",
      oldPrice: 16.48,
      price: 6.48,
      image: "https://picsum.photos/seed/milk/400/400"
    },
    {
      id: 6,
      name: "Graphic Design",
      department: "English Department",
      oldPrice: 16.48,
      price: 6.48,
      image: "https://picsum.photos/seed/vegetables/400/400"
    }
  ]);

  const featuredItems = [
    {
      id: 1,
      title: "Unique Life",
      subtitle: "Your Space",
      image: "/images/haagen-dazs.png" // Dondurma görseli
    },
    {
      id: 2,
      title: "Elements Style",
      subtitle: "Ends Today",
      image: "/images/green-apples.png" // Yeşil elma görseli
    },
    {
      id: 3,
      title: "Elements Style",
      subtitle: "Ends Today",
      image: "/images/cooked-ham.png" // Pişmiş et görseli
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <HeroSlider slides={slides} currentSlide={currentSlide} />
      <CategoryPick />
      <ProductList />
      <FeaturedSlider />
      <CallToAction />
      <FeaturedPosts />
    </div>
  );
};

export default HomePage;
