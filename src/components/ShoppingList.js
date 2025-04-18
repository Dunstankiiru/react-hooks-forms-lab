import React, { useState } from "react";
import Item from "./Item";
import Filter from "./Filter";
import ItemForm from "./ItemForm";

function ShoppingList({ items: initialItems }) {
  const [items, setItems] = useState(initialItems);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");

  function handleItemFormSubmit(newItem) {
    setItems([...items, newItem]);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }

  function handleSearchChange(text) {
    setSearchText(text);
  }

  const displayedItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchText.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <Filter
      
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
        searchText={searchText}
        selectedCategory={selectedCategory}
      />
      <ul className="Items">
        {displayedItems.map((item) => (
          <Item key={item.id} name={item.name} category={item.category} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;