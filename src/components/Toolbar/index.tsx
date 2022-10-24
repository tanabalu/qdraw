import React from 'react';
import Brush from '@/components/Brush';

import styles from './index.module.less';
import { Card, Space } from 'antd';

export default () => {
  return (
    <div className={styles.wrapper}>
      <Card size='small'>
        <Space direction='vertical'>
          <Brush />
        </Space>
      </Card>
    </div>
  );
}
