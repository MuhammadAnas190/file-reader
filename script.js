"use strict";

(function () {
  const form = document.querySelector("#form-submit");
  const txtFile = document.querySelector('input[type="file"]');
  let fileRead = "";
  const count = {
    paragraphs: 0,
    sentences: 0,
    spaces: 0,
    vowels: 0,
  };

  function readFile(file, onLoadCallback) {
    var reader = new FileReader();
    reader.onload = onLoadCallback;
    reader.readAsText(file);
  }

  const countSentences = (str) => {
    if (!str) return;
    const sentencesLength = str.match(/[\w|\)][.?!](\s|$)/g).length;
    return sentencesLength;
  };
  const countParagraphs = (str) => {
    if (!str) return;
    const paraLength = str.replace(/\n$/gm, "").split(/\n/).length;
    return paraLength;
  };
  const countSpaces = (str) => {
    if (!str) return;
    const spaceLength = str.split(" ").length - 1;
    return spaceLength;
  };
  const countVowels = (str) => {
    if (!str) return;
    const vowelLength = str.match(/[aeiou]/gi).length;
    return vowelLength;
  };

  const validateFile = (checkFile, checkFileText) => {
    const files = txtFile.files;

    if (txtFile.accept === ".txt" && !files.length) {
      alert("No file attached!");
      form.reset();
      return false;
    }

    const fileObj = files[0];
    if (!fileObj.name.includes(".txt")) {
      alert("Invalid file attached!");
      form.reset();
      return false;
    }

    if (checkFile && !checkFileText) {
      alert("file attached is empty!");
      form.reset();
      return false;
    }
    return true;
  };

  const download = (text, name, type) => {
    const a = document.querySelector("#link");
    const file = new Blob([text], { type: type });
    a.href = URL.createObjectURL(file);
    a.download = name;
  };

  txtFile.addEventListener("change", (e) => {
    const validate = validateFile(false, "");
    if (validate) {
      readFile(e.target.files[0], (ev) => {
        fileRead = ev.target.result;
      });
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const validate = validateFile(true, fileRead);
    if (validate) {
      const readedFile = fileRead;
      count.paragraphs = countParagraphs(readedFile);
      count.sentences = countSentences(readedFile);
      count.spaces = countSpaces(readedFile);
      count.vowels = countVowels(readedFile);
      const countStr = JSON.stringify(count, null, 2);
      download(countStr, "CC-A-1.txt", "text/plain");
    }
  });
})();
