import "../featuredCategories.css";
import {
  Headphones,
  BatteryCharging,
  Smartphone,
  Cable,
  Keyboard,
  Mouse,
} from "lucide-react";

interface Category {
  id: number;
  name: string;
  Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

const categories: Category[] = [
  {
    id: 1,
    name: "Headphones",
    Icon: Headphones,
  },
  {
    id: 2,
    name: "Chargers",
    Icon: BatteryCharging,
  },
  {
    id: 3,
    name: "Cases",
    Icon: Smartphone,
  },
  {
    id: 4,
    name: "Cables",
    Icon: Cable,
  },
  {
    id: 5,
    name: "Keyboards",
    Icon: Keyboard,
  },
  {
    id: 6,
    name: "Mouse",
    Icon: Mouse,
  },
];

export default function FeaturedCategories() {
  return (
    <section className="featured-categories">

      <div className="categories-header">
        <h2>Featured Categories</h2>

        <button className="view-categories-btn">
          View All Categories
        </button>
      </div>

      <div className="categories-grid">
        {categories.map((category) => {
          const Icon = category.Icon;
          return (
            <div
              className="category-card"
              key={category.id}
            >
              <div className="category-icon">
                <Icon className="category-svg" />
              </div>

              <div className="category-text">
                <h3>{category.name}</h3>
                <p>Explore All</p>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}