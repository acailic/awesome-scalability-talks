// This script helps with client-side routing on GitHub Pages
(function () {
  // Handle redirects for GitHub Pages
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;

  if (redirect && redirect !== location.href) {
    history.replaceState(null, null, redirect);
  }
})();
