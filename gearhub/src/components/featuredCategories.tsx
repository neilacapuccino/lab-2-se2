import "../featuredCategories.css";
import React from "react";
import type { LucideProps } from "lucide-react";
import { Headphones, BatteryCharging, Phone, Plug } from "lucide-react";

interface Category {
  id: number;
  name: string;
  description: string;
  icon: React.ComponentType<LucideProps>;
}

const categories: Category[] = [
  { id: 1, name: "Headphones", description: "Explore All", icon: Headphones },
  { id: 2, name: "Chargers", description: "Explore All", icon: BatteryCharging },
  { id: 3, name: "Cases", description: "Explore All", icon: Phone },
  { id: 4, name: "Cables", description: "Explore All", icon: Plug },
];

export default function FeaturedCategories() {
  return (
    <section className="featured-categories">
      <div className="categories-header">
        <h2>Featured Categories</h2>
        <button className="view-categories-btn">View All Categories</button>
      </div>

      <div className="categories-grid">
        {categories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.id} className="category-card">
              <div className="category-icon">
                <Icon size={24} />
              </div>
              <div className="category-text">
                <h3>{category.name}</h3>
                <p>{category.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
