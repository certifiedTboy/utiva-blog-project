import Hero from "./hero";
import FeaturedStories from "./featured-stories";
import TrendingStories from "./trending-stories";
import Categories from "./categories";
import Newsletter from "./news-letter";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <FeaturedStories />
      <TrendingStories />
      <Categories />
      <Newsletter />
    </div>
  );
}
