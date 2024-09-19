import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import Toolbar from './Toolbar';
// import dompurify from 'dompurify';
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
    // 필요한 경우 주석 해제 후 콘솔 확인
    // const sanitizer = dompurify.sanitize;
    // console.log('텍스트 에디터 입력 값', value);

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
            {/* 필요한 경우 주석 해제 후 브라우저 확인 */}
            {/* <div dangerouslySetInnerHTML={{ __html: sanitizer(`${value}`) }} /> */}
        </div>
    );
}
