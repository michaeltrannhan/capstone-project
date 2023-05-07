import { VisibilityOff } from '@mui/icons-material';
import { BulkUpdateButton } from 'react-admin';

const views = { views: 0 };

const ResetViewsButton = () => (
    <BulkUpdateButton label="Reset Views" data={views} icon={<VisibilityOff/>} />
);

export default ResetViewsButton;