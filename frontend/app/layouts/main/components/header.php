<header class="header mb-5">

    <nav class="header-order">
        <div class="container d-flex flex-wrap p-0">
            <ul class="nav me-auto">

                <li class="nav-item">
                    <a href="#" class="nav-link link-dark h-o-contacts" style="margin-left: 0px!important;">
                        <span class="material-icons">
                            local_phone
                        </span>
                        <span id="web_phone"></span>
                    </a>
                </li>

                <li class="nav-item">
                    <a href="#" class="nav-link link-dark h-o-contacts">
                        <span class="material-icons">
                            contact_support
                        </span>
                        Поддержка
                    </a>
                </li>

                <hr class="vertical">

                <li class="nav-item" style="margin-left: 30px;">
                    <select class="nav-link link-dark h-o-select" id="web_languages"></select>
                </li>

                <li class="nav-item" style="margin-left: 20px;">
                    <select class="nav-link link-dark h-o-select" id="web_currencies"></select></select>
                </li>
            </ul>
            <ul class="nav">


                <li class="nav-item">
                    <a href="#" class="nav-link link-dark h-o-contacts e-btn-transparent">
                        <span class="material-icons">
                            login
                        </span>
                        Вход
                    </a>
                </li>

                <li class="nav-item">
                    <a href="#" class="nav-link link-dark h-o-contacts e-btn-transparent">
                        <span class="material-icons">
                            lock
                        </span>
                        Регистрация
                    </a>
                </li>
            </ul>
        </div>
    </nav>

    <div class="container p-0" style="padding: 0px;">
        <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
            <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-dark text-decoration-none e-logo" id="web_name"></a>

            <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 e-header-menu">
                <li class="e-header-menu-link">
                    <a href="/" class="nav-link px-2 link-dark shadow-none">Главная</a>
                </li>

                <li class="e-header-menu-link">
                    <a href="/shipping" class="nav-link px-2 link-dark shadow-none">Доставка</a>
                </li>

                <li class="e-header-menu-link">
                    <a href="/contacts" class="nav-link px-2 link-dark shadow-none">Контакты</a>
                </li>

            </ul>


            <div class="e-shopping-cart">
                <div class="input-group">
                    <input type="search" class="form-control form-control inputSearch" placeholder="Начните вводить.." aria-label="Начните вводить..">
                    <span class="input-group-text btn-inputSearch">
                        <span class="material-icons">
                            search
                        </span>
                    </span>
                </div>
            </div>



            <div class="e-shopping-cart">
                <a href="/favorites" class="e-shopping-cart-icon">
                    <span class="material-icons">
                        bookmarks
                    </span>
                </a>
                <div class="favorite-products count" id="favorite-products-count"></div>
            </div>

            <div class="e-shopping-cart">
                <a href="/cart" class="e-shopping-cart-icon">
                    <span class="material-icons">
                        shopping_bag
                    </span>
                </a>
                <div class="cart-products count" id="cart-products-count"></div>
            </div>


        </div>
    </div>


</header>