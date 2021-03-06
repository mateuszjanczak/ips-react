class CustomerService {

    url = "http://localhost:8080/"

    getCustomersCount() {
        return fetch(`${this.url}/customers/count`)
            .then(res => res.json());
    }

    getCustomer(id) {
        return fetch(`${this.url}/customers/${id}`)
            .then(res => res.json());
    }

    getCustomers(limit, page) {
        return fetch(`${this.url}/customers/limit/${limit}/page/${page}`)
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

    removeCustomer(id) {
        return fetch(this.url + "customers/" + id, {
            method: "DELETE"
        }).then(res => {
            if(!res.ok) throw res;
        })
    }

    editCustomer(id, imie, nazwisko, pesel, telefon) {
        return fetch(this.url + "customers/"+ id, {
            method: "PUT",
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