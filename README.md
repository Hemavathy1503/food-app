

# 🌎 Recipe Explorer

Recipe Explorer is a responsive web application that allows users to search, explore, and learn about meals from around the world. Users can search by dish name, filter by country/cuisine, view detailed recipes with ingredients and instructions, or load a random dish for inspiration.

This project is built with **AngularJS**, **HTML**, **CSS**, and consumes data from [TheMealDB API](https://www.themealdb.com/).

---

## Features

* Search meals by name.
* Filter meals by country/cuisine.
* View detailed recipe information:

  * Ingredients with measurements
  * Step-by-step instructions
  * Category and area
  * Video tutorial link (if available)
* Load a random dish.
* Responsive grid layout with interactive cards.
* Ingredient highlighting in instructions.

---

## Technologies Used

* **Frontend:** HTML, CSS, AngularJS 1.8.3
* **API:** [TheMealDB](https://www.themealdb.com/)
* **Angular Modules:** ngSanitize (for safely rendering HTML content)

---

## Code Explanation

**Main Components:**

1. **AngularJS Controller (`RecipeController`)**

   * Handles all API calls, user interactions, and state management.
   * Stores meals, selected meal, search term, and country filter.
   * Fetches data from TheMealDB API:

     * List of countries (`list.php?a=list`)
     * Search meals by name (`search.php?s=`)
     * Filter by country (`filter.php?a=`)
     * Random meal (`random.php`)
     * Detailed meal info (`lookup.php?i=`)

2. **Ingredients Extraction**

   * Loops through `strIngredient1` to `strIngredient20` fields in API response.
   * Combines with measurements for display.

3. **Instructions Formatting**

   * Splits instructions into steps using line breaks or periods.
   * Highlights ingredients using `<strong>` tags.

4. **UI Components**

   * Search bar, dropdown filter, and buttons in header.
   * Grid of recipe cards for easy browsing.
   * Modal-like recipe details with ingredients, instructions, and video link.

---

## Credits

* Recipe data powered by [TheMealDB API](https://www.themealdb.com/).
* Built using AngularJS 1.8.3 and ngSanitize.
* UI design inspired by modern recipe platforms with custom CSS gradients.

---

## License

This project is open-source and available under the [MIT License](LICENSE).

---

