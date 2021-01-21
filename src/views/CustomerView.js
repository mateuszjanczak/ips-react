import {Component} from "react";
import {Box, Button} from "@material-ui/core";
import BasicTable from "../components/BasicTable";
import Form from "../components/Form";

class CustomerView extends Component {

    state = {
        formEnabled: false
    }

    handleAdd = () => {
        this.setState({
            formEnabled: !this.state.formEnabled
        })
    }

    render() {
        return (
            <>
                <Box mt={2}>
                    <BasicTable />
                    <Box display="flex" justifyContent="flex-end" mt={1}>
                        <Button variant="contained" color="primary" onClick={this.handleAdd}>
                            Dodaj nowego klienta
                        </Button>
                    </Box>
                </Box>

                <Box mt={2} mb={8}>
                    {this.state.formEnabled && <Form />}
                </Box>
            </>
        );
    }
}

export default CustomerView;
