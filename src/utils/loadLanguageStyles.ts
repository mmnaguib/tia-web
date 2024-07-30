const loadLanguageStyles = (language: string) => {
  // Remove any existing language-specific stylesheets
  const existingLink = document.getElementById("language-stylesheet");
  if (existingLink) {
    existingLink.parentNode &&
      existingLink.parentNode.removeChild(existingLink);
  }

  const link = document.createElement("link");
  link.id = "language-stylesheet";
  link.rel = "stylesheet";
  link.href = `../src/assets/styles/${language}.scss`;
  document.head.appendChild(link);
};

export default loadLanguageStyles;
