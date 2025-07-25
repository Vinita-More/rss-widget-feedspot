import styles from "./footer.module.css";
import { FaFolder } from "react-icons/fa";
export default function FooterSection() {
  const browseCategories = [
    "Adventure",
    "Architecture",
    "Art",
    "Automobile",
    "Aviation",
    "Baking",
    "Beauty",
    "Books",
    "Business",
    "Career",
    "Comedy",
    "Cooking",
    "Crafts",
    "Cryptocurrency",
    "Culture",
    "Dance",
    "Design",
    "DIY",
    "Economics",
    "Entertainment",
    "Environment",
    "Fashion",
    "Finance",
    "Fitness",
    "Gardening",
    "Health",
    "History",
    "Hobbies",
    "Home",
    "Humor",
    "Innovation",
    "Investing",
    "Kids",
    "Language",
    "Lifestyle",
    "Literature",
    "Marketing",
    "Nature",
    "News",
    "Nutrition",
    "Parenting",
    "Personal Development",
    "Photography",
    "Politics",
    "Psychology",
    "Relationships",
    "Science",
    "Self-Help",
    "Social Media",
    "Sports",
    "Startups",
    "Style",
    "Technology",
    "Wellness",
  ];

  return (
    <div className={styles.browseSection}>
      <h2 className={styles.browseTitle}>Browse Widgets By Categories</h2>
      <div className={styles.browseTags}>
        {browseCategories.map((category, index) => (
          <span
            key={index}
            className={styles.categoryTag}
            onClick={() => console.log(`Browse ${category}`)}
          >
            <FaFolder /> {category}
          </span>
        ))}
      </div>
    </div>
  );
}
