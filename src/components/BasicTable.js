import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from "@material-ui/lab/Pagination";
import {Box, Button} from "@material-ui/core";
import styled from "styled-components";

export default class BasicTable extends React.Component {
    render() {

        const {customers, handleChangePageFn, handleEditCustomerFn, handleRemoveCustomerFn, pages} = this.props;

        return (
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Imię</TableCell>
                            <TableCell>Nazwisko</TableCell>
                            <TableCell>Pesel</TableCell>
                            <TableCell>Telefon</TableCell>
                            <TableCell>Operacje</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers.map((row) => (
                            <TableRow key={row.id_uzytkownika}>
                                <TableCell>{row.id_uzytkownika}</TableCell>
                                <TableCell>{row.imie}</TableCell>
                                <TableCell>{row.nazwisko}</TableCell>
                                <TableCell>{row.pesel}</TableCell>
                                <TableCell>{row.telefon}</TableCell>
                                <TableCell width={"5%"}>
                                        <Buttons>
                                            <Button variant="contained" color="primary" onClick={() => handleEditCustomerFn(row.id_uzytkownika)} fullWidth={"50%"}>
                                                Edytuj
                                            </Button>

                                            <Button variant="contained" color="secondary" onClick={() => handleRemoveCustomerFn(row.id_uzytkownika)} fullWidth={"50%"}>
                                                Usuń
                                            </Button>
                                        </Buttons>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>

                </Table>
                <Box display="flex" justifyContent="center" my={2}>
                    <Pagination count={pages} color="primary" onChange={handleChangePageFn}/>
                </Box>
            </TableContainer>
        );
    }
}

const Buttons = styled.div`
    display: flex;
    grid-gap: 1rem;
`;