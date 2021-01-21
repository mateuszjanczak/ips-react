import {Component} from "react";
import {Box, Button} from "@material-ui/core";
import BasicTable from "../components/BasicTable";
import Form from "../components/Form";
import CustomerService from "../service/CustomerService";

class CustomerView extends Component {

    state = {
        formEnabled: false,
        customers: []
    }

    componentDidMount() {
        this.fetchCustomers();
    }

    fetchCustomers = () => {
        CustomerService.getCustomers()
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

    render() {
        return (
            <>
                <Box mt={2}>
                    <BasicTable customers={this.state.customers}/>
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
