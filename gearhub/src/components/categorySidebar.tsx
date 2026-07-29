import "../CategorySidebar.css";
import { Link, useParams } from "react-router-dom";

const categories = [
  "All",
  "Headphones",
  "Chargers",
  "Speakers",
  "Keyboards",
  "Mice",
  "Microphones",
  "Webcams",
];

export default function CategorySidebar() {
  const { category } = useParams();

  return (
    <aside className="category-sidebar">
      <h2>Categories</h2>

      <ul>
        {categories.map((item) => {
          const isActive =
            item.toLowerCase() === (category ?? "").toLowerCase();

          return (
            <li key={item}>
              <Link
                to={
                  item === "All"
                    ? "/category/all"
                    : `/category/${item.toLowerCase()}`
                }
                className={isActive ? "active" : ""}
              >
                {item}
              </Link>
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
