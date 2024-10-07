import React from 'react';
import { TextField } from '@mui/material';

const ReviewText = ({ formData, handleFormDataChange, register, errors }) => {
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
          {...register('reviewText', { required: true })}
          error={!!errors.reviewText}
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