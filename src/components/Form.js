import {Box, Button, Grid, TextField} from "@material-ui/core";
import {Component} from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import CustomerService from "../service/CustomerService";

export default class Form extends Component {

    state = {
        imie: "",
        nazwisko: "",
        pesel: "",
        telefon: ""
    }

    handleAdd = () => {
        const { imie, nazwisko, pesel, telefon } = this.state;
        const { addCustomerFn } = this.props;
        if(imie.length > 0 && nazwisko.length > 0 && pesel.length > 0 && telefon.length > 0) {
            CustomerService.saveCustomer(imie, nazwisko, pesel, telefon)
                .then(customer => addCustomerFn(customer))
                .catch(() => alert("Coś poszło nie tak"))
        }
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        const { handleCloseForms } = this.props;
        const { imie, nazwisko, pesel, telefon } = this.state;
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
                            <TextField id="standard-basic" label="Imię" name="imie" value={imie} onChange={this.handleChange}/>
                        </Input>
                        <Input>
                            <TextField id="standard-basic" label="Nazwisko" name="nazwisko" value={nazwisko} onChange={this.handleChange}/>
                        </Input>
                        <Input>
                            <TextField id="standard-basic" label="Pesel" name="pesel" value={pesel} onChange={this.handleChange}/>
                        </Input>
                        <Input>
                            <TextField id="standard-basic" label="Telefon" name="telefon" value={telefon} onChange={this.handleChange}/>
                        </Input>
                        <Box display="flex" justifyContent="center">
                            <Buttons>
                                <Button variant="contained" color="primary" onClick={this.handleAdd}>
                                    Zapisz
                                </Button>
                                <Button variant="contained" color="primary" onClick={handleCloseForms}>
                                    Zamknij
                                </Button>
                            </Buttons>
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

const Buttons = styled.div`
    display: flex;
    grid-gap: 1rem;
`;