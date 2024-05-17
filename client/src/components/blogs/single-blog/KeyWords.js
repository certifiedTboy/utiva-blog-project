import React, { useState, useEffect } from "react";
import { programmingKeyWords } from "./ProgKeywords";

const KeyWords = ({ title, description, content }) => {
  const [KeyWords, setKeyWords] = useState([]);

  useEffect(() => {
    const titleWords = title.toLowerCase().replace(/[^\w\d ]/g, "");
    const descriptionWords = description.toLowerCase().replace(/[^\w\d ]/g, "");
    const contentWords = content.toLowerCase().replace(/[^\w\d ]/g, "");

    const titleWordsArray = titleWords.split(" ");
    const descriptionWordsArray = descriptionWords.split(" ");
    const contentWordsArray = contentWords.split(" ");

    const titleKeyWords = programmingKeyWords.filter((word) => {
      return titleWordsArray.indexOf(word.toLowerCase()) >= 0;
    });

    const descriptionKeyWords = programmingKeyWords.filter((word) => {
      return descriptionWordsArray.indexOf(word.toLowerCase()) >= 0;
    });

    const contentKeyWords = programmingKeyWords.filter((word) => {
      return contentWordsArray.indexOf(word.toLowerCase()) >= 0;
    });

    const matchedKeyWords = [
      ...titleKeyWords,
      ...descriptionKeyWords,
      ...contentKeyWords,
    ];

    let filteredKeyWords = matchedKeyWords.filter(
      (item, index) => matchedKeyWords.indexOf(item) === index
    );
    setKeyWords(filteredKeyWords);
  }, [title, description]);

  return (
    <ul>
      {KeyWords.map((word) => {
        return (
          <li>
            <a href="">{word}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default KeyWords;
