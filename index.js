document.addEventListener('DOMContentLoaded', function () {
    const content = document.getElementById('content');


    document.getElementById('nav-home').addEventListener('click', function (e) {
        e.preventDefault();
        loadHome();
    });

    document.getElementById('nav-search').addEventListener('click', function (e) {
        e.preventDefault();
        loadSearch();
    });

    document.getElementById('nav-explore').addEventListener('click', function (e) {
        e.preventDefault();
        loadExplore();
    });

    loadHome();


    function loadHome() {
        content.innerHTML = `
        <section class="hero">
            <div class="hero-content">
                <span class="eyebrow">DISCOVER COCKTAILS</span>

                <h1>
                    Find a cocktail
                    <em>worth making.</em>
                </h1>

                <p>
                    Explore recipes, discover new flavours
                    and find your next favourite cocktail.
                </p>

                <a href="#" class="hero-link" id="hero-explore">
                    Explore cocktails
                    <span>→</span>
                </a>
            </div>

            <div class="hero-side">
                <span class="hero-number">01</span>
                <span class="hero-line"></span>
                <span class="hero-label">COCKTAIL FINDER</span>
            </div>
        </section>

        <section class="random-section">

            <div class="section-intro">
                <span class="eyebrow">RANDOM PICK</span>

                <h2>
                    Feeling
                    <em>brave?</em>
                </h2>

                <p>
                    Let us pick your next cocktail.
                    You never know what you'll discover.
                </p>

                <button class="text-button" id="new-cocktail">
                    Another cocktail
                    <span>↗</span>
                </button>
            </div>

            <div id="random-cocktail" class="random-cocktail">
                <div class="loading">
                    <span></span>
                    Finding your cocktail...
                </div>
            </div>

        </section>
    `;

        fetchRandomCocktail();

        document
            .getElementById('new-cocktail')
            .addEventListener('click', fetchRandomCocktail);

        document
            .getElementById('hero-explore')
            .addEventListener('click', function (e) {
                e.preventDefault();
                loadExplore();
            });
    }

    function loadExplore() {
        content.innerHTML = `
        <section class="explore-page">

            <div class="explore-header">

                <div>
                    <span class="eyebrow">
                        THE COLLECTION
                    </span>

                    <h1>
                        Explore
                        <em>cocktails.</em>
                    </h1>
                </div>

                <p>
                    Browse the collection and discover
                    something worth making.
                </p>

            </div>


            <div class="explore-filters">

                <div class="filter-section">

                    <span class="filter-label">
                        TYPE
                    </span>

                    <div class="filter-options">

                        <button
                            class="filter-button active"
                            data-type="all">
                            All
                        </button>

                        <button
                            class="filter-button"
                            data-type="Alcoholic">
                            Alcoholic
                        </button>

                        <button
                            class="filter-button"
                            data-type="Non_Alcoholic">
                            Non-Alcoholic
                        </button>

                    </div>

                </div>


                <div class="filter-section">

                    <label
                        class="filter-label"
                        for="category-filter">
                        CATEGORY
                    </label>

                    <select id="category-filter">

                        <option value="">
                            All categories
                        </option>

                        <option value="Ordinary Drink">
                            Ordinary Drink
                        </option>

                        <option value="Cocktail">
                            Cocktail
                        </option>

                        <option value="Shake">
                            Shake
                        </option>

                        <option value="Other/Unknown">
                            Other / Unknown
                        </option>

                        <option value="Cocoa">
                            Cocoa
                        </option>

                        <option value="Shot">
                            Shot
                        </option>

                        <option value="Coffee / Tea">
                            Coffee / Tea
                        </option>

                        <option value="Homemade Liqueur">
                            Homemade Liqueur
                        </option>

                        <option value="Punch / Party Drink">
                            Punch / Party Drink
                        </option>

                        <option value="Beer">
                            Beer
                        </option>

                        <option value="Soft Drink / Soda">
                            Soft Drink / Soda
                        </option>

                    </select>

                </div>


                <div class="filter-section">

                    <label
                        class="filter-label"
                        for="ingredient-filter">
                        INGREDIENT
                    </label>

                    <select id="ingredient-filter">

                        <option value="">
                            All ingredients
                        </option>

                    </select>

                </div>

            </div>


            <div class="alphabet">

                <span class="filter-label">
                    BROWSE BY LETTER
                </span>

                <div class="alphabet-list">

                    ${'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
                .split('')
                .map(letter => `
                            <button
                                class="letter-button ${letter === 'A' ? 'active' : ''}"
                                data-letter="${letter}">
                                ${letter}
                            </button>
                        `)
                .join('')}

                </div>

            </div>


            <div
                id="explore-results"
                class="cocktail-grid">

                <div class="explore-loading">
                    <span></span>
                    Loading cocktails...
                </div>

            </div>

        </section>
    `;

        // LETTER BUTTONS

        document
            .querySelectorAll('.letter-button')
            .forEach(button => {

                button.addEventListener('click', function () {

                    document
                        .querySelectorAll('.letter-button')
                        .forEach(btn => {
                            btn.classList.remove('active');
                        });

                    this.classList.add('active');

                    loadCocktailsByLetter(
                        this.dataset.letter
                    );

                });

            });

        // TYPE FILTER

        document
            .querySelectorAll('.filter-button')
            .forEach(button => {

                button.addEventListener('click', function () {

                    document
                        .querySelectorAll('.filter-button')
                        .forEach(btn => {
                            btn.classList.remove('active');
                        });

                    this.classList.add('active');

                    const type = this.dataset.type;

                    if (type === 'all') {
                        loadCocktailsByLetter('A');
                    } else {
                        loadCocktailsByType(type);
                    }

                });

            });

        // CATEGORY FILTER

        document
            .getElementById('category-filter')
            .addEventListener('change', function () {

                if (!this.value) {
                    loadCocktailsByLetter('A');
                    return;
                }

                loadCocktailsByCategory(this.value);

            });

        // INGREDIENT FILTER
        loadIngredients();


        document
            .getElementById('ingredient-filter')
            .addEventListener('change', function () {

                if (!this.value) {
                    loadCocktailsByLetter('A');
                    return;
                }

                loadCocktailsByIngredient(this.value);

            });


        // Initial cocktails

        loadCocktailsByLetter('A');
    }

    function loadCocktailsByLetter(letter) {

        const results =
            document.getElementById('explore-results');

        results.innerHTML = `
        <div class="explore-loading">
            <span></span>
            Loading cocktails...
        </div>
    `;


        fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter.toLowerCase()}`
        )
            .then(response => response.json())
            .then(data => {

                renderCocktailGrid(
                    data.drinks || []
                );

            })
            .catch(() => {

                results.innerHTML = `
                <p class="error-message">
                    Unable to load cocktails.
                </p>
            `;

            });
    }

    function renderCocktailGrid(cocktails) {

        const results =
            document.getElementById('explore-results');


        if (!cocktails.length) {

            results.innerHTML = `
            <div class="empty-results">

                <span class="eyebrow">
                    NOTHING FOUND
                </span>

                <h2>
                    No cocktails
                    <em>here.</em>
                </h2>

                <p>
                    Try another filter.
                </p>

            </div>
        `;

            return;
        }


        results.innerHTML = cocktails
            .map(cocktail => `

            <article
                class="cocktail-card"
                data-id="${cocktail.idDrink}"
            >

                <div class="cocktail-card-image">

                    <img
                        src="${cocktail.strDrinkThumb}"
                        alt="${cocktail.strDrink}"
                        loading="lazy"
                    >

                </div>


                <div class="cocktail-card-info">

                    <span>
                        COCKTAIL
                    </span>

                    <h3>
                        ${cocktail.strDrink}
                    </h3>

                    <div class="card-arrow">
                        →
                    </div>

                </div>

            </article>

        `)
            .join('');


        document
            .querySelectorAll('.cocktail-card')
            .forEach(card => {

                card.addEventListener(
                    'click',
                    function () {

                        renderDetails(
                            this.dataset.id
                        );

                    }
                );

            });
    }

    function loadCocktailsByType(type) {

        const results =
            document.getElementById('explore-results');

        results.innerHTML = `
        <div class="explore-loading">
            <span></span>
            Loading cocktails...
        </div>
    `;


        fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${type}`
        )
            .then(response => response.json())
            .then(data => {

                renderCocktailGrid(
                    data.drinks || []
                );

            })
            .catch(() => {

                results.innerHTML = `
                <p class="error-message">
                    Unable to load cocktails.
                </p>
            `;

            });
    }

    function loadCocktailsByCategory(category) {

        const results =
            document.getElementById('explore-results');

        results.innerHTML = `
        <div class="explore-loading">
            <span></span>
            Loading cocktails...
        </div>
    `;


        fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`
        )
            .then(response => response.json())
            .then(data => {

                renderCocktailGrid(
                    data.drinks || []
                );

            })
            .catch(() => {

                results.innerHTML = `
                <p class="error-message">
                    Unable to load cocktails.
                </p>
            `;

            });
    }

    function loadIngredients() {

        const select =
            document.getElementById('ingredient-filter');

        fetch(
            'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list'
        )
            .then(response => response.json())
            .then(data => {

                if (!data.drinks) {
                    return;
                }

                data.drinks.forEach(item => {

                    const ingredient =
                        item.strIngredient1;

                    const option =
                        document.createElement('option');

                    option.value = ingredient;
                    option.textContent = ingredient;

                    select.appendChild(option);

                });

            })
            .catch(() => {

                console.log(
                    'Unable to load ingredients.'
                );

            });
    }

    function loadCocktailsByIngredient(ingredient) {

        const results =
            document.getElementById('explore-results');

        results.innerHTML = `
        <div class="explore-loading">
            <span></span>
            Loading cocktails...
        </div>
    `;


        fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
        )
            .then(response => response.json())
            .then(data => {

                renderCocktailGrid(
                    data.drinks || []
                );

            })
            .catch(() => {

                results.innerHTML = `
                <p class="error-message">
                    Unable to load cocktails.
                </p>
            `;

            });
    }

    function loadSearch() {

        content.innerHTML = `
        <section class="search-page">

            <div class="search-header">

                <div>
                    <span class="eyebrow">
                        THE COLLECTION
                    </span>

                    <h1>
                        Find your
                        <em>cocktail.</em>
                    </h1>
                </div>

                <p>
                    Search the collection by name
                    and discover something worth making.
                </p>

            </div>


            <div class="search-form-wrapper">

                <form id="searchForm">

                    <div class="search-input-wrapper">

                        <input
                            type="text"
                            id="cocktailName"
                            placeholder="Enter cocktail name"
                            required
                        >

                        <button type="submit">
                            →
                        </button>

                    </div>

                </form>

            </div>


            <div class="search-results">

                <span class="eyebrow">
                    SEARCH RESULTS
                </span>

                <ul id="cocktailList"></ul>

            </div>

        </section>
    `;

        document
            .getElementById('searchForm')
            .addEventListener('submit', function (e) {

                e.preventDefault();

                const cocktailName =
                    document
                        .getElementById('cocktailName')
                        .value
                        .trim();

                const cocktailList =
                    document.getElementById('cocktailList');

                cocktailList.innerHTML = '';

                if (!cocktailName) {
                    alert('Please enter a cocktail name.');
                    return;
                }

                fetch(
                    `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${cocktailName}`
                )
                    .then(res => res.json())
                    .then(data => {

                        if (data.drinks) {

                            data.drinks.forEach(drink => {

                                const listItem =
                                    document.createElement('li');

                                listItem.textContent =
                                    drink.strDrink;

                                listItem.className =
                                    'cocktail-item';

                                listItem.addEventListener(
                                    'click',
                                    () => renderDetails(drink.idDrink)
                                );

                                cocktailList.appendChild(listItem);

                            });

                        } else {

                            cocktailList.innerHTML =
                                '<li>No cocktails found.</li>';

                        }

                    })
                    .catch(() => {

                        cocktailList.innerHTML =
                            '<li>Error fetching cocktail data. Please try again later.</li>';

                    });

            });

    }


    function fetchRandomCocktail() {
        const randomCocktailDiv = document.getElementById('random-cocktail');

        randomCocktailDiv.innerHTML = `
        <div class="loading">
            <span></span>
            Finding your cocktail...
        </div>
    `;

        fetch('https://www.thecocktaildb.com/api/json/v1/1/random.php')
            .then(response => response.json())
            .then(data => {
                const drink = data.drinks[0];

                randomCocktailDiv.innerHTML = `
                <div class="random-image-wrapper">
                    <img
                        src="${drink.strDrinkThumb}"
                        alt="${drink.strDrink}"
                    >
                </div>

                <div class="random-info">
                    <span class="cocktail-category">
                        ${drink.strCategory || 'COCKTAIL'}
                    </span>

                    <h3>${drink.strDrink}</h3>

                    <p>
                        ${drink.strGlass || 'Classic cocktail'}
                    </p>

                    <button class="details-button" id="see-more">
                        View cocktail
                        <span>→</span>
                    </button>
                </div>
            `;

                document
                    .getElementById('see-more')
                    .addEventListener('click', function () {
                        renderDetails(drink.idDrink);
                    });
            })
            .catch(() => {
                randomCocktailDiv.innerHTML = `
                <p class="error-message">
                    Something went wrong. Please try again.
                </p>
            `;
            });
    }

    function renderDetails(cocktailId) {
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${cocktailId}`)
            .then(response => response.json())
            .then(data => {
                const cocktail = data.drinks[0];
                window.scrollTo(0, 0);
                const content = document.getElementById('content');

                content.innerHTML = `
                <section class="cocktail-detail">

                    <button class="back-button" id="back-button">
                        ← Back to explore
                    </button>


                    <div class="detail-hero">

                        <div class="detail-heading">

                            <span class="eyebrow">
                                ${cocktail.strCategory || 'COCKTAIL'}
                            </span>

                            <h1>
                                ${formatCocktailName(cocktail.strDrink)}
                            </h1>

                            <div class="detail-meta">
                                <span>
                                    ${cocktail.strGlass || 'Glass'}
                                </span>

                                <span>•</span>

                                <span>
                                    ${cocktail.strAlcoholic || ''}
                                </span>
                            </div>

                        </div>


                        <div class="detail-image">
                            <img
                                src="${cocktail.strDrinkThumb}"
                                alt="${cocktail.strDrink}"
                            >
                        </div>

                    </div>


                    <div class="detail-content">

                        <section class="detail-section">

                            <div class="detail-section-number">
                                01
                            </div>

                            <div class="detail-section-body">

                                <h2>Ingredients</h2>

                                <ul class="ingredients-list">
                                    ${renderIngredients(cocktail).join('')}
                                </ul>

                            </div>

                        </section>


                        <section class="detail-section">

                            <div class="detail-section-number">
                                02
                            </div>

                            <div class="detail-section-body">

                                <h2>How to make</h2>

                                <p class="instructions">
                                    ${cocktail.strInstructions || 'No instructions available.'}
                                </p>

                            </div>

                        </section>


                        <section class="detail-section">

                            <div class="detail-section-number">
                                03
                            </div>

                            <div class="detail-section-body">

                                <h2>Details</h2>

                                <div class="details-grid">

                                    <div>
                                        <span>Category</span>
                                        <p>${cocktail.strCategory || '—'}</p>
                                    </div>

                                    <div>
                                        <span>Glass</span>
                                        <p>${cocktail.strGlass || '—'}</p>
                                    </div>

                                    <div>
                                        <span>Type</span>
                                        <p>${cocktail.strAlcoholic || '—'}</p>
                                    </div>

                                    <div>
                                        <span>Tags</span>
                                        <p>${cocktail.strTags || '—'}</p>
                                    </div>

                                </div>

                            </div>

                        </section>

                    </div>

                </section>
            `;

                document
                    .getElementById('back-button')
                    .addEventListener('click', function () {
                        loadExplore();
                    });
            })
            .catch(() => {
                content.innerHTML = `
                <p class="error-message">
                    Unable to load this cocktail.
                </p>
            `;
            });
    }

    function formatCocktailName(name) {
        const words = name.split(' ');

        if (words.length === 1) {
            return name;
        }

        const middle = Math.ceil(words.length / 2);

        return `
        ${words.slice(0, middle).join(' ')}
        <em>${words.slice(middle).join(' ')}</em>
    `;
    }

    function renderIngredients(cocktail) {
        const Ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const Ingredient = cocktail[`strIngredient${i}`];
            const measure = cocktail[`strMeasure${i}`];
            if (Ingredient) {
                Ingredients.push(`<li>${Ingredient} - ${measure || 'No amount specified'}</li>`);

            }
        }
        return Ingredients;
    }
});