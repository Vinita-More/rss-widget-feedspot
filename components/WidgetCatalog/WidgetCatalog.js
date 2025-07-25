"use client";
import React from "react";
import styles from "./catalog.module.css";
import FooterSection from "../Footer/Footer";
export default function WidgetCatalog() {
  const categories = [
    {
      id: 1,
      name: "Real Estate",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
      alt: "Real Estate",
    },
    {
      id: 2,
      name: "Technology",
      image:
        "https://images.unsplash.com/photo-1579567761406-4684ee0c75b6?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fHRlY2h8ZW58MHx8MHx8fDA%3D",
      alt: "Technology",
    },
    {
      id: 3,
      name: "Movies",
      image:
        "https://plus.unsplash.com/premium_photo-1710961232986-36cead00da3c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW92aWV8ZW58MHx8MHx8fDA%3D",
      alt: "Movies",
    },
    {
      id: 4,
      name: "Music",
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop",
      alt: "Music",
    },
    {
      id: 5,
      name: "Food Recipes",
      image:
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=400&h=300&fit=crop",
      alt: "Food Recipes",
    },
    {
      id: 6,
      name: "Gaming",
      image:
        "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=400&h=300&fit=crop",
      alt: "Gaming",
    },
    {
      id: 7,
      name: "Spiritual",
      image:
        "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=400&h=300&fit=crop",
      alt: "Spiritual",
    },
    {
      id: 8,
      name: "Education",
      image:
        "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=300&fit=crop",
      alt: "Education",
    },
    {
      id: 9,
      name: "Travel",
      image:
        "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=300&fit=crop",
      alt: "Travel",
    },
    {
      id: 10,
      name: "Interior Design",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=300&fit=crop",
      alt: "Interior Design",
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Widget Catalog</h1>

        {/* Main Category Grid */}
        <div className={styles.categoryGrid}>
          {categories.map((category) => (
            <div
              key={category.id}
              className={styles.categoryCard}
              onClick={() => console.log(`Navigate to ${category.name}`)}
            >
              <div className={styles.imageContainer}>
                <img
                  src={category.image}
                  alt={category.alt}
                  className={styles.categoryImage}
                />
                <div className={styles.overlay}>
                  <span className={styles.categoryName}>{category.name}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterSection />
    </div>
  );
}
