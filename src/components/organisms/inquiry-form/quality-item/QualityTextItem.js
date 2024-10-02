import React from 'react';
import { TextField } from '@mui/material';

const QualityTextItem = ({ content }) => { // 품질검토정보 조회
  return (
      <TextField
          multiline
          rows={4}
          variant="outlined"
          value={content}
          fullWidth
      />
  );
};

export default QualityTextItem;