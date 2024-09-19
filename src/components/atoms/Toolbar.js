import React from 'react';

const Toolbar = () => {
    return (
        <>
            <div className="ql-formats">
                <select className="ql-header" defaultValue="7">
                    <option value="1">Header 1</option>
                    <option value="2">Header 2</option>
                    <option value="3">Header 3</option>
                    <option value="4">Header 4</option>
                    <option value="5">Header 5</option>
                    <option value="6">Header 6</option>
                    <option value="7">Normal</option>
                </select>
            </div>
            <div className="ql-formats">
                <button className="ql-bold" />
                <button className="ql-italic" />
                <button className="ql-underline" />
                <button className="ql-strike" />
                <button className="ql-blockquote" />
            </div>
            <div className="ql-formats">
                <select className="ql-color" />
                <select className="ql-background" />
            </div>
            <div className="ql-formats">
                <button className="ql-code" />
                <button className="ql-link" />
            </div>
            <div className="ql-formats">
                <button className="ql-clean" />
            </div>
        </>
    );
};

export default Toolbar;
