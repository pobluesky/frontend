import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import Toolbar from './Toolbar';
import 'react-quill/dist/quill.snow.css';

export default function QuillEditor({
    width,
    height,
    margin,
    padding,
    border,
    placeholder,
    inputWidth,
    inputHeight,
    inputMaxHeight,
    inputMargin,
    inputPadding,
    value,
    onChange,
}) {
    const formats = [
        'header',
        'bold',
        'italic',
        'underline',
        'strike',
        'blockquote',
        'list',
        'link',
        'color',
        'background',
        'code',
        'clean',
    ];

    const modules = useMemo(() => {
        return {
            toolbar: {
                container: '#toolbar',
            },
        };
    }, []);

    return (
        <div
            style={{
                width,
                height,
                margin,
                padding,
                border,
                backgroundColor: '#ffffff',
            }}
        >
            <div id="toolbar">
                <Toolbar />
            </div>
            <ReactQuill
                style={{
                    width: inputWidth,
                    height: inputHeight,
                    maxHeight: inputMaxHeight,
                    margin: inputMargin,
                    padding: inputPadding,
                    overflowY: 'auto',
                }}
                theme="snow"
                modules={modules}
                formats={formats}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
            />
        </div>
    );
}
