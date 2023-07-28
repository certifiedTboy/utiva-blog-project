import React, { useState, useEffect } from "react";

const KeyWords = ({ title, description }) => {
  const [KeyWords, setKeyWords] = useState([]);
  const commonWords = [
    "i",
    "introduction",
    "a",
    "about",
    "an",
    "am",
    "another",
    "and",
    "are",
    "as",
    "at",
    "be",
    "by",
    "com",
    "de",
    "en",
    "for",
    "from",
    "how",
    "in",
    "available",
    "is",
    "it",
    "la",
    "my",
    "first",
    "even",
    "of",
    "on",
    "or",
    "that",
    "the",
    "this",
    "to",
    "was",
    "what",
    "when",
    "where",
    "who",
    "will",
    "with",
    "und",
    "the",
    "all",
  ];

  useEffect(() => {
    const titleWords = title.toLowerCase().replace(/[^\w\d ]/g, "");
    const descriptionWords = description.toLowerCase().replace(/[^\w\d ]/g, "");
    const titleWordsArray = titleWords.split(" ");
    const descriptionWordsArray = descriptionWords.split(" ");

    const titleKeyWords = titleWordsArray.filter((word) => {
      return commonWords.indexOf(word) === -1;
    });

    const descriptionKeyWords = descriptionWordsArray.filter((word) => {
      return commonWords.indexOf(word) === -1;
    });

    const matchedKeyWords = [...titleKeyWords, ...descriptionKeyWords];
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
            <a href="single-news.html">{word}</a>
          </li>
        );
      })}
    </ul>
  );
};

export default KeyWords;
