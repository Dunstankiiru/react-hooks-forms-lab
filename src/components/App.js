
import React, { useState } from "react";
import ShoppingList from "./ShoppingList";
import Header from "./Header";
import Filter from "./Filter";
import ItemForm from "./ItemForm";
import itemData from "../data/items";

function App() {
  const [items, setItems] = useState(itemData);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  function handleDarkModeClick() {
    setIsDarkMode((isDarkMode) => !isDarkMode);
  }

  function handleSearchChange(text) {
    setSearchText(text);
  }

  function handleCategoryChange(e) {
    setSelectedCategory(e.target.value);
  }

  function handleItemFormSubmit(newItem) {
    setItems([...items, newItem]);
  }

  const filteredItems = items.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchText.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className={"App " + (isDarkMode ? "dark" : "light")}>
      <Header isDarkMode={isDarkMode} onDarkModeClick={handleDarkModeClick} />
      <Filter
        searchText={searchText}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        onSearchChange={handleSearchChange}
      />

      <ItemForm onItemFormSubmit={handleItemFormSubmit} />
      <ShoppingList items={filteredItems} />
    </div>
  );
}

export default App;
