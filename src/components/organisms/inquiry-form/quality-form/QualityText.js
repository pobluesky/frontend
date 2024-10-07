import React from 'react';
import { TextField } from '@mui/material';

const QualityText = ({ formData, handleFormDataChange, register, errors }) => { // 품질검토정보 작성
    if(!formData) {
        return;
    }

    const {
        qualityComments
    } = formData;

  return (
      <TextField
          multiline
          rows={4}
          variant="outlined"
          value={qualityComments}
          placeholder="내용을 입력해 주세요"
          {...register('qualityComments', { required: true })}
          error={!!errors.qualityComments}
          onChange={(e) =>
              handleFormDataChange(
                  'qualityComments',
                  e.target.value,
              )
          }
          fullWidth
      />
  );
};

export default QualityText;