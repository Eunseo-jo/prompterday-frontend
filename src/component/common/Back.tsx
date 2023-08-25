import Icon from './Icon';
import { useNavigate } from 'react-router-dom';

const Back = () => {
  const navigate = useNavigate();

  return (
    <Icon
      icon="arrowLeft"
      size={27}
      color="var(--color-main)"
      onClick={() => navigate(-1)}
    />
  );
};
export default Back;
