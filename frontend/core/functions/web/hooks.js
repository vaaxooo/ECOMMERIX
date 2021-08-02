window.changeLanguage = function changeLanguage(language)
{
    localStorage.setItem("language", language);
    window.location.reload(true);
}