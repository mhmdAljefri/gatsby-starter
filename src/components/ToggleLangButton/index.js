import React from "react";
import PropTypes from "prop-types";
import { Link } from "gatsby";

function ToggleLangButton({ lang }) {
  const languageButton =
    lang === "ar"
      ? { url: "/en", text: "Open English Version of website" }
      : { url: "/ar", text: "مشاهدة الاصدار العربي من الموقع" };

  return <Link to={languageButton.url}>{languageButton.text}</Link>;
}

ToggleLangButton.defaultProps = {
  lang: "en"
};

ToggleLangButton.propTypes = {
  lang: PropTypes.string
};

export default ToggleLangButton;
