import styled from 'styled-components';
import Button from '@material-ui/core/Button/index.js';
import Typography from '@material-ui/core/Typography/index.js';

import axios from '../api.js';
import { useScoreCard } from '../hooks/useScoreCard.js';

const Wrapper = styled.section`
  display: flex;
  align-items: center;
  justify-content: center;

  & button {
    margin-left: 3em;
  }
`;

const Header = () => {
    const { clearAllMessage } = useScoreCard();

    const handleClear = async () => {
        const {
            data: { message },
        } = await axios.delete('/cards');
        clearAllMessage(message);
        // addRegularMessage(message);
    };

    return (
        <Wrapper>
            <Typography variant="h2">ScoreCard DB</Typography>
            <Button variant="contained" color="secondary" onClick={handleClear}>
                Clear
            </Button>
        </Wrapper>
    );
};

export default Header;
