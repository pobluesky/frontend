import React from 'react';
import ListLabel from "../../../molecules/ListLabel";
import {ReviewWrapper, _TextArea} from "../../../../assets/css/Form.css";

const ReviewTextItem = ({ title, width, height, formData }) => { // 1차 검토 조회
    if(!formData) {
        return;
    }

    const {
        reviewText,
    } = formData;

  return (
      <div>
        <ReviewWrapper>
          <ListLabel margin="0 0 0 20px" color="#ffffff"
                     width={width} padding="8px 0 0 5px"
                     backgroundColor="#03507D" content={title}/>
          <div>
              <textarea
                  value={reviewText}
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

export default ReviewTextItem;