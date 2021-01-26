import {Component} from "react";
import {Box, Button} from "@material-ui/core";
import BasicTable from "../components/BasicTable";
import Form from "../components/Form";
import EditForm from "../components/EditForm";
import CustomerService from "../service/CustomerService";

class CustomerView extends Component {

    state = {
        formEnabled: false,
        formEditEnabled: false,
        formEditId: 0,
        customers: [],
        pages: 1
    }

    componentDidMount() {
        this.setCountPages();
        this.fetchCustomers(10, 0);
    }

    setCountPages = () => {
        CustomerService.getCustomersCount()
            .then(({count}) => {
                let pages;

                if(parseInt(count / 10) === count/10) {
                    pages = parseInt(count / 10);
                } else {
                    pages = parseInt(count / 10) + 1;
                }

                this.setState({
                    ...this.state,
                    pages
                })
            })
    }

    fetchCustomers = (limit, page) => {
        CustomerService.getCustomers(limit, page)
            .then(customers => this.setState({...this.state, customers}));
    }

    handleAdd = () => {
        this.setState({
            ...this.state,
            formEnabled: !this.state.formEnabled,
            formEditEnabled: false,
            formEditId: 0
        })
    }

    addCustomer = (customer) => {
        this.setState({
            ...this.state,
            customers: [...this.state.customers, customer]
        }, () => {
            this.setCountPages();
        })
    }

    editCustomer = (customer) => {
        this.setState({
            ...this.state,
            customers: [...this.state.customers.filter(oldCustomer => oldCustomer.id_uzytkownika !== customer.id_uzytkownika), customer].sort((a, b) => a.id_uzytkownika < b.id_uzytkownika ? -1 : 1)
        })
    }

    handleChangePage = (event, value) => {
        this.fetchCustomers(10, value - 1);
    }

    handleEditCustomer = (id) => {
        this.setState({
            ...this.state,
            formEnabled: false,
            formEditEnabled: !this.state.formEditEnabled,
            formEditId: id
        })
    }

    handleRemoveCustomer = (id) => {
        CustomerService.removeCustomer(id)
            .then(() => this.setState({
                customers: this.state.customers.filter(customer => customer.id_uzytkownika !== id)
            }))
            .then(this.setCountPages)
            .catch(() => alert("Coś poszło nie tak"))
    }

    handleCloseForms = () => {
        this.setState({
            ...this.state,
            formEnabled: false,
            formEditEnabled: false,
            formEditId: 0
        })
    }

    render() {
        return (
            <>
                <Box mt={2}>
                    <BasicTable customers={this.state.customers} handleChangePageFn={this.handleChangePage} handleEditCustomerFn={this.handleEditCustomer} handleRemoveCustomerFn={this.handleRemoveCustomer} pages={this.state.pages}/>
                    <Box display="flex" justifyContent="flex-end" mt={1}>
                        <Button variant="contained" color="primary" onClick={this.handleAdd}>
                            Dodaj nowego klienta
                        </Button>
                    </Box>
                </Box>

                <Box mt={2} mb={8}>
                    {this.state.formEnabled && <Form addCustomerFn={this.addCustomer} handleCloseForms={this.handleCloseForms}/>}
                    {this.state.formEditEnabled && <EditForm editCustomerFn={this.editCustomer} id_uzytkownika={this.state.formEditId} handleCloseForms={this.handleCloseForms}/>}
                </Box>
            </>
        );
    }
}

export default CustomerView;
