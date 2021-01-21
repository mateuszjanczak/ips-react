import {Box, Button, Grid, TextField} from "@material-ui/core";
import {Component} from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";

export default class Form extends Component {
    render() {
        return (
            <Grid container
                  direction="row"
                  justify="center"
                  alignItems="center">
                <Box bgcolor="grey.50" px={18} pt={9} pb={9}>
                    <Box pb={4.5}>
                        <Typography variant="h4" component="h1">
                            Nowy klient
                        </Typography>
                    </Box>

                    <form>
                        <Input>
                            <TextField id="standard-basic" label="Imię" size={"medium"}/>
                        </Input>
                        <Input>
                            <TextField id="standard-basic" label="Nazwisko"/>
                        </Input>
                        <Input>
                            <TextField id="standard-basic" label="Pesel"/>
                        </Input>
                        <Input>
                            <TextField id="standard-basic" label="Telefon"/>
                        </Input>
                        <Box display="flex" justifyContent="center">
                            <Button variant="contained" color="primary" onClick={this.handleAdd}>
                                Zapisz
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Grid>
        )
    }
}

const Input = styled.div`
    margin-bottom: 2rem;
`;