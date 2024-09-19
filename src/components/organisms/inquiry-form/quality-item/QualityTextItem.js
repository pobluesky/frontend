import React from 'react';
import ListLabel from "../../../molecules/ListLabel";
import {ReviewWrapper, _TextArea} from "../../../../assets/css/Form.css";

const QualityTextItem = ({ title, width, height, content }) => { // 품질검토정보 조회
  return (
      <div>
        <ReviewWrapper>
          <ListLabel margin="0 0 0 20px" color="#ffffff"
                     width={width} padding="8px 0 0 5px"
                     backgroundColor="#03507D" content={title}/>
          <div>
              <textarea
                  value={content}
                  className={_TextArea} style={{
                  borderRadius: '0 12px 12px 12px',
                  height: height,
                  }}
              />
          </div>
        </ReviewWrapper>
      </div>
  );
};

export default QualityTextItem;