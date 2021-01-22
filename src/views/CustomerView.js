import {Component} from "react";
import {Box, Button} from "@material-ui/core";
import BasicTable from "../components/BasicTable";
import Form from "../components/Form";
import CustomerService from "../service/CustomerService";

class CustomerView extends Component {

    state = {
        formEnabled: false,
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

    fetchCustomers = (limit, offset) => {
        CustomerService.getCustomers(limit, offset)
            .then(customers => this.setState({...this.state, customers}));
    }

    handleAdd = () => {
        this.setState({
            formEnabled: !this.state.formEnabled
        })
    }

    addCustomer = (customer) => {
        this.setState({
            ...this.state,
            customers: [...this.state.customers, customer]
        })
    }

    handleChangePage = (event, value) => {
        this.fetchCustomers(10, value - 1);
    }

    handleRemoveCustomer = (id) => {
        CustomerService.removeCustomer(id)
            .then(() => this.setState({
                customers: this.state.customers.filter(customer => customer.id_uzytkownika !== id)
            }))
            .then(this.setCountPages)
            .catch(() => alert("Coś poszło nie tak"))
    }

    render() {
        return (
            <>
                <Box mt={2}>
                    <BasicTable customers={this.state.customers} handleChangePageFn={this.handleChangePage} handleRemoveCustomerFn={this.handleRemoveCustomer} pages={this.state.pages}/>
                    <Box display="flex" justifyContent="flex-end" mt={1}>
                        <Button variant="contained" color="primary" onClick={this.handleAdd}>
                            Dodaj nowego klienta
                        </Button>
                    </Box>
                </Box>

                <Box mt={2} mb={8}>
                    {this.state.formEnabled && <Form addCustomerFn={this.addCustomer}/>}
                </Box>
            </>
        );
    }
}

export default CustomerView;
