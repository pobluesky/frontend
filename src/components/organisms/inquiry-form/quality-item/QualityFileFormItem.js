import React, { useState } from 'react';
import { Container, Sheet, Opend, buttonWrapper, FileColumn } from "../../../../assets/css/Form.css";
import ToggleBar from "../../../molecules/ToggleBar";
import FileGetItem from '../../../molecules/FileGetItem';

const QualityFileFormItem = ({ fileForm, formData }) => {
    if(!formData) {
        return;
    }

    const [isChecked, setCheck] = useState(true);

    const isUploadSection = fileForm === "품질검토 첨부파일";

    return (
        <div className={Container} style={{ marginTop: "-2vh" }}>
            <div className={Sheet}>
                <ToggleBar title={fileForm} isChecked={isChecked} setCheck={setCheck} />
                {isChecked && (
                    <div className={Opend} style={{ padding: '3vh'}}>
                        <FileGetItem pastFile={formData.qualityReviewInfo.fileName} filePath={formData.qualityReviewInfo.filePath} />
                    </div>
                )}
            </div>
        </div>
    );
};

export default QualityFileFormItem;
