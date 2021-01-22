import {Box, Button, Grid, TextField} from "@material-ui/core";
import {Component} from "react";
import styled from "styled-components";
import Typography from "@material-ui/core/Typography";
import CustomerService from "../service/CustomerService";

export default class EditForm extends Component {

    state = {
        id_uzytkownika: 0,
        imie: "",
        nazwisko: "",
        pesel: "",
        telefon: ""
    }

    componentDidMount() {
        const { id_uzytkownika } = this.props;
        CustomerService.getCustomer(id_uzytkownika)
            .then(customer => this.setState({
                id_uzytkownika: customer.id_uzytkownika,
                imie: customer.imie,
                nazwisko: customer.nazwisko,
                pesel: customer.pesel,
                telefon: customer.telefon
            }))
    }

    handleEdit = () => {
        const { id_uzytkownika, imie, nazwisko, pesel, telefon } = this.state;
        const { editCustomerFn } = this.props;
        if(id_uzytkownika !== 0 && imie.length > 0 && nazwisko.length > 0 && pesel.length > 0 && telefon.length > 0) {
            CustomerService.editCustomer(id_uzytkownika, imie, nazwisko, pesel, telefon)
                .then(customer => editCustomerFn(customer))
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
                            Klient
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
                                <Button variant="contained" color="primary" onClick={this.handleEdit}>
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