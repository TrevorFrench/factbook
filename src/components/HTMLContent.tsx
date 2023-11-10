// src/components/HTMLContent.tsx
import React from 'react';

interface HTMLContentProps {
  content: string;
}

const HTMLContent: React.FC<HTMLContentProps> = ({ content }) => {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default HTMLContent;
