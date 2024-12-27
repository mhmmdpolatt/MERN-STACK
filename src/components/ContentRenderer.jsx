import React from 'react';

const ContentRenderer = ({ content }) => {
    return (
        <div
            className="content-renderer"
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
};

export default ContentRenderer;