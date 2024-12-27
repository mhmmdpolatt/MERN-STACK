import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow, dracula, oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

const getSyntaxHighlighterStyle = (language) => {
  switch (language) {
    case 'javascript':
      return dracula; // Javascript için renk paleti
    case 'python':
      return tomorrow; // Python için renk paleti
    case 'html':
      return oneDark; // HTML için renk paleti
    default:
      return tomorrow; // Varsayılan renk paleti
  }
};

const CodeBlock = ({ code, language }) => (
  <SyntaxHighlighter language={language} style={getSyntaxHighlighterStyle(language)}>
    {code}
  </SyntaxHighlighter>
);

const CustomCodeBlock = ({ value }) => {
  const matches = value.match(/```(\w+)\n([\s\S]*?)```/);
  if (matches) {
    const language = matches[1];
    const code = matches[2];
    return <CodeBlock code={code} language={language} />;
  }
  return null;
};

export default CustomCodeBlock;
