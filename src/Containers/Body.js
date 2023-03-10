import { useState } from 'react';
import Button from '@material-ui/core/Button/index.js';
import FormControl from '@material-ui/core/FormControl/index.js';
import FormControlLabel from '@material-ui/core/FormControlLabel/index.js';
import Paper from '@material-ui/core/Paper/index.js';
import Radio from '@material-ui/core/Radio/index.js';
import RadioGroup from '@material-ui/core/RadioGroup/index.js';
import styled from 'styled-components';
import TextField from '@material-ui/core/TextField/index.js';
import Typography from '@material-ui/core/Typography/index.js';

import { useStyles } from '../hooks/index.js';
import axios from '../api.js';
import { useScoreCard } from '../hooks/useScoreCard.js';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 1em;
`;

const StyledFormControl = styled(FormControl)`
  min-width: 120px;
`;

const ContentPaper = styled(Paper)`
  height: 300px;
  padding: 2em;
  overflow: auto;
`;

const Body = () => {
    const classes = useStyles();

    const { messages, addCardMessage, addRegularMessage, addErrorMessage, clearAllMessage } =
        useScoreCard();

    const [name, setName] = useState('');
    const [subject, setSubject] = useState('');
    const [score, setScore] = useState(0);

    const [queryType, setQueryType] = useState('name');
    const [queryString, setQueryString] = useState('');

    const handleChange = (func) => (event) => {
        func(event.target.value);
    };

    const handleAdd = async () => {
        const {
            data: { message, card },
        } = await axios.post('/card', {
            name,
            subject,
            score,
        });

        if (!card) addErrorMessage(message);
        else addCardMessage(message);
    };

    const handleQuery = async () => {
        const {
            data: { messages, message },
        } = await axios.get('/cards', {
            params: {
                type: queryType,
                queryString,
            },
        });

        if (!messages) addErrorMessage(message);
        else addRegularMessage(...messages);
    };

    return (
        <Wrapper>
            <Row>
                {/* Could use a form & a library for handling form data here such as Formik, but I don't really see the point... */}
                <TextField
                    className={classes.input}
                    placeholder="Name"
                    value={name}
                    onChange={handleChange(setName)}
                />
                <TextField
                    className={classes.input}
                    placeholder="Subject"
                    style={{ width: 240 }}
                    value={subject}
                    onChange={handleChange(setSubject)}
                />
                <TextField
                    className={classes.input}
                    placeholder="Score"
                    value={score}
                    onChange={handleChange(setScore)}
                    type="number"
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disabled={!name || !subject}
                    onClick={handleAdd}
                >
                    Add
                </Button>
            </Row>
            <Row>
                <StyledFormControl>
                    <FormControl component="fieldset">
                        <RadioGroup
                            row
                            value={queryType}
                            onChange={handleChange(setQueryType)}
                        >
                            <FormControlLabel
                                value="name"
                                control={<Radio color="primary" />}
                                label="Name"
                            />
                            <FormControlLabel
                                value="subject"
                                control={<Radio color="primary" />}
                                label="Subject"
                            />
                        </RadioGroup>
                    </FormControl>
                </StyledFormControl>
                <TextField
                    placeholder="Query string..."
                    value={queryString}
                    onChange={handleChange(setQueryString)}
                    style={{ flex: 1 }}
                />
                <Button
                    className={classes.button}
                    variant="contained"
                    color="primary"
                    disabled={!queryString}
                    onClick={handleQuery}
                >
                    Query
                </Button>
            </Row>
            <ContentPaper variant="outlined">
                {messages.map((m, i) => (
                    <Typography variant="body2" key={m + i} style={{ color: m.color }}>
                        {m.message}
                    </Typography>
                ))}
            </ContentPaper>
        </Wrapper>
    );
};

export default Body;
