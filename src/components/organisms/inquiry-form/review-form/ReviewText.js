import React from 'react';
import { TextField } from '@mui/material';

const ReviewText = ({ formData, handleFormDataChange }) => {
    if (!formData) {
        return;
    }

    const {
        reviewText
    } = formData;

  return (
      <TextField
          multiline
          rows={4}
          value={reviewText}
          placeholder={'내용을 입력해 주세요'}
          onChange={(e) =>
              handleFormDataChange(
                  'reviewText',
                  e.target.value
              )}
          fullWidth
      />
  );
};

export default ReviewText;