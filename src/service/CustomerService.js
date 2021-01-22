class CustomerService {

    url = "http://localhost:8080/"

    getCustomersCount() {
        return fetch(`${this.url}/customers/count`)
            .then(res => res.json());
    }

    getCustomers(limit, offset) {
        return fetch(`${this.url}/customers/limit/${limit}/offset/${offset}`)
            .then(res => res.json());
    }

    saveCustomer(imie, nazwisko, pesel, telefon) {
        return fetch(this.url + "customers", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                imie,
                nazwisko,
                pesel,
                telefon
            })
        }).then(res => {
            if(!res.ok) throw res;
            return res.json();
        });
    }

}

export default new CustomerService();