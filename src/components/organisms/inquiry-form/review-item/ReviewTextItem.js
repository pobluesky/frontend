import React from 'react';
import { TextField } from '@mui/material';

const ReviewTextItem = ({ formData }) => { // 1차 검토 조회
    if(!formData) {
        return;
    }

    const {
        reviewText,
    } = formData;

  return (
      <TextField
          multiline
          rows={4}
          value={reviewText}
          InputProps={{
              readOnly: true,
          }}
          fullWidth
      />
  );
};

export default ReviewTextItem;