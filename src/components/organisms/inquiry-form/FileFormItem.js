import React, { useState } from 'react';
import ToggleBar from "../../molecules/ToggleBar";
import FileGetItem from '../../molecules/FileGetItem';
import { Container, Sheet, Opend } from "../../../assets/css/Form.css";

const FileFormItem = ({ fileForm, formData }) => {
    if(!formData) {
        return;
    }

    const [isChecked, setCheck] = useState(true);

    return (
        <div className={Container} style={{ marginTop: "-2vh" }}>
            <div className={Sheet}>
                <ToggleBar title={fileForm} isChecked={isChecked} setCheck={setCheck} />
                {isChecked && (
                    <div className={Opend} style={{ padding: '3vh'}}>
                        <FileGetItem
                            pastFile={formData.fileName}
                            filePath={formData.filePath}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default FileFormItem;
